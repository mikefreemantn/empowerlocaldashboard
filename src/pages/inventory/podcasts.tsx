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
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiHeadphones, FiMic, FiClock, FiUsers, FiRadio, FiDollarSign } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';

// Sample podcasts inventory data
const podcastsInventory = [
  {
    id: 1,
    name: 'Portland Pulse',
    host: 'Sarah Johnson',
    description: 'Weekly podcast covering Portland news, culture, and community stories',
    episodes: 48,
    frequency: 'Weekly',
    listeners: '15,000+',
    adTypes: [
      { name: 'Pre-roll', duration: '30 sec', price: 450 },
      { name: 'Mid-roll', duration: '60 sec', price: 650 },
      { name: 'Post-roll', duration: '30 sec', price: 350 },
    ],
    status: 'Active',
    image: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    name: 'PDX Foodies',
    host: 'Michael Chen',
    description: 'Exploring Portland\'s diverse food scene with local chefs and restaurant owners',
    episodes: 36,
    frequency: 'Bi-weekly',
    listeners: '8,000+',
    adTypes: [
      { name: 'Pre-roll', duration: '30 sec', price: 300 },
      { name: 'Mid-roll', duration: '60 sec', price: 450 },
      { name: 'Sponsored segment', duration: '5 min', price: 900 },
    ],
    status: 'Active',
    image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    name: 'Bridge City Talks',
    host: 'David Williams',
    description: 'Interviews with Portland\'s business leaders, entrepreneurs, and innovators',
    episodes: 24,
    frequency: 'Monthly',
    listeners: '12,000+',
    adTypes: [
      { name: 'Pre-roll', duration: '30 sec', price: 400 },
      { name: 'Mid-roll', duration: '60 sec', price: 600 },
      { name: 'Sponsored interview', duration: '15 min', price: 1500 },
    ],
    status: 'Active',
    image: 'https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    name: 'Portland After Dark',
    host: 'Alicia Martinez',
    description: 'Exploring Portland\'s nightlife, music scene, and entertainment options',
    episodes: 18,
    frequency: 'Weekly',
    listeners: '7,500+',
    adTypes: [
      { name: 'Pre-roll', duration: '30 sec', price: 250 },
      { name: 'Mid-roll', duration: '60 sec', price: 400 },
      { name: 'Post-roll', duration: '30 sec', price: 200 },
    ],
    status: 'Inactive',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 5,
    name: 'Portland Tech Cast',
    host: 'James Wilson',
    description: 'Covering Portland\'s growing tech scene, startups, and digital innovation',
    episodes: 30,
    frequency: 'Bi-weekly',
    listeners: '10,000+',
    adTypes: [
      { name: 'Pre-roll', duration: '30 sec', price: 350 },
      { name: 'Mid-roll', duration: '60 sec', price: 550 },
      { name: 'Sponsored tech review', duration: '10 min', price: 1200 },
    ],
    status: 'Active',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Podcast frequency options
const frequencyOptions = [
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Bi-weekly', label: 'Bi-weekly' },
  { value: 'Monthly', label: 'Monthly' },
];

// Ad type options
const adTypeOptions = [
  { value: 'Pre-roll', label: 'Pre-roll' },
  { value: 'Mid-roll', label: 'Mid-roll' },
  { value: 'Post-roll', label: 'Post-roll' },
  { value: 'Sponsored segment', label: 'Sponsored segment' },
  { value: 'Sponsored interview', label: 'Sponsored interview' },
  { value: 'Product review', label: 'Product review' },
];

const PodcastsInventoryPage = () => {
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  const statBg = useColorModeValue('blue.50', 'blue.900');
  
  // State for add/edit modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedPodcast, setSelectedPodcast] = useState<any>(null);
  
  // State for ad modal
  const { 
    isOpen: isAdOpen, 
    onOpen: onAdOpen, 
    onClose: onAdClose 
  } = useDisclosure();
  const [selectedAdPodcast, setSelectedAdPodcast] = useState<any>(null);
  
  // State for ad type modal
  const {
    isOpen: isAdTypeModalOpen,
    onOpen: onAdTypeModalOpen,
    onClose: onAdTypeModalClose
  } = useDisclosure();
  const [adTypeModalMode, setAdTypeModalMode] = useState<'add' | 'edit'>('add');
  const [selectedAdTypeIndex, setSelectedAdTypeIndex] = useState<number>(-1);
  const [adTypeFormData, setAdTypeFormData] = useState({
    name: '',
    duration: '',
    price: 0
  });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    host: '',
    description: '',
    episodes: '',
    frequency: '',
    listeners: '',
    status: 'Active',
    adTypes: [
      { name: 'Pre-roll', duration: '30 sec', price: 300 },
      { name: 'Mid-roll', duration: '60 sec', price: 500 },
    ],
  });
  
  // Handle opening add modal
  const handleAddPodcast = () => {
    setModalMode('add');
    setFormData({
      name: '',
      host: '',
      description: '',
      episodes: '',
      frequency: '',
      listeners: '',
      status: 'Active',
      adTypes: [
        { name: 'Pre-roll', duration: '30 sec', price: 300 },
        { name: 'Mid-roll', duration: '60 sec', price: 500 },
      ],
    });
    onOpen();
  };
  
  // Handle opening edit modal
  const handleEditPodcast = (podcast: any) => {
    setModalMode('edit');
    setSelectedPodcast(podcast);
    setFormData({
      name: podcast.name,
      host: podcast.host,
      description: podcast.description,
      episodes: podcast.episodes.toString(),
      frequency: podcast.frequency,
      listeners: podcast.listeners,
      status: podcast.status,
      adTypes: podcast.adTypes,
    });
    onOpen();
  };
  
  // Handle opening ad inventory modal
  const handleViewAdInventory = (podcast: any) => {
    setSelectedAdPodcast(podcast);
    onAdOpen();
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle episodes input change
  const handleEpisodesChange = (valueString: string) => {
    setFormData({
      ...formData,
      episodes: valueString,
    });
  };
  
  // Handle opening add ad type modal
  const handleAddAdType = () => {
    setAdTypeModalMode('add');
    setAdTypeFormData({
      name: '',
      duration: '',
      price: 0
    });
    onAdTypeModalOpen();
  };
  
  // Handle opening edit ad type modal
  const handleEditAdType = (index: number) => {
    setAdTypeModalMode('edit');
    setSelectedAdTypeIndex(index);
    const adType = formData.adTypes[index];
    setAdTypeFormData({
      name: adType.name,
      duration: adType.duration,
      price: adType.price
    });
    onAdTypeModalOpen();
  };
  
  // Handle deleting ad type
  const handleDeleteAdType = (index: number) => {
    const updatedAdTypes = [...formData.adTypes];
    updatedAdTypes.splice(index, 1);
    setFormData({
      ...formData,
      adTypes: updatedAdTypes
    });
  };
  
  // Handle ad type form input changes
  const handleAdTypeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdTypeFormData({
      ...adTypeFormData,
      [name]: name === 'price' ? Number(value) : value,
    });
  };
  
  // Handle ad type price change
  const handleAdTypePriceChange = (valueString: string) => {
    setAdTypeFormData({
      ...adTypeFormData,
      price: Number(valueString),
    });
  };
  
  // Handle ad type form submission
  const handleAdTypeSubmit = () => {
    const updatedAdTypes = [...formData.adTypes];
    
    if (adTypeModalMode === 'add') {
      updatedAdTypes.push({
        name: adTypeFormData.name,
        duration: adTypeFormData.duration,
        price: adTypeFormData.price
      });
    } else {
      updatedAdTypes[selectedAdTypeIndex] = {
        name: adTypeFormData.name,
        duration: adTypeFormData.duration,
        price: adTypeFormData.price
      };
    }
    
    setFormData({
      ...formData,
      adTypes: updatedAdTypes
    });
    
    onAdTypeModalClose();
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // In a real app, this would save to the backend
    console.log('Saving podcast:', formData);
    onClose();
  };
  
  return (
    <MainLayout title="Podcasts Inventory" activeRoute="/inventory">
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
        
        <Tabs variant="line" colorScheme="blue" defaultIndex={5} onChange={(index) => {
            if (index === 0) window.location.href = '/inventory';
            if (index === 1) window.location.href = '/inventory/print';
            if (index === 2) window.location.href = '/inventory/newsletter';
            if (index === 3) window.location.href = '/inventory/social';
            if (index === 4) window.location.href = '/inventory/events';
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
              <Text>Events inventory content is on the events inventory page</Text>
            </TabPanel>
            
            {/* Podcasts Inventory Tab */}
            <TabPanel px={0}>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Podcasts Ad Inventory</Heading>
                <Button 
                  leftIcon={<FiPlus />} 
                  colorScheme="blue"
                  onClick={handleAddPodcast}
                  bg="primary"
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                >
                  Add Podcast
                </Button>
              </Flex>
              
              {/* Podcast stats */}
              <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
                <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
                  <StatLabel display="flex" alignItems="center">
                    <Icon as={FiRadio} mr={2} />
                    Total Podcasts
                  </StatLabel>
                  <StatNumber>5</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    25% from last month
                  </StatHelpText>
                </Stat>
                
                <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
                  <StatLabel display="flex" alignItems="center">
                    <Icon as={FiHeadphones} mr={2} />
                    Total Listeners
                  </StatLabel>
                  <StatNumber>52.5K+</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12% from last month
                  </StatHelpText>
                </Stat>
                
                <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
                  <StatLabel display="flex" alignItems="center">
                    <Icon as={FiMic} mr={2} />
                    Total Episodes
                  </StatLabel>
                  <StatNumber>156</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    8% from last month
                  </StatHelpText>
                </Stat>
                
                <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
                  <StatLabel display="flex" alignItems="center">
                    <Icon as={FiUsers} mr={2} />
                    Ad Inventory Fill Rate
                  </StatLabel>
                  <StatNumber>78%</StatNumber>
                  <Progress value={78} size="sm" colorScheme="green" mt={2} mb={2} borderRadius="full" />
                  <StatHelpText>
                    <StatArrow type="increase" />
                    5% from last month
                  </StatHelpText>
                </Stat>
              </SimpleGrid>
              
              {/* Podcasts grid */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {podcastsInventory.map(podcast => (
                  <Box
                    key={podcast.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    bg={cardBg}
                    borderColor={borderColor}
                    transition="all 0.2s"
                    _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
                  >
                    <Flex position="relative">
                      {/* Status badge */}
                      <Badge
                        position="absolute"
                        top={3}
                        right={3}
                        colorScheme={podcast.status === 'Active' ? 'green' : 'orange'}
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        {podcast.status}
                      </Badge>
                      
                      {/* Podcast image */}
                      <Image
                        src={podcast.image}
                        alt={podcast.name}
                        height="180px"
                        width="100%"
                        objectFit="cover"
                      />
                    </Flex>
                    
                    <Box p={5}>
                      <Heading size="md" mb={2}>{podcast.name}</Heading>
                      <Text fontSize="sm" color={textSecondaryColor} mb={3} noOfLines={2}>
                        {podcast.description}
                      </Text>
                      
                      <HStack mb={3}>
                        <Text fontSize="sm" fontWeight="medium">Host:</Text>
                        <Text fontSize="sm">{podcast.host}</Text>
                      </HStack>
                      
                      <SimpleGrid columns={2} spacing={3} mb={4}>
                        <Box>
                          <Text fontSize="xs" color={textSecondaryColor}>Episodes</Text>
                          <Text fontSize="sm" fontWeight="medium">{podcast.episodes}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="xs" color={textSecondaryColor}>Frequency</Text>
                          <Text fontSize="sm" fontWeight="medium">{podcast.frequency}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="xs" color={textSecondaryColor}>Listeners</Text>
                          <Text fontSize="sm" fontWeight="medium">{podcast.listeners}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="xs" color={textSecondaryColor}>Ad Types</Text>
                          <Text fontSize="sm" fontWeight="medium">{podcast.adTypes.length}</Text>
                        </Box>
                      </SimpleGrid>
                      
                      <Divider mb={4} />
                      
                      <Flex justify="space-between">
                        <Button
                          size="sm"
                          leftIcon={<FiHeadphones />}
                          variant="outline"
                          colorScheme="blue"
                          onClick={() => handleViewAdInventory(podcast)}
                        >
                          Ad Inventory
                        </Button>
                        <HStack>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditPodcast(podcast)}
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
                      </Flex>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      
      {/* Add/Edit Podcast Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalMode === 'add' ? 'Add New Podcast' : 'Edit Podcast'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Podcast Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Podcast name"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Host</FormLabel>
                <Input
                  name="host"
                  value={formData.host}
                  onChange={handleInputChange}
                  placeholder="Host name"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the podcast"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Number of Episodes</FormLabel>
                <NumberInput
                  min={0}
                  value={formData.episodes}
                  onChange={handleEpisodesChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              
              <FormControl>
                <FormLabel>Frequency</FormLabel>
                <Select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  placeholder="Select frequency"
                >
                  {frequencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Listeners</FormLabel>
                <Input
                  name="listeners"
                  value={formData.listeners}
                  onChange={handleInputChange}
                  placeholder="e.g., 15,000+"
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
                  <option value="Inactive">Inactive</option>
                </Select>
              </FormControl>
              
              <Box>
                <Flex justify="space-between" align="center" mb={3}>
                  <FormLabel mb={0}>Ad Types</FormLabel>
                  <Button
                    size="sm"
                    leftIcon={<FiPlus />}
                    colorScheme="blue"
                    onClick={handleAddAdType}
                    bg="primary"
                    color="white"
                    _hover={{ bg: 'blue.600' }}
                  >
                    Add Ad Type
                  </Button>
                </Flex>
                <Text fontSize="sm" color={textSecondaryColor} mb={3}>
                  Available ad types for this podcast
                </Text>
                
                <VStack spacing={3} align="stretch">
                  {formData.adTypes.map((adType, idx) => (
                    <Box
                      key={idx}
                      borderWidth="1px"
                      borderRadius="md"
                      p={3}
                      borderColor={borderColor}
                      position="relative"
                    >
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="medium">{adType.name}</Text>
                          <Flex mt={1}>
                            <Text fontSize="sm" color={textSecondaryColor} mr={4}>
                              <Icon as={FiClock} mr={1} />
                              {adType.duration}
                            </Text>
                            <Text fontSize="sm" fontWeight="medium" color="green.600">
                              <Icon as={FiDollarSign} mr={1} />
                              {adType.price}
                            </Text>
                          </Flex>
                        </Box>
                        <HStack spacing={1}>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditAdType(idx)}
                          >
                            <Icon as={FiEdit} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => handleDeleteAdType(idx)}
                          >
                            <Icon as={FiTrash2} />
                          </Button>
                        </HStack>
                      </Flex>
                    </Box>
                  ))}
                  
                  {formData.adTypes.length === 0 && (
                    <Box 
                      p={4} 
                      borderWidth="1px" 
                      borderRadius="md" 
                      borderStyle="dashed"
                      textAlign="center"
                    >
                      <Text color="gray.500">No ad types added yet. Click "Add Ad Type" to create one.</Text>
                    </Box>
                  )}
                </VStack>
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
              {modalMode === 'add' ? 'Add Podcast' : 'Save Changes'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Ad Inventory Modal */}
      <Modal isOpen={isAdOpen} onClose={onAdClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ad Inventory: {selectedAdPodcast?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAdPodcast && (
              <VStack spacing={4} align="stretch">
                <Flex align="center" mb={2}>
                  <Image
                    src={selectedAdPodcast.image}
                    alt={selectedAdPodcast.name}
                    boxSize="60px"
                    borderRadius="md"
                    mr={3}
                  />
                  <Box>
                    <Heading size="md">{selectedAdPodcast.name}</Heading>
                    <Text fontSize="sm" color={textSecondaryColor}>
                      {selectedAdPodcast.frequency} • {selectedAdPodcast.listeners} listeners
                    </Text>
                  </Box>
                </Flex>
                
                <Divider />
                
                <Heading size="sm" mb={2}>Available Ad Slots</Heading>
                
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Ad Type</Th>
                      <Th>Duration</Th>
                      <Th isNumeric>Price</Th>
                      <Th>Availability</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedAdPodcast.adTypes.map((adType: any, idx: number) => (
                      <Tr key={idx}>
                        <Td fontWeight="medium">{adType.name}</Td>
                        <Td>{adType.duration}</Td>
                        <Td isNumeric>${adType.price}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              idx === 0 ? 'red' : 
                              idx === 1 ? 'green' : 
                              'yellow'
                            }
                            borderRadius="full"
                            px={2}
                            py={0.5}
                          >
                            {idx === 0 ? 'Sold Out' : 
                             idx === 1 ? 'Available' : 
                             'Limited'}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                
                <Divider />
                
                <Heading size="sm" mb={2}>Upcoming Episodes</Heading>
                
                <Stack spacing={3}>
                  {[1, 2, 3].map(ep => (
                    <Box
                      key={ep}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={borderColor}
                    >
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="medium">Episode {selectedAdPodcast.episodes - 3 + ep}</Text>
                          <Text fontSize="sm" color={textSecondaryColor}>
                            {new Date(Date.now() + ep * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </Text>
                        </Box>
                        <Badge
                          colorScheme={ep === 1 ? 'yellow' : 'green'}
                          borderRadius="full"
                          px={2}
                          py={0.5}
                        >
                          {ep === 1 ? 'Limited Slots' : 'Available'}
                        </Badge>
                      </Flex>
                    </Box>
                  ))}
                </Stack>
              </VStack>
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button 
              colorScheme="blue" 
              onClick={onAdClose}
              bg="primary"
              color="white"
              _hover={{ bg: 'blue.600' }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Add/Edit Ad Type Modal */}
      <Modal isOpen={isAdTypeModalOpen} onClose={onAdTypeModalClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {adTypeModalMode === 'add' ? 'Add New Ad Type' : 'Edit Ad Type'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Ad Type Name</FormLabel>
                <Input
                  name="name"
                  value={adTypeFormData.name}
                  onChange={handleAdTypeInputChange}
                  placeholder="e.g., Pre-roll, Mid-roll, Sponsored segment"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Duration</FormLabel>
                <Select
                  name="duration"
                  value={adTypeFormData.duration}
                  onChange={handleAdTypeInputChange}
                  placeholder="Select duration"
                >
                  <option value="15 sec">15 seconds</option>
                  <option value="30 sec">30 seconds</option>
                  <option value="45 sec">45 seconds</option>
                  <option value="60 sec">60 seconds (1 minute)</option>
                  <option value="90 sec">90 seconds</option>
                  <option value="2 min">2 minutes</option>
                  <option value="3 min">3 minutes</option>
                  <option value="5 min">5 minutes</option>
                  <option value="10 min">10 minutes</option>
                  <option value="Custom">Custom</option>
                </Select>
              </FormControl>
              
              {adTypeFormData.duration === 'Custom' && (
                <FormControl isRequired>
                  <FormLabel>Custom Duration</FormLabel>
                  <Input
                    name="duration"
                    value={adTypeFormData.duration === 'Custom' ? '' : adTypeFormData.duration}
                    onChange={handleAdTypeInputChange}
                    placeholder="e.g., 7 min 30 sec"
                  />
                </FormControl>
              )}
              
              <FormControl isRequired>
                <FormLabel>Price ($)</FormLabel>
                <NumberInput
                  min={0}
                  value={adTypeFormData.price}
                  onChange={handleAdTypePriceChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAdTypeModalClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={handleAdTypeSubmit}
              bg="primary"
              color="white"
              _hover={{ bg: 'blue.600' }}
              isDisabled={!adTypeFormData.name || !adTypeFormData.duration || adTypeFormData.price <= 0}
            >
              {adTypeModalMode === 'add' ? 'Add Ad Type' : 'Save Changes'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MainLayout>
  );
};

export default PodcastsInventoryPage;
