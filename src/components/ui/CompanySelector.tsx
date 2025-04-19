import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Box,

  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Flex,
  Text,
  Icon,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import { FiBookmark, FiEdit2 } from 'react-icons/fi';

// Simple static data for the menu
const companies = [
  {
    name: 'Portland Media Group',
    publications: [
      { name: 'Willamette Week', type: 'Newspaper' },
      { name: 'Portland Monthly', type: 'Magazine' },
      { name: 'PDX Eater', type: 'Blog' },
    ],
  },
  {
    name: 'Cascade Publishing',
    publications: [
      { name: 'The Oregonian', type: 'Newspaper' },
      { name: 'Portland Business Journal', type: 'Magazine' },
      { name: 'Rose City Review', type: 'Magazine' },
      { name: 'PDX Tech Weekly', type: 'Newsletter' },
    ],
  },
  {
    name: 'Bridge City Media',
    publications: [
      { name: 'Portland Mercury', type: 'Alternative Weekly' },
      { name: 'PDX Arts', type: 'Magazine' },
      { name: 'Bridgetown Beat', type: 'Blog' },
    ],
  },
];

const views = [
  { name: 'Newspapers' },
  { name: 'Magazines' },
  { name: 'Portland Media' },
];

type PublicationKey = string; // companyName|publicationName


/**
 * A simplified static company selector component.
 * This version has no state changes or complex interactions to prevent blinking issues.
 */
const CompanySelector: React.FC = () => {
  // Color mode values
  const menuBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Modal state
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [viewName, setViewName] = React.useState('');
  const [selectedPubs, setSelectedPubs] = React.useState<PublicationKey[]>([]);
  const [editMode, setEditMode] = React.useState(false);

  function getPubKey(company: string, pub: string) {
    return `${company}|${pub}`;
  }

  const handleOpenModal = (e?: React.MouseEvent, editViewName?: string) => {
    if (e) e.stopPropagation();
    if (editViewName) {
      setEditMode(true);
      setViewName(editViewName);
      // For mockup, just select all publications in "Portland Media Group" for 'Portland Media', etc.
      // You can expand this logic as needed.
      if (editViewName === 'Portland Media') {
        setSelectedPubs(companies[0].publications.map(p => getPubKey(companies[0].name, p.name)));
      } else {
        setSelectedPubs([]);
      }
    } else {
      setEditMode(false);
      setViewName('');
      setSelectedPubs([]);
    }
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const togglePub = (company: string, pub: string) => {
    const key = getPubKey(company, pub);
    setSelectedPubs(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          variant="outline"
          rightIcon={<ChevronDownIcon />}
          minW="240px"
          textAlign="left"
          fontWeight="medium"
          borderColor={borderColor}
        >
          <Flex align="center">
            <Icon as={FiBookmark} mr={2} />
            <Text noOfLines={1}>Willamette Week</Text>
          </Flex>
        </MenuButton>
        <MenuList bg={menuBg} borderColor={borderColor} minW="280px">
          {/* Custom Views Section */}
          <Flex align="center" justify="space-between" px={3} pt={2} pb={1}>
            <Text fontSize="sm" fontWeight="semibold">Saved Views</Text>
            <Button
              size="xs"
              leftIcon={<AddIcon />}
              colorScheme="purple"
              variant="ghost"
              ml={2}
              aria-label="Create View"
              onClick={handleOpenModal}
            >
              Create View
            </Button>
          </Flex>
          <MenuGroup title=" ">
            {views.map((view, index) => (
  <MenuItem
    key={index}
    _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
    onClick={e => e.stopPropagation()}
  >
    <Flex align="center" justify="space-between" w="100%">
      <Flex align="center">
        <Icon as={FiBookmark} mr={2} />
        <Text>{view.name}</Text>
      </Flex>
      <Icon
        as={FiEdit2}
        boxSize={4}
        color={useColorModeValue('gray.400', 'gray.500')}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        className="edit-icon"
        cursor="pointer"
        onClick={e => handleOpenModal(e, view.name)}
        title="Edit View"
      />
    </Flex>
  </MenuItem>
))} 
          </MenuGroup>
          <MenuDivider />
          {/* Companies and Publications */}
          <MenuGroup title="Companies & Publications">
            {companies.map((company, companyIndex) => (
              <React.Fragment key={companyIndex}>
                <MenuItem fontWeight="semibold">
                  {company.name}
                </MenuItem>
                {company.publications.map((publication, pubIndex) => (
                  <MenuItem 
                    key={pubIndex}
                    pl={8}
                  >
                    <Flex align="center">
                      <Text>{publication.name}</Text>
                      <Badge ml={2} variant="outline" color={useColorModeValue('purple.500', 'purple.300')} borderColor={useColorModeValue('purple.200', 'purple.500')}>
                        {publication.type}
                      </Badge>
                    </Flex>
                  </MenuItem>
                ))}
                {companyIndex !== companies.length - 1 && <MenuDivider />}
              </React.Fragment>
            ))}
          </MenuGroup>
        </MenuList>
      </Menu>

      {/* Create View Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editMode ? 'Edit View' : 'Create New View'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>View Name</FormLabel>
              <Input placeholder="Enter view name" value={viewName} onChange={e => setViewName(e.target.value)} />
            </FormControl>
            <Box maxH="240px" overflowY="auto" borderWidth="1px" borderRadius="md" borderColor={borderColor} p={3}>
              {companies.map((company, idx) => (
                <Box key={company.name} mb={3}>
                  <Text fontWeight="semibold" mb={1}>{company.name}</Text>
                  {company.publications.map(pub => {
  const key = getPubKey(company.name, pub.name);
  return (
    <Flex align="center" key={pub.name} pl={4} mb={1}>
      <input
        type="checkbox"
        style={{ marginRight: 8 }}
        checked={selectedPubs.includes(key)}
        onChange={() => togglePub(company.name, pub.name)}
      />
      <Text>{pub.name}</Text>
      <Badge ml={2} variant="outline" color={useColorModeValue('purple.500', 'purple.300')} borderColor={useColorModeValue('purple.200', 'purple.500')}>
        {pub.type}
      </Badge>
    </Flex>
  );
})}
                </Box>
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal}>Cancel</Button>
            <Button colorScheme="purple" isDisabled>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompanySelector;
