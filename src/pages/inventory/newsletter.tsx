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
} from '@chakra-ui/react';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';

// Sample newsletter ad inventory data
const newsletterInventory = [
  {
    id: 1,
    name: 'Featured Banner',
    description: 'Top banner in the newsletter',
    position: 'Top',
    size: '600x200 px',
    frequency: 'Weekly',
    price: 350,
    status: 'Active',
    preview: '/sample/ad-previews/newsletter-banner.png',
  },
  {
    id: 2,
    name: 'Mid-Content Block',
    description: 'Ad placed between content sections',
    position: 'Middle',
    size: '600x150 px',
    frequency: 'Weekly',
    price: 250,
    status: 'Active',
    preview: '/sample/ad-previews/newsletter-mid.png',
  },
  {
    id: 3,
    name: 'Sidebar Promotion',
    description: 'Small ad in the sidebar',
    position: 'Sidebar',
    size: '300x250 px',
    frequency: 'Weekly',
    price: 150,
    status: 'Inactive',
    preview: '/sample/ad-previews/newsletter-sidebar.png',
  },
  {
    id: 4,
    name: 'Footer Sponsorship',
    description: 'Sponsorship mention in the footer',
    position: 'Footer',
    size: '600x100 px',
    frequency: 'Monthly',
    price: 200,
    status: 'Active',
    preview: '/sample/ad-previews/newsletter-footer.png',
  },
];

// Newsletter position options
const positionOptions = [
  { value: 'Top', label: 'Top Banner' },
  { value: 'Middle', label: 'Mid-Content' },
  { value: 'Sidebar', label: 'Sidebar' },
  { value: 'Footer', label: 'Footer' },
  { value: 'Custom', label: 'Custom Position' },
];

// Newsletter frequency options
const frequencyOptions = [
  { value: 'Daily', label: 'Daily Newsletter' },
  { value: 'Weekly', label: 'Weekly Newsletter' },
  { value: 'Monthly', label: 'Monthly Newsletter' },
  { value: 'Special', label: 'Special Editions' },
];

const NewsletterInventoryPage = () => {
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  
  // State for add/edit modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedAd, setSelectedAd] = useState<any>(null);
  
  // State for preview modal
  const { 
    isOpen: isPreviewOpen, 
    onOpen: onPreviewOpen, 
    onClose: onPreviewClose 
  } = useDisclosure();
  const [previewAd, setPreviewAd] = useState<any>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    position: '',
    size: '',
    frequency: '',
    price: '',
    status: 'Active',
  });
  
  // Handle opening add modal
  const handleAddAd = () => {
    setModalMode('add');
    setFormData({
      name: '',
      description: '',
      position: '',
      size: '',
      frequency: '',
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
      name: ad.name,
      description: ad.description,
      position: ad.position,
      size: ad.size,
      frequency: ad.frequency,
      price: ad.price.toString(),
      status: ad.status,
    });
    onOpen();
  };
  
  // Handle opening preview modal
  const handlePreviewAd = (ad: any) => {
    setPreviewAd(ad);
    onPreviewOpen();
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
    console.log('Saving newsletter ad:', formData);
    onClose();
  };
  
  return (
    <MainLayout title="Newsletter Inventory Management" activeRoute="/inventory">
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
        
        <Tabs variant="line" colorScheme="blue" defaultIndex={2} onChange={(index) => {
            if (index === 0) window.location.href = '/inventory';
            if (index === 1) window.location.href = '/inventory/print';
            if (index === 3) window.location.href = '/inventory/social';
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
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Newsletter Ad Inventory</Heading>
                <Button 
                  leftIcon={<FiPlus />} 
                  colorScheme="blue"
                  onClick={handleAddAd}
                  bg="primary"
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                >
                  Add Newsletter Ad
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
                      <Th>Name</Th>
                      <Th>Position</Th>
                      <Th>Size</Th>
                      <Th>Frequency</Th>
                      <Th isNumeric>Price</Th>
                      <Th>Status</Th>
                      <Th width="150px">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {newsletterInventory.map((ad) => (
                      <Tr key={ad.id}>
                        <Td>
                          <Text fontWeight="medium">{ad.name}</Text>
                          <Text fontSize="sm" color={textSecondaryColor}>
                            {ad.description}
                          </Text>
                        </Td>
                        <Td>{ad.position}</Td>
                        <Td>{ad.size}</Td>
                        <Td>{ad.frequency}</Td>
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
                              onClick={() => handlePreviewAd(ad)}
                              aria-label="Preview"
                            >
                              <Icon as={FiEye} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditAd(ad)}
                              aria-label="Edit"
                            >
                              <Icon as={FiEdit} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              aria-label="Delete"
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
              <Text>Social inventory content will go here</Text>
            </TabPanel>
            <TabPanel>
              <Text>Events inventory content will go here</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      
      {/* Add/Edit Newsletter Ad Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalMode === 'add' ? 'Add New Newsletter Ad' : 'Edit Newsletter Ad'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ad name"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the ad placement"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Position</FormLabel>
                <Select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Select position"
                >
                  {positionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Size</FormLabel>
                <Input
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="e.g., 600x200 px"
                />
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
              
              <Box>
                <FormLabel>Newsletter Template Preview</FormLabel>
                <Text fontSize="sm" color={textSecondaryColor} mb={3}>
                  This is how your ad will appear in the newsletter
                </Text>
                
                <Box
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  bg="gray.50"
                >
                  <Box bg="white" p={4} borderRadius="md" maxW="600px" mx="auto">
                    {/* Newsletter Header */}
                    <Box borderBottom="1px solid" borderColor="gray.200" pb={3} mb={4}>
                      <Heading size="md" textAlign="center">NEWSLETTER TEMPLATE</Heading>
                    </Box>
                    
                    {/* Top Banner Position */}
                    {formData.position === 'Top' && (
                      <Box
                        mb={4}
                        p={3}
                        bg="yellow.100"
                        border="2px dashed"
                        borderColor="yellow.500"
                        borderRadius="md"
                        textAlign="center"
                      >
                        <Text fontWeight="bold" color="yellow.800">TOP BANNER AD PLACEMENT</Text>
                        <Text fontSize="sm" color="yellow.800">{formData.size || '600x200 px'}</Text>
                      </Box>
                    )}
                    
                    {/* Newsletter Content Start */}
                    <Box mb={4}>
                      <Heading size="sm" mb={2}>Newsletter Content</Heading>
                      <Text fontSize="sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
                      </Text>
                    </Box>
                    
                    {/* Mid-Content Position */}
                    {formData.position === 'Middle' && (
                      <Box
                        my={4}
                        p={3}
                        bg="yellow.100"
                        border="2px dashed"
                        borderColor="yellow.500"
                        borderRadius="md"
                        textAlign="center"
                      >
                        <Text fontWeight="bold" color="yellow.800">MID-CONTENT AD PLACEMENT</Text>
                        <Text fontSize="sm" color="yellow.800">{formData.size || '600x150 px'}</Text>
                      </Box>
                    )}
                    
                    {/* More Newsletter Content */}
                    <Flex mb={4}>
                      {/* Main Content */}
                      <Box flex="2" pr={formData.position === 'Sidebar' ? 4 : 0}>
                        <Heading size="sm" mb={2}>More Content</Heading>
                        <Text fontSize="sm">
                          Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                        </Text>
                      </Box>
                      
                      {/* Sidebar Position */}
                      {formData.position === 'Sidebar' && (
                        <Box
                          flex="1"
                          p={3}
                          bg="yellow.100"
                          border="2px dashed"
                          borderColor="yellow.500"
                          borderRadius="md"
                          textAlign="center"
                        >
                          <Text fontWeight="bold" color="yellow.800" fontSize="sm">SIDEBAR AD</Text>
                          <Text fontSize="xs" color="yellow.800">{formData.size || '300x250 px'}</Text>
                        </Box>
                      )}
                    </Flex>
                    
                    {/* Newsletter Footer */}
                    <Box borderTop="1px solid" borderColor="gray.200" pt={3}>
                      {/* Footer Position */}
                      {formData.position === 'Footer' ? (
                        <Box
                          p={2}
                          bg="yellow.100"
                          border="2px dashed"
                          borderColor="yellow.500"
                          borderRadius="md"
                          textAlign="center"
                        >
                          <Text fontWeight="bold" color="yellow.800" fontSize="sm">FOOTER SPONSORSHIP</Text>
                          <Text fontSize="xs" color="yellow.800">{formData.size || '600x100 px'}</Text>
                        </Box>
                      ) : (
                        <Text fontSize="xs" color="gray.500" textAlign="center">
                          Unsubscribe | View in browser | Privacy Policy
                        </Text>
                      )}
                    </Box>
                  </Box>
                </Box>
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
              {modalMode === 'add' ? 'Add Ad' : 'Save Changes'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Ad Preview Modal */}
      <Modal isOpen={isPreviewOpen} onClose={onPreviewClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Newsletter Ad Preview: {previewAd?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {previewAd && (
              <Box>
                <Text mb={4}>
                  This is how your ad will appear in the newsletter. The highlighted area represents the ad placement.
                </Text>
                
                <Box
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  bg="white"
                  p={6}
                  maxW="700px"
                  mx="auto"
                >
                  {/* Newsletter mockup with highlighted ad slot */}
                  <Box borderBottom="1px solid" borderColor="gray.200" pb={3} mb={4}>
                    <Heading size="md" textAlign="center">NEWSLETTER MOCKUP</Heading>
                  </Box>
                  
                  {/* Top Banner */}
                  {previewAd.position === 'Top' && (
                    <Box
                      mb={4}
                      p={3}
                      bg="yellow.100"
                      border="2px dashed"
                      borderColor="yellow.500"
                      borderRadius="md"
                      textAlign="center"
                    >
                      <Text fontWeight="bold" color="yellow.800" mb={2}>TOP BANNER AD PLACEMENT</Text>
                      <Image
                        src={previewAd.preview}
                        alt="Ad Preview"
                        fallbackSrc="https://via.placeholder.com/600x200"
                        maxW="100%"
                        maxH="200px"
                        objectFit="contain"
                      />
                    </Box>
                  )}
                  
                  {/* Newsletter Content */}
                  <Box mb={4}>
                    <Heading size="sm" mb={2}>Newsletter Content</Heading>
                    <Text fontSize="sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                    </Text>
                  </Box>
                  
                  {/* Mid-Content */}
                  {previewAd.position === 'Middle' && (
                    <Box
                      my={4}
                      p={3}
                      bg="yellow.100"
                      border="2px dashed"
                      borderColor="yellow.500"
                      borderRadius="md"
                      textAlign="center"
                    >
                      <Text fontWeight="bold" color="yellow.800" mb={2}>MID-CONTENT AD PLACEMENT</Text>
                      <Image
                        src={previewAd.preview}
                        alt="Ad Preview"
                        fallbackSrc="https://via.placeholder.com/600x150"
                        maxW="100%"
                        maxH="150px"
                        objectFit="contain"
                      />
                    </Box>
                  )}
                  
                  {/* More Newsletter Content with Sidebar */}
                  <Flex mb={4}>
                    <Box flex={previewAd.position === 'Sidebar' ? "2" : "1"} pr={previewAd.position === 'Sidebar' ? 4 : 0}>
                      <Heading size="sm" mb={2}>More Content</Heading>
                      <Text fontSize="sm">
                        Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
                      </Text>
                    </Box>
                    
                    {/* Sidebar */}
                    {previewAd.position === 'Sidebar' && (
                      <Box
                        flex="1"
                        p={3}
                        bg="yellow.100"
                        border="2px dashed"
                        borderColor="yellow.500"
                        borderRadius="md"
                        textAlign="center"
                      >
                        <Text fontWeight="bold" color="yellow.800" mb={2} fontSize="sm">SIDEBAR AD</Text>
                        <Image
                          src={previewAd.preview}
                          alt="Ad Preview"
                          fallbackSrc="https://via.placeholder.com/300x250"
                          maxW="100%"
                          maxH="250px"
                          objectFit="contain"
                        />
                      </Box>
                    )}
                  </Flex>
                  
                  {/* Newsletter Footer */}
                  <Box borderTop="1px solid" borderColor="gray.200" pt={3}>
                    {/* Footer Sponsorship */}
                    {previewAd.position === 'Footer' ? (
                      <Box
                        p={2}
                        bg="yellow.100"
                        border="2px dashed"
                        borderColor="yellow.500"
                        borderRadius="md"
                        textAlign="center"
                      >
                        <Text fontWeight="bold" color="yellow.800" mb={2} fontSize="sm">FOOTER SPONSORSHIP</Text>
                        <Image
                          src={previewAd.preview}
                          alt="Ad Preview"
                          fallbackSrc="https://via.placeholder.com/600x100"
                          maxW="100%"
                          maxH="100px"
                          objectFit="contain"
                        />
                      </Box>
                    ) : (
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        Unsubscribe | View in browser | Privacy Policy
                      </Text>
                    )}
                  </Box>
                </Box>
                
                <Box mt={4}>
                  <Text fontWeight="bold">Ad Details:</Text>
                  <SimpleGrid columns={2} spacing={4} mt={2}>
                    <Box>
                      <Text fontWeight="medium">Position:</Text>
                      <Text>{previewAd.position}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="medium">Size:</Text>
                      <Text>{previewAd.size}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="medium">Frequency:</Text>
                      <Text>{previewAd.frequency}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="medium">Price:</Text>
                      <Text>${previewAd.price}</Text>
                    </Box>
                  </SimpleGrid>
                </Box>
              </Box>
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button 
              colorScheme="blue" 
              onClick={onPreviewClose}
              bg="primary"
              color="white"
              _hover={{ bg: 'blue.600' }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MainLayout>
  );
};

export default NewsletterInventoryPage;
