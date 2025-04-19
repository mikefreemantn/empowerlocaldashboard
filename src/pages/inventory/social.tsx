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
  Avatar,
} from '@chakra-ui/react';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';

// Sample social media inventory data
const socialInventory = [
  {
    id: 1,
    platform: 'Instagram',
    type: 'Post',
    description: 'Sponsored post in feed',
    audience: 'Local Portland followers, 25-34',
    reach: '15K-20K',
    engagement: '3-5%',
    price: 450,
    status: 'Active',
    icon: FiInstagram,
  },
  {
    id: 2,
    platform: 'Instagram',
    type: 'Story',
    description: 'Sponsored story with swipe-up',
    audience: 'Local Portland followers, 18-45',
    reach: '10K-15K',
    engagement: '1-2%',
    price: 350,
    status: 'Active',
    icon: FiInstagram,
  },
  {
    id: 3,
    platform: 'Facebook',
    type: 'Post',
    description: 'Sponsored post with local targeting',
    audience: 'Portland metro area, 25-55',
    reach: '25K-35K',
    engagement: '2-3%',
    price: 550,
    status: 'Active',
    icon: FiFacebook,
  },
  {
    id: 4,
    platform: 'Twitter',
    type: 'Promoted Tweet',
    description: 'Promoted tweet with hashtag campaign',
    audience: 'Portland area, news & culture followers',
    reach: '10K-15K',
    engagement: '1-2%',
    price: 300,
    status: 'Inactive',
    icon: FiTwitter,
  },
  {
    id: 5,
    platform: 'LinkedIn',
    type: 'Sponsored Content',
    description: 'B2B sponsored content for local businesses',
    audience: 'Portland business professionals',
    reach: '5K-8K',
    engagement: '2-3%',
    price: 650,
    status: 'Active',
    icon: FiLinkedin,
  },
];

// Platform options
const platformOptions = [
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'TikTok', label: 'TikTok' },
  { value: 'Pinterest', label: 'Pinterest' },
];

// Ad type options
const adTypeOptions = [
  { value: 'Post', label: 'Post' },
  { value: 'Story', label: 'Story' },
  { value: 'Reel', label: 'Reel' },
  { value: 'Promoted Tweet', label: 'Promoted Tweet' },
  { value: 'Sponsored Content', label: 'Sponsored Content' },
  { value: 'Video', label: 'Video' },
];

const SocialInventoryPage = () => {
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  
  // State for add/edit modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedAd, setSelectedAd] = useState<any>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    platform: '',
    type: '',
    description: '',
    audience: '',
    reach: '',
    engagement: '',
    price: '',
    status: 'Active',
  });
  
  // Handle opening add modal
  const handleAddAd = () => {
    setModalMode('add');
    setFormData({
      platform: '',
      type: '',
      description: '',
      audience: '',
      reach: '',
      engagement: '',
      price: '',
      status: 'Active',
    });
    onOpen();
  };
  
  // Handle opening edit modal
  const handleEditAd = (ad: any) => {
    setModalMode('edit');
    setSelectedAd(ad);
    setFormData({
      platform: ad.platform,
      type: ad.type,
      description: ad.description,
      audience: ad.audience,
      reach: ad.reach,
      engagement: ad.engagement,
      price: ad.price.toString(),
      status: ad.status,
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
  
  // Handle price input change
  const handlePriceChange = (valueString: string) => {
    setFormData({
      ...formData,
      price: valueString,
    });
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // In a real app, this would save to the backend
    console.log('Saving social media ad:', formData);
    onClose();
  };
  
  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return FiInstagram;
      case 'Facebook':
        return FiFacebook;
      case 'Twitter':
        return FiTwitter;
      case 'LinkedIn':
        return FiLinkedin;
      default:
        return FiInstagram;
    }
  };
  
  // Get platform color
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return 'purple';
      case 'Facebook':
        return 'blue';
      case 'Twitter':
        return 'twitter';
      case 'LinkedIn':
        return 'linkedin';
      default:
        return 'gray';
    }
  };
  
  return (
    <MainLayout title="Social Media Inventory" activeRoute="/inventory">
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
        
        <Tabs variant="line" colorScheme="blue" defaultIndex={3} onChange={(index) => {
            if (index === 0) window.location.href = '/inventory';
            if (index === 1) window.location.href = '/inventory/print';
            if (index === 2) window.location.href = '/inventory/newsletter';
            if (index === 4) window.location.href = '/inventory/events';
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
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Social Media Ad Inventory</Heading>
                <Button 
                  leftIcon={<FiPlus />} 
                  colorScheme="blue"
                  onClick={handleAddAd}
                  bg="primary"
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                >
                  Add Social Media Ad
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
                      <Th>Platform</Th>
                      <Th>Type</Th>
                      <Th>Description</Th>
                      <Th>Audience</Th>
                      <Th>Reach</Th>
                      <Th isNumeric>Price</Th>
                      <Th>Status</Th>
                      <Th width="120px">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {socialInventory.map((ad) => (
                      <Tr key={ad.id}>
                        <Td>
                          <Flex align="center">
                            <Avatar 
                              icon={<Icon as={ad.icon} fontSize="1.2rem" />} 
                              size="sm" 
                              bg={`${getPlatformColor(ad.platform)}.500`}
                              color="white"
                              mr={2}
                            />
                            <Text fontWeight="medium">{ad.platform}</Text>
                          </Flex>
                        </Td>
                        <Td>{ad.type}</Td>
                        <Td>
                          <Text fontSize="sm">{ad.description}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{ad.audience}</Text>
                        </Td>
                        <Td>{ad.reach}</Td>
                        <Td isNumeric>${ad.price}</Td>
                        <Td>
                          <Badge
                            colorScheme={ad.status === 'Active' ? 'green' : 'orange'}
                            borderRadius="full"
                            px={2}
                            py={1}
                          >
                            {ad.status}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditAd(ad)}
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
            
            {/* Other tabs would be implemented similarly */}
            <TabPanel>
              <Text>Events inventory content will go here</Text>
            </TabPanel>
            <TabPanel>
              <Text>Podcasts inventory content will go here</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      
      {/* Add/Edit Social Media Ad Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalMode === 'add' ? 'Add New Social Media Ad' : 'Edit Social Media Ad'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Platform</FormLabel>
                <Select
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  placeholder="Select platform"
                >
                  {platformOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Ad Type</FormLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Select ad type"
                >
                  {adTypeOptions.map(option => (
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
                  placeholder="Brief description of the ad"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Target Audience</FormLabel>
                <Input
                  name="audience"
                  value={formData.audience}
                  onChange={handleInputChange}
                  placeholder="e.g., Portland metro area, 25-55"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Estimated Reach</FormLabel>
                <Input
                  name="reach"
                  value={formData.reach}
                  onChange={handleInputChange}
                  placeholder="e.g., 10K-15K"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Expected Engagement Rate</FormLabel>
                <Input
                  name="engagement"
                  value={formData.engagement}
                  onChange={handleInputChange}
                  placeholder="e.g., 2-3%"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Price ($)</FormLabel>
                <NumberInput
                  min={0}
                  value={formData.price}
                  onChange={handlePriceChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
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
              {modalMode === 'add' ? 'Add Ad' : 'Save Changes'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MainLayout>
  );
};

export default SocialInventoryPage;
