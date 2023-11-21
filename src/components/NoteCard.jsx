import React, { useRef, useState } from 'react';
import {
  Box,
  Center,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  Stack,
  Avatar,
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
  useColorModeValue,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
} from '@chakra-ui/react';
import { MdEditNote } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { deleteNote, updateNote } from '../redux/actions/notesActions';
import { useDispatch, useSelector } from 'react-redux';
import Colors from './Colors';
import FontsPreference from '../components/FontsPreference';

import { selectColor, setNote, updateNoteColor } from '../redux/slices/notes';

export default function NoteCard({ _note }) {
  // State for handling delete confirmation dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const dispatch = useDispatch();

  const { title, description, _id, createdAt, updatedAt, color, font } = _note;
  // console.log(font);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDesc, setTempDesc] = useState(description);
  const notesList = useSelector((state) => state.notes);
  // console.log(notesList);
  const cancelRef = useRef();
  const { loading, error, selectedColor } = notesList;
  // console.log(selectedColor);

  let date;
  if (createdAt) {
    const dateString = new Date(createdAt);
    const day = dateString.toDateString();

    date = day;
  }

  let handleSubmit = () => {
    dispatch(updateNote(_id, { title: tempTitle, description: tempDesc }));
    onClose();
  };
  let handleColor = (c) => {
    // console.log(c);
    dispatch(selectColor(c));
  };
  const handleDeleteNote = (_id) => {
    // console.log(_id);
    setDeleteNoteId(_id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteNote = () => {
    if (deleteNoteId) {
      dispatch(deleteNote(_id));
      setIsDeleteDialogOpen(false);
    }
  };

  const cancelDeleteNote = () => {
    setDeleteNoteId(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks

        bg={useColorModeValue(`${color ? color : 'white'}`, 'pink.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        // h='250px'
        fontFamily={font}
      >
        <Stack>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {title}
          </Heading>
          <Text color={'gray.500'}>{description}</Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text color={'gray.500'}>{date}</Text>
          </Stack>
        </Stack>
        <Stack
          mt={10}
          direction={'row'}
          //   spacing={5}
          fontSize={'sm'}
          align={'center'}
          justify={'space-between'}
        >
          <Button onClick={onOpen}>
            <MdEditNote />

            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Note</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder='Title'
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder='...'
                      value={tempDesc}
                      onChange={(e) => {
                        setTempDesc(e.target.value);
                      }}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Colors handleColor={handleColor} />
                  <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Button>
          <Button onClick={() => handleDeleteNote(_id)}>
            <AiOutlineDelete />
          </Button>
          <AlertDialog
            isOpen={isDeleteDialogOpen}
            leastDestructiveRef={cancelRef}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Confirm Delete
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to delete this note?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={cancelDeleteNote}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' onClick={confirmDeleteNote} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Stack>
      </Box>
    </Center>
  );
}
