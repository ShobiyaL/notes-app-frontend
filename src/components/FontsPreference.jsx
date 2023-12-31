import React from 'react';
import { Box, Select } from '@chakra-ui/react';

const FontsPreference = ({ selectedFont, onSelectFont }) => {
  const fontOptions = [
    'Arial',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Helvetica',
  ];

  return (
    <Box mr={3}>
      <Select
        value={selectedFont}
        onChange={(e) => onSelectFont(e.target.value)}
        style={{ cursor: 'pointer' }}
      >
        {fontOptions.map((font) => (
          <option key={font} value={font} style={{ cursor: 'pointer' }}>
            {font}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default FontsPreference;
