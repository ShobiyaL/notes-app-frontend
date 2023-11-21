import React, { useState } from 'react';
import './colors.css';
import { useSelector } from 'react-redux';

const Colors = ({ handleColor }) => {
  const { selectedColor } = useSelector((state) => state.notes);
  console.log(selectedColor);
  const colors = ['#fe9b72', '#fec971', ' #00d4fe', '#b693fd', '#e4ee91'];

  return (
    <div className='colors_container'>
      {/* <Icon
                alignSelf={'centre'}
                w={10}
                color={useColorModeValue('black.500', 'black.300')}
                as={FaArrowRight}
              /> */}
      {/* <Icon as={MdPlusOne} alt='Add' onClick={() => setListOpen(!listOpen)} /> */}
      {/* <ul className={`sidebar_list ${listOpen ? 'sidebar_list_active' : ''}`}> */}
      <ul className='color_list'>
        {colors.map((color, index) => (
          <li
            key={index}
            className='color_list_item'
            style={{
              backgroundColor: color,
              border: selectedColor === color ? '2px solid black' : 'none',
              
            }}
            onClick={() => handleColor(color)}
          />
        ))}
      </ul>{' '}
    </div>
  );
};

export default Colors;
