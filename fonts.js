import React, { useState } from 'react';

const NotesApp = () => {
  // Default font settings
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(12);

  // Notes content state
  const [notes, setNotes] = useState('');

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value, 10));
  };

  const applyFont = () => {
    // Apply font styles to notes content
    // You might want to use a rich text editor library for more advanced styling
    const fontStyles = {
      fontFamily,
      fontSize: `${fontSize}px`,
    };

    // Set the font styles to the notes content
    // For simplicity, this example uses a textarea, but you might want to use a rich text editor library for better styling options
    setNotesStyle(fontStyles);
  };

  const setNotesStyle = (styles) => {
    document.getElementById('notes').style = Object.entries(styles)
      .map(([key, value]) => `${key}:${value}`)
      .join(';');
  };

  return (
    <div>
      <div>
        <label htmlFor="fontFamily">Font Family:</label>
        <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          {/* Add more font options as needed */}
        </select>
      </div>

      <div>
        <label htmlFor="fontSize">Font Size:</label>
        <input
          type="number"
          id="fontSize"
          value={fontSize}
          onChange={handleFontSizeChange}
        />
      </div>

      <button onClick={applyFont}>Apply Font</button>

      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ fontFamily, fontSize: `${fontSize}px` }}
        />
      </div>
    </div>
  );
};

export default NotesApp;
