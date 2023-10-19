import React, { Component } from 'react';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import SelectLocation from 'components/SelectLocation/SelectLocation';
import './TimeBlock.css';

class TimeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [
        { fromTime: '8:00am', toTime: '9:00am' },
      ],
      numberOfItems: 1,
      locations: [],
    };
    this.props.onTimeBlockUpdate(this.props.dayId, this.state)
    this.allTimes = [];
    for (let hour = 0; hour <= 11; hour++) {
      for (let minute of ['00']) {
        for (let period of ['am', 'pm']) {
          this.allTimes.push(`${hour}:${minute}${period}`);
        }
      }
    }

    this.allTimes.sort((a, b) => {
      const periodOrder = { am: 0, pm: 1 };
      return periodOrder[a.slice(-2)] - periodOrder[b.slice(-2)] || parseInt(a) - parseInt(b);
    });
  }

  handleFromTimeChange = (e, index) => {
    const newFromTime = e.target.value;
    this.setState((prevState) => {
      const times = [...prevState.times];
      times[index] = { ...times[index], fromTime: newFromTime };

      if (this.compareTimes(newFromTime, times[index].toTime) >= 0) {
        times[index] = { ...times[index], toTime: this.getNextTime(newFromTime) };
      }
      this.props.onTimeBlockUpdate(this.props.dayId, {
        ...this.state,
        times
      });
      return { times };
    });

  };


  handleToTimeChange = (e, index) => {
    const newToTime = e.target.value;
    this.setState((prevState) => {
      const times = [...prevState.times];
      times[index] = { ...times[index], toTime: newToTime };

      if (this.compareTimes(times[index].fromTime, newToTime) >= 0) {
        times[index] = { ...times[index], fromTime: this.getPreviousTime(newToTime) };
      }
       this.props.onTimeBlockUpdate(this.props.dayId, {
        ...this.state,
        times
      });
      return { times };
    });

  };

  handleAddItems = () => {
  this.setState((prevState) => {
    const newState = {
      ...prevState,
      numberOfItems: prevState.numberOfItems + 1,
      times: [
        ...prevState.times,
        { fromTime: prevState.times[prevState.times.length - 1].toTime, toTime: this.getNextTime(prevState.times[prevState.times.length - 1].toTime) }
      ],
    };
    this.props.onTimeBlockUpdate(this.props.dayId, newState);
    return newState;
  });
};


  handleDeleteItem = () => {
    if (this.state.numberOfItems > 1) {
      this.setState((prevState) => ({
        numberOfItems: prevState.numberOfItems - 1,
        times: prevState.times.slice(0, -1),
        locations: prevState.locations.slice(0, -1),
      }));
    }
    this.props.onTimeBlockUpdate(this.props.dayId, this.state);
  };

  compareTimes = (a, b) => {
    const timeOrder = this.allTimes.reduce((acc, time, index) => {
      acc[time] = index;
      return acc;
    }, {});

    return timeOrder[a] - timeOrder[b];
  };

  getNextTime = (currentTime) => {
    const currentIndex = this.allTimes.indexOf(currentTime);
    const nextIndex = Math.min(currentIndex + 1, this.allTimes.length - 1);
    return this.allTimes[nextIndex];
  };

  getPreviousTime = (currentTime) => {
    const currentIndex = this.allTimes.indexOf(currentTime);
    const previousIndex = Math.max(currentIndex - 1, 0);
    return this.allTimes[previousIndex];
  };

  handleSelectLocation = (index, location) => {
    this.setState((prevState) => {
      let locations = prevState.locations
      locations[index] = location
      return {
        ...prevState,
        locations
      }
    });
  }


  render() {
  const { times, numberOfItems } = this.state;
  const { handleAddItems, handleDeleteItem, handleSelectLocation } = this;

  return (
    <div>
      <ul>
        {times.map((time, index) => (
          <li key={time.id} className='timeFromTo'>
            <div className='timeFromTo_block'>
              <div>
                <select
                  id={`fromTime-${index}`}
                  name={`fromTime-${index}`}
                  value={time.fromTime}
                  onChange={(e) => this.handleFromTimeChange(e, index)}
                  className={`timeFromTo-select ${index > 0 &&
                    this.compareTimes(time.fromTime, times[index - 1].toTime) < 0
                      ? 'red'
                      : ''}`
                  }
                >
                  {this.allTimes.map((time, index) => (
                    <option key={"from"+index} value={time} className='timeFromTo-option'>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <span className='timeFromTo-span'>to</span>
              <div>
                <select
                  id={`toTime-${index}`}
                  name={`toTime-${index}`}
                  value={time.toTime}
                  onChange={(e) => this.handleToTimeChange(e, index)}
                  className={`timeFromTo-select ${index < times.length - 1 &&
                    this.compareTimes(time.toTime, times[index + 1].fromTime) > 0
                      ? 'red'
                      : ''}`
                  }
                >
                  {this.allTimes.map((time, index) => (
                    <option key={"to"+index} value={time} className='timeFromTo-option'>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <SelectLocation index={ index } onSelectLocation={ handleSelectLocation } />
          </li>
        ))}
      </ul>
      <ul className='timeFromTo-buttons'>
        <li>
          <button onClick={handleAddItems}><FiPlusCircle /></button>
        </li>
        <li>
          {numberOfItems > 1 && (
            <button onClick={handleDeleteItem}><FiMinusCircle /></button>
          )}
        </li>
      </ul>

    </div>
  );
}
}

export default TimeBlock;
