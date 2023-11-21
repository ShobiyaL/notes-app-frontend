import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import {
  Center,
  Spinner,
  Wrap,
  WrapItem,
  Stack,
  Text,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  useDisclosure,
  Icon,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import NoteCard from '../components/NoteCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNotes } from '../redux/actions/notesActions';
import { MdCancel, MdOutlinePlaylistAdd, MdTimeToLeave } from 'react-icons/md';

import { createNote } from '../redux/actions/notesActions';
import FontsPreference from '../components/FontsPreference';
import Colors from '../components/Colors';
import { selectColor, selectFont } from '../redux/slices/notes';
import { TbClick } from 'react-icons/tb';

const Notespage = ({ notes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const dispatch = useDispatch();

  const toast = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // console.log(title, description);
  const notesList = useSelector((state) => state.notes);
  // console.log(notesList);

  const { loading, error, selectedColor, selectedFont } = notesList;

  // console.log(notes);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);
  let handleColor = (c) => {
    // console.log(c);
    dispatch(selectColor(c));
  };
  let onSelectFont = (f) => {
    // console.log(f);
    dispatch(selectFont(f));
  };
  let handleSubmit = () => {
    dispatch(
      createNote({
        title,
        description,
        color: selectedColor ? selectedColor : 'white',
        font: selectedFont ? selectedFont : '',
      })
    );

    setTitle('');
    setDescription('');
    dispatch(selectColor(''));
    dispatch(selectFont(''));
    onClose();
  };

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing='4'>
          <Spinner
            mt='20px'
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>OOPS!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : notes.length > 0 ? (
        notes.map((note) => {
          return (
            <WrapItem key={note._id}>
              {/* <Center w='250px' h='550px'> */}
              <Center w='250px'>
                <NoteCard _note={note} handleColor={handleColor} />
              </Center>
            </WrapItem>
          );
        })
      ) : (
        <Box mt='20'>
          <Text>No notes found..</Text>
        </Box>
      )}

      <Button
        position='fixed'
        bottom={{ base: '20px', md: '30px', lg: '40px' }}
        right={{ base: '20px', md: '30px', lg: '40px' }}
        zIndex='1'
        onClick={onOpen}
      >
        <Icon as={MdOutlinePlaylistAdd} h='7' w='7' />

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder='...'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <FontsPreference onSelectFont={onSelectFont} />
              <Colors handleColor={handleColor} />
              <Button mx={3} onClick={handleSubmit}>
                save
                <TbClick color='black' />
              </Button>
              <Button colorScheme='red' onClick={onClose}>
                {/* cancel */}
                <MdCancel size={25} />
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Button>
    </Wrap>
  );
};

export default Notespage;
