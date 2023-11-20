import React, { useState } from 'react';
import { Modal, Button, Icon } from '@chakra-ui/react';
import { MdPlusOne } from 'react-icons/md';
import './colors.css';
import NoteCard from './NoteCard';
import Notespage from '../pages/Notespage';
const Colors = ({ handleColor }) => {
  const colors = ['#fe9b72', '#fec971', ' #00d4fe', '#b693fd', '#e4ee91'];

  const [listOpen, setListOpen] = useState(false);
  return (
    <div className='sidebar'>
      {/* <Icon
                alignSelf={'centre'}
                w={10}
                color={useColorModeValue('black.500', 'black.300')}
                as={FaArrowRight}
              /> */}
      {/* <Icon as={MdPlusOne} alt='Add' onClick={() => setListOpen(!listOpen)} /> */}
      {/* <ul className={`sidebar_list ${listOpen ? 'sidebar_list_active' : ''}`}> */}
      <ul className='sidebar_list'>
        {colors.map((color, index) => (
          <li
            key={index}
            className='sidebar_list_item'
            style={{ backgroundColor: color }}
            onClick={() => handleColor(color)}
          />
        ))}
      </ul>{' '}
    </div>
  );
};

export default Colors;
