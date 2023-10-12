import React, { Component } from 'react';
import './DaysOfWeek.css';
import { FaRegQuestionCircle } from 'react-icons/fa'
import TimeBlock from '../TimeBlock/TimeBlock';
import SelectLocation from '../SelectLocation/SelectLocation';

class DaysOfWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
    };
  }

  days = [
    { id: 'id-1', letter: 'M', name: 'Monday' },
    { id: 'id-2', letter: 'T', name: 'Tuesday' },
    { id: 'id-3', letter: 'W', name: 'Wednesday' },
    { id: 'id-4', letter: 'T', name: 'Thursday' },
    { id: 'id-5', letter: 'F', name: 'Friday' },
    { id: 'id-6', letter: 'S', name: 'Saturday' },
    { id: 'id-7', letter: 'S', name: 'Sunday' },
  ];

  daysOrder = this.days.map((day) => day.letter);

  handleDayClick = (dayId) => {
    const selectedDay = this.days.find((day) => day.id === dayId);
    if (!selectedDay) return;

    this.setState((prevState) => {
      const { selectedDays } = prevState;
      if (selectedDays.includes(selectedDay.id)) {
        return { selectedDays: selectedDays.filter((day) => day !== selectedDay.id) };
      } else {
        return {
          selectedDays: [...selectedDays, selectedDay.id],
        };
      }
    });
  };

  handleAddItems = () => {
    this.setState((prevState) => ({ numberOfItems: prevState.numberOfItems + 1 }));
  };

  handleDeleteItem = () => {
    if (this.state.numberOfItems > 1) {
      this.setState((prevState) => ({ numberOfItems: prevState.numberOfItems - 1 }));
    }
  };

  render() {
    const { selectedDays } = this.state;
    const sortedSelectedDays = selectedDays.sort(
      (a, b) => this.days.findIndex(day => day.id === a) - this.days.findIndex(day => day.id === b)
    );
    return (
      <div>
        <div className='daysOfWeek_buttonsList'>
          {this.days.map((day) => (
            <button className='daysOfWeek_button'
              key={day.id}
              onClick={() => this.handleDayClick(day.id)}
              style={{
                backgroundColor: selectedDays.includes(day.id) ? '#17a1fc' : '#d1d1d1',
                color: selectedDays.includes(day.id) ? "white" : "black",
              }}
            >
              {day.letter}
            </button>
          ))}
        </div>

        {selectedDays.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <ul className='dayOfWeek_chart-title'>
              <li>WORKING HOURS</li>
              <li>WORKING LOCATION <FaRegQuestionCircle /></li>
            </ul>          
             <ul>
              {sortedSelectedDays.map((selectedDayId) => (
                <li key={selectedDayId} className='dayOfWeek_chart'>
                  <p className='dayOfWeek_chart-name'>
                    {this.days.find((dayInfo) => dayInfo.id === selectedDayId)?.name}
                  </p>                    
                  <TimeBlock />
                  <SelectLocation /> 
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default DaysOfWeek;
