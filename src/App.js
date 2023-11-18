import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import NotesListpage from './pages/Notespage';

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/login' element={<Loginpage />} />
              <Route path='/signup' element={<Signuppage />} />
              <Route path='/notes' element={<NotesListpage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
