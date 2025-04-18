import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Badge,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  SimpleGrid,
  useDisclosure,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tag,
} from '@chakra-ui/react';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiCalendar, FiMapPin, FiUsers, FiDollarSign } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';

// Sample events inventory data
const eventsInventory = [
  {
    id: 1,
    name: 'Portland Food Festival',
    type: 'Festival',
    description: 'Annual food festival featuring local Portland restaurants and food carts',
    location: 'Tom McCall Waterfront Park',
    date: 'June 15-17, 2025',
    audience: '10,000+ attendees',
    sponsorshipLevels: [
      { name: 'Platinum', price: 5000 },
      { name: 'Gold', price: 3000 },
      { name: 'Silver', price: 1500 },
      { name: 'Bronze', price: 750 },
    ],
    status: 'Active',
  },
  {
    id: 2,
    name: 'Portland Music Week',
    type: 'Concert Series',
    description: 'Week-long music celebration featuring local Portland artists across multiple venues',
    location: 'Various venues across Portland',
    date: 'July 8-14, 2025',
    audience: '15,000+ attendees',
    sponsorshipLevels: [
      { name: 'Headliner', price: 7500 },
      { name: 'Main Stage', price: 5000 },
      { name: 'Supporting', price: 2500 },
      { name: 'Local Stage', price: 1000 },
    ],
    status: 'Active',
  },
  {
    id: 3,
    name: 'Portland Tech Summit',
    type: 'Conference',
    description: 'Annual tech conference bringing together Portland\'s tech community',
    location: 'Oregon Convention Center',
    date: 'September 5-7, 2025',
    audience: '3,000+ attendees',
    sponsorshipLevels: [
      { name: 'Diamond', price: 10000 },
      { name: 'Platinum', price: 7500 },
      { name: 'Gold', price: 5000 },
      { name: 'Silver', price: 2500 },
    ],
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Portland Beer Week',
    type: 'Festival',
    description: 'Celebration of Portland\'s craft beer scene with tastings and events',
    location: 'Multiple breweries across Portland',
    date: 'August 10-16, 2025',
    audience: '8,000+ attendees',
    sponsorshipLevels: [
      { name: 'Brewmaster', price: 6000 },
      { name: 'Craft', price: 3500 },
      { name: 'Tap Room', price: 2000 },
      { name: 'Tasting', price: 1000 },
    ],
    status: 'Active',
  },
  {
    id: 5,
    name: 'Portland Film Festival',
    type: 'Festival',
    description: 'Annual independent film festival showcasing local and international filmmakers',
    location: 'Cinema 21 and Hollywood Theatre',
    date: 'October 12-18, 2025',
    audience: '5,000+ attendees',
    sponsorshipLevels: [
      { name: 'Producer', price: 8000 },
      { name: 'Director', price: 5000 },
      { name: 'Screenwriter', price: 3000 },
      { name: 'Supporting Cast', price: 1500 },
    ],
    status: 'Inactive',
  },
];

// Event type options
const eventTypeOptions = [
  { value: 'Festival', label: 'Festival' },
  { value: 'Conference', label: 'Conference' },
  { value: 'Concert Series', label: 'Concert Series' },
  { value: 'Exhibition', label: 'Exhibition' },
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Networking', label: 'Networking Event' },
];

const EventsInventoryPage = () => {
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  
  // State for add/edit modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    location: '',
    date: '',
    audience: '',
    status: 'Active',
    sponsorshipLevels: [
      { name: 'Platinum', price: 5000 },
      { name: 'Gold', price: 3000 },
      { name: 'Silver', price: 1500 },
      { name: 'Bronze', price: 750 },
    ],
  });
  
  // Handle opening add modal
  const handleAddEvent = () => {
    setModalMode('add');
    setFormData({
      name: '',
      type: '',
      description: '',
      location: '',
      date: '',
      audience: '',
      status: 'Active',
      sponsorshipLevels: [
        { name: 'Platinum', price: 5000 },
        { name: 'Gold', price: 3000 },
        { name: 'Silver', price: 1500 },
        { name: 'Bronze', price: 750 },
      ],
    });
    onOpen();
  };
  
  // Handle opening edit modal
  const handleEditEvent = (event: any) => {
    setModalMode('edit');
    setSelectedEvent(event);
    setFormData({
      name: event.name,
      type: event.type,
      description: event.description,
      location: event.location,
      date: event.date,
      audience: event.audience,
      status: event.status,
      sponsorshipLevels: event.sponsorshipLevels,
    });
    onOpen();
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // In a real app, this would save to the backend
    console.log('Saving event:', formData);
    onClose();
  };
  
  return (
    <MainLayout title="Events Inventory" activeRoute="/inventory">
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading size="lg" mb={1}>Inventory Management</Heading>
            <Text color={textSecondaryColor}>
              Manage your ad inventory across different platforms
            </Text>
          </Box>
          
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input placeholder="Search inventory..." />
          </InputGroup>
        </Flex>
        
        <Tabs variant="line" colorScheme="blue" defaultIndex={4} onChange={(index) => {
            if (index === 0) window.location.href = '/inventory';
            if (index === 1) window.location.href = '/inventory/print';
            if (index === 2) window.location.href = '/inventory/newsletter';
            if (index === 3) window.location.href = '/inventory/social';
            if (index === 5) window.location.href = '/inventory/podcasts';
          }}>
          <TabList>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Website</Tab>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Print</Tab>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Newsletter</Tab>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Social</Tab>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Events</Tab>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Podcasts</Tab>
          </TabList>
          
          <TabPanels>
            {/* Website Inventory Tab */}
            <TabPanel px={0}>
              <Text>Website inventory content is on the main inventory page</Text>
            </TabPanel>
            
            {/* Print Inventory Tab */}
            <TabPanel px={0}>
              <Text>Print inventory content is on the print inventory page</Text>
            </TabPanel>
            
            {/* Newsletter Inventory Tab */}
            <TabPanel px={0}>
              <Text>Newsletter inventory content is on the newsletter inventory page</Text>
            </TabPanel>
            
            {/* Social Media Inventory Tab */}
            <TabPanel px={0}>
              <Text>Social media inventory content is on the social inventory page</Text>
            </TabPanel>
            
            {/* Events Inventory Tab */}
            <TabPanel px={0}>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Events Sponsorship Inventory</Heading>
                <Button 
                  leftIcon={<FiPlus />} 
                  colorScheme="blue"
                  onClick={handleAddEvent}
                  bg="primary"
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                >
                  Add Event
                </Button>
              </Flex>
              
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg={cardBg}
                borderColor={borderColor}
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th width="40px">
                        <Checkbox colorScheme="blue" />
                      </Th>
                      <Th>Event</Th>
                      <Th>Type</Th>
                      <Th>Location</Th>
                      <Th>Date</Th>
                      <Th>Audience</Th>
                      <Th>Sponsorship Levels</Th>
                      <Th>Status</Th>
                      <Th width="120px">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {eventsInventory.map((event) => (
                      <Tr key={event.id}>
                        <Td>
                          <Checkbox colorScheme="blue" />
                        </Td>
                        <Td>
                          <Text fontWeight="medium">{event.name}</Text>
                          <Text fontSize="sm" color={textSecondaryColor}>
                            {event.description}
                          </Text>
                        </Td>
                        <Td>{event.type}</Td>
                        <Td>
                          <Flex align="center">
                            <Icon as={FiMapPin} mr={1} color="gray.500" />
                            <Text fontSize="sm">{event.location}</Text>
                          </Flex>
                        </Td>
                        <Td>
                          <Flex align="center">
                            <Icon as={FiCalendar} mr={1} color="gray.500" />
                            <Text fontSize="sm">{event.date}</Text>
                          </Flex>
                        </Td>
                        <Td>
                          <Flex align="center">
                            <Icon as={FiUsers} mr={1} color="gray.500" />
                            <Text fontSize="sm">{event.audience}</Text>
                          </Flex>
                        </Td>
                        <Td>
                          <Flex wrap="wrap" gap={1}>
                            {event.sponsorshipLevels.map((level, idx) => (
                              <Tag
                                key={idx}
                                size="sm"
                                variant="subtle"
                                colorScheme={
                                  idx === 0 ? 'purple' : 
                                  idx === 1 ? 'yellow' : 
                                  idx === 2 ? 'gray' : 
                                  'orange'
                                }
                              >
                                {level.name}: ${level.price}
                              </Tag>
                            ))}
                          </Flex>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={
                              event.status === 'Active' ? 'green' : 
                              event.status === 'Pending' ? 'orange' : 
                              'red'
                            }
                            borderRadius="full"
                            px={2}
                            py={1}
                          >
                            {event.status}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditEvent(event)}
                            >
                              <Icon as={FiEdit} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                            >
                              <Icon as={FiTrash2} />
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>
            
            {/* Podcasts Inventory Tab */}
            <TabPanel>
              <Text>Podcasts inventory content will go here</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      
      {/* Add/Edit Event Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalMode === 'add' ? 'Add New Event' : 'Edit Event'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Event Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Event name"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Event Type</FormLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Select event type"
                >
                  {eventTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the event"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Event location"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g., June 15-17, 2025"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Expected Audience</FormLabel>
                <Input
                  name="audience"
                  value={formData.audience}
                  onChange={handleInputChange}
                  placeholder="e.g., 10,000+ attendees"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </FormControl>
              
              <Box>
                <FormLabel>Sponsorship Levels</FormLabel>
                <Text fontSize="sm" color={textSecondaryColor} mb={3}>
                  Sponsorship tiers available for this event
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {formData.sponsorshipLevels.map((level, idx) => (
                    <Box
                      key={idx}
                      borderWidth="1px"
                      borderRadius="md"
                      p={3}
                      borderColor={borderColor}
                    >
                      <Flex justify="space-between" align="center">
                        <Text fontWeight="medium">{level.name}</Text>
                        <Flex align="center">
                          <Icon as={FiDollarSign} mr={1} />
                          <Text>{level.price}</Text>
                        </Flex>
                      </Flex>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={handleSubmit}
              bg="primary"
              color="white"
              _hover={{ bg: 'blue.600' }}
            >
              {modalMode === 'add' ? 'Add Event' : 'Save Changes'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MainLayout>
  );
};

export default EventsInventoryPage;
