import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  useToast,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Spacer,
} from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import { TbNotes } from 'react-icons/tb';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';

//defining the links
const links = [{ linkName: 'Notes', path: '/' }];

//Link comp in the navbar
const NavLink = ({ path, children }) => {
  // console.log(children);
  return (
    <Link
      as={ReactLink}
      to={path}
      px='2'
      py='2'
      rounded='md'
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.100', 'gray.900'),
      }}
    >
      {children}
    </Link>
  );
};
const Navbar = ({ handleSearch, searchText }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  // console.log(user);
  const { userInfo } = user;

  const dispatch = useDispatch();
  const toast = useToast();

  let logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'logged out.', status: 'success', isClosable: true });
    navigate('/');
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} px='5'>
      <Flex h='16' alignItems='center' justifyContent='space-between'>
        <IconButton
          size='md'
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={100}>
          <Link
            as={ReactLink}
            to='/'
            rounded='md'
            px='2'
            py='2'
            _hover={{
              textDecoration: 'none',
              bg: useColorModeValue('gray.100', 'gray.900'),
            }}
          >
            <Flex alignItems='center'>
              <Icon as={TbNotes} h='6' w='6' color='black.300' />
              {/* <TbNotes /> */}
              <Text fontWeight='bold' fontSize={20}>
                Notes.
              </Text>
            </Flex>
          </Link>
        </HStack>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon />
          </InputLeftElement>
          <Input
            variant='filled'
            placeholder='Type to search..'
            width={['100%', '80%', '60%', '40%']}
            value={searchText}
            onChange={(event) => handleSearch(event.target.value)}
          />
        </InputGroup>
        <Flex alignItems='center'>
          <NavLink>
            <Icon
              as={colorMode === 'light' ? MoonIcon : SunIcon}
              alignSelf='center'
              onClick={() => toggleColorMode()}
            />
          </NavLink>
          {userInfo ? (
            <Menu>
              <MenuButton px='4' py='2' transition='all 0.3s' as={Button}>
                {userInfo.data.name}
                <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem as={ReactLink} to='/profile'>
                  <CgProfile />
                  <Text ml='2'>Profile</Text>
                </MenuItem>
                <MenuItem as={ReactLink} to='/notes'>
                  <TbNotes />
                  <Text ml='2'>Notes</Text>
                </MenuItem>
                <MenuDivider />

                <MenuItem onClick={logoutHandler}>
                  <MdLogout />
                  <Text ml='2'>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                as={ReactLink}
                to='/login'
                p='2'
                fontSize='md'
                fontWeight={600}
                fontStyle={'italic'}
              >
                Sign In
              </Button>
              <Button
                as={ReactLink}
                to='/signup'
                p='2'
                m='2'
                fontSize='sm'
                fontWeight={600}
                _hover={{ color: 'black' }}
                bg='#E0144C'
                color='white'
                display={{ base: 'none', md: 'inline-flex' }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb='4' display={{ md: 'none' }}>
          <Stack as='nav' spacing='4'>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key='sign up' path='/signup'>
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
