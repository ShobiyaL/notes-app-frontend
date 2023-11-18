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
} from '@chakra-ui/react';
import { MdEditNote } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { deleteNote, updateNote } from '../redux/actions/notesActions';
import { useDispatch } from 'react-redux';

export default function NoteCard({ note }) {
  //   console.log(note);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const dispatch = useDispatch();
  const { title, description, _id, createdAt } = note;
  // console.log(title, _id);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDesc, setTempDesc] = useState(description);
  let date;
  if (createdAt) {
    const dateString = new Date(createdAt);
    const day = dateString.getUTCDate();
    const month = dateString.getUTCMonth() + 1; // Adding 1 because getUTCMonth() returns values from 0 to 11

    date = `${day}/${month}`;
  }

  let handleSubmit = () => {
    dispatch(updateNote(_id, { title: tempTitle, description: tempDesc }));
    onClose();
  };

  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'pink.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        // h='250px'
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
                  <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteNote(_id));
            }}
          >
            <AiOutlineDelete />
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
