import React from 'react';
import Select from 'react-select';
import { AiFillHome } from 'react-icons/ai';
import { HiMiniBuildingOffice2 } from 'react-icons/hi2';
import { MdOutlineLocationOff } from 'react-icons/md';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: "200px",
        borderColor: state.isFocused ? '#6e7c7c' : '#ccc',
        boxShadow: state.isFocused ? '0 0 0 1px #6e7c7c' : null,
        '&:hover': {
        borderColor: '#6e7c7c',
        },
    }),
    option: (provided, state) => ({
      ...provided,

        backgroundColor: state.isSelected ? '#6e7c7c' : '#f4f4f4',
        color: state.isSelected ? '#fff' : '#333',
        '&:hover': {
        backgroundColor: '#6e7c7c',
        color: '#fff',
        },
    }),
    menu: (provided) => ({
      ...provided,
      top: "35px",
    }),
};


const options = [
  { value: 'Home', label: <><AiFillHome /> Home</> },
  { value: 'Office', label: <><HiMiniBuildingOffice2 />Office</> },
  { value: 'Unspecified', label: <><MdOutlineLocationOff /> Unspecified</> },
];

class SelectLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: options[0],
    };
  }

  handleChange = (selected) => {
    this.setState({ selectedOption: selected });
    console.log(selected.value)
    this.props.onSelectLocation(this.props.index, selected.value);
  };

  componentDidMount = () => {
    this.props.onSelectLocation(this.props.index, this.state.selectedOption.value);
  }

  render() {
    return (
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={options}
        styles={customStyles}
      />
    );
  }
}

export default SelectLocation;
