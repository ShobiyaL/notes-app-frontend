import React, { useState, useRef } from 'react';
import {
  Button,
  Modal,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
  Input,
} from '@chakra-ui/react';
const ModalWindow = ({
  tempDesc,
  tempTitle,
  setTempDesc,
  setTempTitle,
  handleSubmit,
  isOpen,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  //   const dispatch = useDispatch();
  //   const { title, description, _id, createdAt, updatedAt } = note;
  //   // console.log(title, _id);
  //   const [tempTitle, setTempTitle] = useState(title);
  //   const [tempDesc, setTempDesc] = useState(description);
  return (
    <div>
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
    </div>
  );
};

export default ModalWindow;
