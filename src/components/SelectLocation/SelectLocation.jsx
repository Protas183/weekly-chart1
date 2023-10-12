import React, { useState } from 'react';
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
    top: "35px", // убираем отступ
  }),
};


const options = [
  { value: 'value1', label: <><AiFillHome /> Home</> },
  { value: 'value2', label: <><HiMiniBuildingOffice2 /> Office</> },
  { value: 'value3', label: <><MdOutlineLocationOff /> Unspecified</> },
];

const SelectLocation = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };

  return (
    <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
    />
  );
};

export default SelectLocation;
