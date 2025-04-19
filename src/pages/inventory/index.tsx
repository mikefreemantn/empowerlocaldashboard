import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
} from '@chakra-ui/react';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiCheck, FiX, FiEye } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';
import Heading from '@/components/ui/Heading';

// Sample ad inventory data
const websiteInventory = [
  {
    id: 1,
    name: 'Homepage Banner',
    description: 'Top banner on homepage',
    size: '728x90',
    position: 'Top',
    price: 1200,
    status: 'Active',
    fillRate: '85%',
    visualPreview: '/sample/ad-previews/homepage-banner.png',
  },
  {
    id: 2,
    name: 'Sidebar Skyscraper',
    description: 'Tall ad on article sidebar',
    size: '300x600',
    position: 'Right Sidebar',
    price: 800,
    status: 'Active',
    fillRate: '72%',
    visualPreview: '/sample/ad-previews/sidebar-skyscraper.png',
  },
  {
    id: 3,
    name: 'In-Article Banner',
    description: 'Banner within article content',
    size: '468x60',
    position: 'In-Content',
    price: 600,
    status: 'Active',
    fillRate: '68%',
    visualPreview: '/sample/ad-previews/in-article-banner.png',
  },
  {
    id: 4,
    name: 'Footer Banner',
    description: 'Banner at the bottom of all pages',
    size: '728x90',
    position: 'Footer',
    price: 500,
    status: 'Inactive',
    fillRate: '45%',
    visualPreview: '/sample/ad-previews/footer-banner.png',
  },
  {
    id: 5,
    name: 'Popup Ad',
    description: 'Popup displayed on page load',
    size: '600x400',
    position: 'Overlay',
    price: 1500,
    status: 'Active',
    fillRate: '90%',
    visualPreview: '/sample/ad-previews/popup-ad.png',
  },
];

// Ad size options
const adSizeOptions = [
  { value: '728x90', label: 'Leaderboard (728x90)' },
  { value: '300x600', label: 'Half Page/Skyscraper (300x600)' },
  { value: '300x250', label: 'Medium Rectangle (300x250)' },
  { value: '468x60', label: 'Banner (468x60)' },
  { value: '320x100', label: 'Mobile Banner (320x100)' },
  { value: '970x250', label: 'Billboard (970x250)' },
  { value: '600x400', label: 'Popup (600x400)' },
];

// Ad position options
const adPositionOptions = [
  { value: 'Top', label: 'Top of Page' },
  { value: 'Right Sidebar', label: 'Right Sidebar' },
  { value: 'Left Sidebar', label: 'Left Sidebar' },
  { value: 'In-Content', label: 'Within Content' },
  { value: 'Footer', label: 'Footer' },
  { value: 'Overlay', label: 'Popup/Overlay' },
];

// Ad preview templates
const adPreviewTemplates = [
  {
    size: '728x90',
    label: 'Leaderboard',
    image: '/sample/ad-templates/leaderboard.png',
  },
  {
    size: '300x600',
    label: 'Skyscraper',
    image: '/sample/ad-templates/skyscraper.png',
  },
  {
    size: '300x250',
    label: 'Medium Rectangle',
    image: '/sample/ad-templates/medium-rectangle.png',
  },
  {
    size: '468x60',
    label: 'Banner',
    image: '/sample/ad-templates/banner.png',
  },
  {
    size: '970x250',
    label: 'Billboard',
    image: '/sample/ad-templates/billboard.png',
  },
];

const InventoryPage = () => {
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  
  // State for add/edit modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
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
    size: '',
    position: '',
    price: '',
    status: 'Active',
  });
  
  // Handle opening add modal
  const handleAddAd = () => {
    setModalMode('add');
    setFormData({
      name: '',
      description: '',
      size: '',
      position: '',
      price: '',
      status: 'Active',
    });
    setSelectedTemplate(null);
    onOpen();
  };
  
  // Handle opening edit modal
  const handleEditAd = (ad: any) => {
    setModalMode('edit');
    setSelectedAd(ad);
    setFormData({
      name: ad.name,
      description: ad.description,
      size: ad.size,
      position: ad.position,
      price: ad.price.toString(),
      status: ad.status,
    });
    setSelectedTemplate(ad.size);
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
    
    // Update selected template when size changes
    if (name === 'size') {
      setSelectedTemplate(value);
    }
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
    console.log('Saving ad:', formData);
    onClose();
  };
  
  // Select a template
  const handleSelectTemplate = (size: string) => {
    setSelectedTemplate(size);
    setFormData({
      ...formData,
      size,
    });
  };
  
  return (
    <MainLayout title="Inventory Management" activeRoute="/inventory">
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading variant="h2" size="lg" mb={1}>Inventory Management</Heading>
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
        
        <Tabs variant="line" colorScheme="blue" defaultIndex={0} onChange={(index) => {
            if (index === 1) window.location.href = '/inventory/print';
            if (index === 2) window.location.href = '/inventory/newsletter';
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
              <Flex justify="space-between" align="center" mb={4}>
                <Heading variant="h3" size="md">Website Ad Inventory</Heading>
                <Button 
                  leftIcon={<FiPlus />} 
                  colorScheme="blue"
                  onClick={handleAddAd}
                  bg="primary"
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                >
                  Add Website Ad
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
                      <Th>Size</Th>
                      <Th>Position</Th>
                      <Th isNumeric>Price</Th>
                      <Th>Fill Rate</Th>
                      <Th>Status</Th>
                      <Th width="150px">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {websiteInventory.map((ad) => (
                      <Tr key={ad.id}>
                        <Td>
                          <Text fontWeight="medium">{ad.name}</Text>
                          <Text fontSize="sm" color={textSecondaryColor}>
                            {ad.description}
                          </Text>
                        </Td>
                        <Td>{ad.size}</Td>
                        <Td>{ad.position}</Td>
                        <Td isNumeric>${ad.price}</Td>
                        <Td>{ad.fillRate}</Td>
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
                              icon={<FiEye />}
                            >
                              <Icon as={FiEye} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditAd(ad)}
                              aria-label="Edit"
                              icon={<FiEdit />}
                            >
                              <Icon as={FiEdit} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              aria-label="Delete"
                              icon={<FiTrash2 />}
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
              <Text>Print inventory content will go here</Text>
            </TabPanel>
            <TabPanel>
              <Text>Newsletter inventory content will go here</Text>
            </TabPanel>
            <TabPanel>
              <Text>Social inventory content will go here</Text>
            </TabPanel>
            <TabPanel>
              <Text>Events inventory content will go here</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      
      {/* Add/Edit Ad Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalMode === 'add' ? 'Add New Website Ad' : 'Edit Website Ad'}
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
                <FormLabel>Ad Size</FormLabel>
                <Select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="Select ad size"
                >
                  {adSizeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Position</FormLabel>
                <Select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Select position"
                >
                  {adPositionOptions.map(option => (
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
                <FormLabel>Visual Preview Templates</FormLabel>
                <Text fontSize="sm" color={textSecondaryColor} mb={3}>
                  Select a template to visualize how this ad will appear on your website
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  {adPreviewTemplates.map(template => (
                    <Box
                      key={template.size}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={selectedTemplate === template.size ? 'blue.500' : borderColor}
                      p={3}
                      cursor="pointer"
                      onClick={() => handleSelectTemplate(template.size)}
                      bg={selectedTemplate === template.size ? 'blue.50' : undefined}
                      _hover={{ borderColor: 'blue.300' }}
                      transition="all 0.2s"
                    >
                      <VStack spacing={2}>
                        <Image
                          src={template.image}
                          alt={template.label}
                          fallbackSrc="https://via.placeholder.com/150"
                          height="100px"
                          objectFit="contain"
                        />
                        <Text fontSize="sm" fontWeight="medium">
                          {template.label}
                        </Text>
                        <Text fontSize="xs" color={textSecondaryColor}>
                          {template.size}
                        </Text>
                      </VStack>
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
              {modalMode === 'add' ? 'Add Ad' : 'Save Changes'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Ad Preview Modal */}
      <Modal isOpen={isPreviewOpen} onClose={onPreviewClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ad Preview: {previewAd?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {previewAd && (
              <Box>
                <Text mb={4}>
                  This is how your ad will appear on your website. The highlighted area represents the ad placement.
                </Text>
                
                <Box
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  position="relative"
                >
                  {/* Website mockup with highlighted ad slot */}
                  <Box position="relative">
                    {/* Example website mockup */}
                    <Box
                      bg="gray.100"
                      p={4}
                      borderBottomWidth="1px"
                      borderColor="gray.300"
                    >
                      <Flex justify="space-between" align="center">
                        <Text fontWeight="bold">Website Header</Text>
                        <HStack spacing={4}>
                          <Text>Home</Text>
                          <Text>About</Text>
                          <Text>News</Text>
                          <Text>Contact</Text>
                        </HStack>
                      </Flex>
                    </Box>
                    
                    {/* Main content area with ad placement */}
                    <Flex minH="500px">
                      {/* Left sidebar */}
                      {previewAd.position === 'Left Sidebar' ? (
                        <Box
                          w="300px"
                          bg="yellow.100"
                          p={2}
                          border="2px dashed"
                          borderColor="yellow.500"
                        >
                          <Text textAlign="center" fontWeight="bold" color="yellow.800">
                            AD PLACEMENT
                          </Text>
                          <Text textAlign="center" fontSize="sm" color="yellow.800">
                            {previewAd.size}
                          </Text>
                          <Image
                            src={previewAd.visualPreview}
                            alt="Ad Preview"
                            fallbackSrc={`https://via.placeholder.com/${previewAd.size.replace('x', '/')}`}
                            maxW="100%"
                            my={2}
                          />
                        </Box>
                      ) : (
                        <Box w="200px" bg="gray.200" p={4}>
                          <Text fontWeight="bold" mb={2}>Navigation</Text>
                          <VStack align="start" spacing={2}>
                            <Text>Category 1</Text>
                            <Text>Category 2</Text>
                            <Text>Category 3</Text>
                            <Text>Category 4</Text>
                          </VStack>
                        </Box>
                      )}
                      
                      {/* Main content */}
                      <Box flex="1" p={4}>
                        {/* Top banner */}
                        {previewAd.position === 'Top' && (
                          <Box
                            w="100%"
                            h="90px"
                            mb={4}
                            bg="yellow.100"
                            p={2}
                            border="2px dashed"
                            borderColor="yellow.500"
                          >
                            <Text textAlign="center" fontWeight="bold" color="yellow.800">
                              AD PLACEMENT
                            </Text>
                            <Text textAlign="center" fontSize="sm" color="yellow.800">
                              {previewAd.size}
                            </Text>
                            <Image
                              src={previewAd.visualPreview}
                              alt="Ad Preview"
                              fallbackSrc={`https://via.placeholder.com/${previewAd.size.replace('x', '/')}`}
                              maxW="100%"
                              maxH="70px"
                              mx="auto"
                            />
                          </Box>
                        )}
                        
                        <Heading variant="h3" size="md" mb={4}>Article Title</Heading>
                        
                        <Text mb={4}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                        </Text>
                        
                        {/* In-content ad */}
                        {previewAd.position === 'In-Content' && (
                          <Box
                            w="100%"
                            my={4}
                            bg="yellow.100"
                            p={2}
                            border="2px dashed"
                            borderColor="yellow.500"
                          >
                            <Text textAlign="center" fontWeight="bold" color="yellow.800">
                              AD PLACEMENT
                            </Text>
                            <Text textAlign="center" fontSize="sm" color="yellow.800">
                              {previewAd.size}
                            </Text>
                            <Image
                              src={previewAd.visualPreview}
                              alt="Ad Preview"
                              fallbackSrc={`https://via.placeholder.com/${previewAd.size.replace('x', '/')}`}
                              maxW="100%"
                              mx="auto"
                              my={2}
                            />
                          </Box>
                        )}
                        
                        <Text mb={4}>
                          Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                        </Text>
                        
                        <Text>
                          Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                        </Text>
                      </Box>
                      
                      {/* Right sidebar */}
                      {previewAd.position === 'Right Sidebar' ? (
                        <Box
                          w="300px"
                          bg="yellow.100"
                          p={2}
                          border="2px dashed"
                          borderColor="yellow.500"
                        >
                          <Text textAlign="center" fontWeight="bold" color="yellow.800">
                            AD PLACEMENT
                          </Text>
                          <Text textAlign="center" fontSize="sm" color="yellow.800">
                            {previewAd.size}
                          </Text>
                          <Image
                            src={previewAd.visualPreview}
                            alt="Ad Preview"
                            fallbackSrc={`https://via.placeholder.com/${previewAd.size.replace('x', '/')}`}
                            maxW="100%"
                            my={2}
                          />
                        </Box>
                      ) : (
                        <Box w="250px" bg="gray.200" p={4}>
                          <Text fontWeight="bold" mb={2}>Related Content</Text>
                          <VStack align="start" spacing={4}>
                            <Text>Related Article 1</Text>
                            <Text>Related Article 2</Text>
                            <Text>Related Article 3</Text>
                          </VStack>
                        </Box>
                      )}
                    </Flex>
                    
                    {/* Footer */}
                    <Box bg="gray.100" p={4}>
                      {previewAd.position === 'Footer' ? (
                        <Box
                          w="100%"
                          bg="yellow.100"
                          p={2}
                          border="2px dashed"
                          borderColor="yellow.500"
                        >
                          <Text textAlign="center" fontWeight="bold" color="yellow.800">
                            AD PLACEMENT
                          </Text>
                          <Text textAlign="center" fontSize="sm" color="yellow.800">
                            {previewAd.size}
                          </Text>
                          <Image
                            src={previewAd.visualPreview}
                            alt="Ad Preview"
                            fallbackSrc={`https://via.placeholder.com/${previewAd.size.replace('x', '/')}`}
                            maxW="100%"
                            mx="auto"
                            my={2}
                          />
                        </Box>
                      ) : (
                        <Text textAlign="center">Website Footer</Text>
                      )}
                    </Box>
                    
                    {/* Popup overlay */}
                    {previewAd.position === 'Overlay' && (
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bg="rgba(0,0,0,0.5)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          bg="yellow.100"
                          p={2}
                          border="2px dashed"
                          borderColor="yellow.500"
                          maxW="600px"
                          maxH="400px"
                        >
                          <Text textAlign="center" fontWeight="bold" color="yellow.800">
                            POPUP AD PLACEMENT
                          </Text>
                          <Text textAlign="center" fontSize="sm" color="yellow.800">
                            {previewAd.size}
                          </Text>
                          <Image
                            src={previewAd.visualPreview}
                            alt="Ad Preview"
                            fallbackSrc={`https://via.placeholder.com/${previewAd.size.replace('x', '/')}`}
                            maxW="100%"
                            mx="auto"
                            my={2}
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
                
                <Box mt={4}>
                  <Text fontWeight="bold">Ad Details:</Text>
                  <SimpleGrid columns={2} spacing={4} mt={2}>
                    <Box>
                      <Text fontWeight="medium">Size:</Text>
                      <Text>{previewAd.size}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="medium">Position:</Text>
                      <Text>{previewAd.position}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="medium">Price:</Text>
                      <Text>${previewAd.price}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="medium">Fill Rate:</Text>
                      <Text>{previewAd.fillRate}</Text>
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

export default InventoryPage;
