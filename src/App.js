import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import NotesListpage from './pages/Notespage';
import { useSelector } from 'react-redux';

function App() {
  const [searchText, setSearchText] = useState('');
  console.log(searchText);
  let handleSearch = (text) => {
    console.log(text);
    setSearchText(text);
  };
  const notesObj = useSelector((state) => state.notes);
  const { notes } = notesObj;
  console.log(notes);
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Navbar handleSearch={handleSearch} searchText={searchText} />
          <main>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/login' element={<Loginpage />} />
              <Route path='/signup' element={<Signuppage />} />
              <Route
                path='/notes'
                element={
                  <NotesListpage
                    notes={notes.filter(
                      (note) =>
                        note.title.toLowerCase().includes(searchText) ||
                        note.description.toLowerCase().includes(searchText)
                    )}
                  />
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
