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
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiCheck, FiX, FiEye } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';

// Sample print ad inventory data
const printInventory = [
  {
    id: 1,
    name: 'Full Page Back Cover',
    description: 'Full page ad on the back cover',
    size: 'Full Page',
    position: 'Back Cover',
    availableIssues: 'All issues except special editions',
    price: 2500,
    status: 'Active',
    visualPreview: '/sample/ad-previews/full-page-back.png',
  },
  {
    id: 2,
    name: 'Half Page Inside Front',
    description: 'Half page ad on inside front cover',
    size: 'Half Page',
    position: 'Inside Front Cover',
    availableIssues: 'All issues',
    price: 1500,
    status: 'Active',
    visualPreview: '/sample/ad-previews/half-page-inside-front.png',
  },
  {
    id: 3,
    name: 'Quarter Page Run of Paper',
    description: 'Quarter page ad anywhere in publication',
    size: 'Quarter Page',
    position: 'Run of Paper',
    availableIssues: 'All issues',
    price: 800,
    status: 'Inactive',
    visualPreview: '/sample/ad-previews/quarter-page.png',
  },
  {
    id: 4,
    name: 'Center Spread',
    description: 'Two-page spread in center of publication',
    size: 'Double Page',
    position: 'Center',
    availableIssues: 'Monthly specials only',
    price: 3200,
    status: 'Active',
    visualPreview: '/sample/ad-previews/center-spread.png',
  },
  {
    id: 5,
    name: 'Classified Ad',
    description: 'Small classified ad in classified section',
    size: '2x2 inches',
    position: 'Classified Section',
    availableIssues: 'All issues',
    price: 200,
    status: 'Active',
    visualPreview: '/sample/ad-previews/classified.png',
  },
];

// Print ad size options
const printAdSizeOptions = [
  { value: 'Full Page', label: 'Full Page' },
  { value: 'Half Page', label: 'Half Page' },
  { value: 'Quarter Page', label: 'Quarter Page' },
  { value: 'Double Page', label: 'Double Page (Spread)' },
  { value: '2x2 inches', label: 'Small (2x2 inches)' },
  { value: '3x5 inches', label: 'Medium (3x5 inches)' },
  { value: 'Custom', label: 'Custom Size' },
];

// Print ad position options
const printAdPositionOptions = [
  { value: 'Back Cover', label: 'Back Cover' },
  { value: 'Inside Front Cover', label: 'Inside Front Cover' },
  { value: 'Inside Back Cover', label: 'Inside Back Cover' },
  { value: 'Run of Paper', label: 'Run of Paper (ROP)' },
  { value: 'Center', label: 'Center of Publication' },
  { value: 'Classified Section', label: 'Classified Section' },
  { value: 'Premium Position', label: 'Premium Position (First 10 pages)' },
];

// Print ad preview templates
const printAdPreviewTemplates = [
  {
    size: 'Full Page',
    label: 'Full Page',
    image: '/sample/ad-templates/full-page.png',
  },
  {
    size: 'Half Page',
    label: 'Half Page',
    image: '/sample/ad-templates/half-page.png',
  },
  {
    size: 'Quarter Page',
    label: 'Quarter Page',
    image: '/sample/ad-templates/quarter-page.png',
  },
  {
    size: 'Double Page',
    label: 'Double Page Spread',
    image: '/sample/ad-templates/double-page.png',
  },
  {
    size: '2x2 inches',
    label: 'Classified (2x2)',
    image: '/sample/ad-templates/classified.png',
  },
];

const PrintInventoryPage = () => {
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
    availableIssues: '',
    price: '',
    status: 'Active',
    customWidth: '',
    customHeight: '',
    customUnit: 'inches', // Default unit for custom sizes
  });
  
  // Handle opening add modal
  const handleAddAd = () => {
    setModalMode('add');
    setFormData({
      name: '',
      description: '',
      size: '',
      position: '',
      availableIssues: '',
      price: '',
      status: 'Active',
      customWidth: '',
      customHeight: '',
      customUnit: 'inches',
    });
    setSelectedTemplate(null);
    onOpen();
  };
  
  // Handle opening edit modal
  const handleEditAd = (ad: any) => {
    setModalMode('edit');
    setSelectedAd(ad);
    
    // Check if the size is a custom size (not in standard options)
    const isCustomSize = !printAdSizeOptions.some(option => 
      option.value === ad.size && option.value !== 'Custom'
    );
    
    // Parse width, height and unit if it's a custom size
    let customWidth = '';
    let customHeight = '';
    let customUnit = 'inches';
    
    if (isCustomSize) {
      // Parse custom size format (e.g., "5x7 inches" or "10x12 cm")
      const sizeMatch = ad.size.match(/([\d.]+)\s*x\s*([\d.]+)\s*(inches|cm|mm)?/i);
      if (sizeMatch) {
        customWidth = sizeMatch[1];
        customHeight = sizeMatch[2];
        if (sizeMatch[3]) {
          customUnit = sizeMatch[3].toLowerCase();
        }
      }
    }
    
    setFormData({
      name: ad.name,
      description: ad.description,
      size: isCustomSize ? 'Custom' : ad.size,
      position: ad.position,
      availableIssues: ad.availableIssues,
      price: ad.price.toString(),
      status: ad.status,
      customWidth,
      customHeight,
      customUnit,
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
    // Prepare the data for submission
    const dataToSubmit = { ...formData };
    
    // If custom size is selected, use the custom dimensions
    if (formData.size === 'Custom' && formData.customWidth && formData.customHeight) {
      dataToSubmit.size = `${formData.customWidth}x${formData.customHeight} ${formData.customUnit}`;
    }
    
    // In a real app, this would save to the backend
    console.log('Saving ad:', dataToSubmit);
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
    <MainLayout title="Print Inventory Management" activeRoute="/inventory">
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
        
        <Tabs variant="line" colorScheme="blue" defaultIndex={1} onChange={(index) => {
            if (index === 0) window.location.href = '/inventory';
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
              <Text>Website inventory content is on the main inventory page</Text>
            </TabPanel>
            
            {/* Print Inventory Tab */}
            <TabPanel px={0}>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Print Ad Inventory</Heading>
                <Button 
                  leftIcon={<FiPlus />} 
                  colorScheme="blue"
                  onClick={handleAddAd}
                  bg="primary"
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                >
                  Add Print Ad
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
                      <Th>Available Issues</Th>
                      <Th isNumeric>Price</Th>
                      <Th>Status</Th>
                      <Th width="150px">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {printInventory.map((ad) => (
                      <Tr key={ad.id}>
                        <Td>
                          <Text fontWeight="medium">{ad.name}</Text>
                          <Text fontSize="sm" color={textSecondaryColor}>
                            {ad.description}
                          </Text>
                        </Td>
                        <Td>{ad.size}</Td>
                        <Td>{ad.position}</Td>
                        <Td>{ad.availableIssues}</Td>
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
      
      {/* Add/Edit Print Ad Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalMode === 'add' ? 'Add New Print Ad' : 'Edit Print Ad'}
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
                  {printAdSizeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              {/* Custom Size Fields */}
              {formData.size === 'Custom' && (
                <Box p={3} borderWidth="1px" borderRadius="md" bg="gray.50" mt={2}>
                  <Text fontWeight="medium" mb={3}>Custom Size Dimensions</Text>
                  <SimpleGrid columns={3} spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Width</FormLabel>
                      <NumberInput
                        min={0.1}
                        step={0.1}
                        precision={2}
                        value={formData.customWidth}
                        onChange={(value) => {
                          setFormData({
                            ...formData,
                            customWidth: value
                          });
                        }}
                      >
                        <NumberInputField placeholder="Width" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>Height</FormLabel>
                      <NumberInput
                        min={0.1}
                        step={0.1}
                        precision={2}
                        value={formData.customHeight}
                        onChange={(value) => {
                          setFormData({
                            ...formData,
                            customHeight: value
                          });
                        }}
                      >
                        <NumberInputField placeholder="Height" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        name="customUnit"
                        value={formData.customUnit}
                        onChange={handleInputChange}
                      >
                        <option value="inches">inches</option>
                        <option value="cm">cm</option>
                        <option value="mm">mm</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>
                </Box>
              )}
              
              <FormControl>
                <FormLabel>Position</FormLabel>
                <Select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Select position"
                >
                  {printAdPositionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Available Issues</FormLabel>
                <Input
                  name="availableIssues"
                  value={formData.availableIssues}
                  onChange={handleInputChange}
                  placeholder="e.g., All issues, Monthly only, etc."
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
              
              <Box>
                <FormLabel>Visual Preview Templates</FormLabel>
                <Text fontSize="sm" color={textSecondaryColor} mb={3}>
                  Select a template to visualize how this ad will appear in your publication
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  {printAdPreviewTemplates.map(template => (
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
          <ModalHeader>Print Ad Preview: {previewAd?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {previewAd && (
              <Box>
                <Text mb={4}>
                  This is how your ad will appear in your print publication. The highlighted area represents the ad placement.
                </Text>
                
                <Box
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  position="relative"
                >
                  {/* Print publication mockup with highlighted ad slot */}
                  <Box position="relative">
                    {/* Magazine/Newspaper mockup */}
                    <Box
                      bg="gray.50"
                      p={4}
                      borderRadius="md"
                      position="relative"
                      minH="600px"
                      display="flex"
                      flexDirection="column"
                    >
                      {/* Publication header */}
                      <Flex justify="center" align="center" mb={4}>
                        <Heading size="md" textAlign="center">PUBLICATION MOCKUP</Heading>
                      </Flex>
                      
                      {/* Content area with ad placement */}
                      <Flex flex="1" position="relative">
                        {/* Full Page Back Cover */}
                        {previewAd.position === 'Back Cover' && previewAd.size === 'Full Page' && (
                          <Box
                            position="absolute"
                            top="0"
                            right="0"
                            bottom="0"
                            width="100%"
                            bg="yellow.100"
                            p={4}
                            border="2px dashed"
                            borderColor="yellow.500"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Text textAlign="center" fontWeight="bold" color="yellow.800" mb={2}>
                              BACK COVER AD PLACEMENT
                            </Text>
                            <Text textAlign="center" fontSize="sm" color="yellow.800" mb={4}>
                              {previewAd.size}
                            </Text>
                            <Image
                              src={previewAd.visualPreview}
                              alt="Ad Preview"
                              fallbackSrc="https://via.placeholder.com/400x600"
                              maxW="80%"
                              maxH="400px"
                              objectFit="contain"
                            />
                          </Box>
                        )}
                        
                        {/* Inside Front Cover */}
                        {previewAd.position === 'Inside Front Cover' && (
                          <Box
                            position="absolute"
                            top="0"
                            left="0"
                            bottom="0"
                            width={previewAd.size === 'Full Page' ? '100%' : '50%'}
                            bg="yellow.100"
                            p={4}
                            border="2px dashed"
                            borderColor="yellow.500"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Text textAlign="center" fontWeight="bold" color="yellow.800" mb={2}>
                              INSIDE FRONT COVER AD PLACEMENT
                            </Text>
                            <Text textAlign="center" fontSize="sm" color="yellow.800" mb={4}>
                              {previewAd.size}
                            </Text>
                            <Image
                              src={previewAd.visualPreview}
                              alt="Ad Preview"
                              fallbackSrc={`https://via.placeholder.com/${previewAd.size === 'Full Page' ? '400x600' : '200x300'}`}
                              maxW="80%"
                              maxH="400px"
                              objectFit="contain"
                            />
                          </Box>
                        )}
                        
                        {/* Run of Paper */}
                        {previewAd.position === 'Run of Paper' && (
                          <Box
                            position="absolute"
                            top={previewAd.size === 'Quarter Page' ? '50%' : '0'}
                            left={previewAd.size === 'Quarter Page' || previewAd.size === 'Half Page' ? '50%' : '0'}
                            transform={previewAd.size === 'Quarter Page' ? 'translate(-50%, -50%)' : previewAd.size === 'Half Page' ? 'translateX(-50%)' : 'none'}
                            width={previewAd.size === 'Full Page' ? '100%' : previewAd.size === 'Half Page' ? '50%' : '25%'}
                            height={previewAd.size === 'Full Page' ? '100%' : previewAd.size === 'Half Page' ? '100%' : '50%'}
                            bg="yellow.100"
                            p={4}
                            border="2px dashed"
                            borderColor="yellow.500"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Text textAlign="center" fontWeight="bold" color="yellow.800" mb={2}>
                              RUN OF PAPER AD PLACEMENT
                            </Text>
                            <Text textAlign="center" fontSize="sm" color="yellow.800" mb={4}>
                              {previewAd.size}
                            </Text>
                            <Image
                              src={previewAd.visualPreview}
                              alt="Ad Preview"
                              fallbackSrc={`https://via.placeholder.com/${previewAd.size === 'Quarter Page' ? '200x150' : previewAd.size === 'Half Page' ? '200x300' : '400x600'}`}
                              maxW="80%"
                              maxH={previewAd.size === 'Quarter Page' ? '120px' : '300px'}
                              objectFit="contain"
                            />
                          </Box>
                        )}
                        
                        {/* Center Spread */}
                        {previewAd.position === 'Center' && previewAd.size === 'Double Page' && (
                          <Box
                            position="absolute"
                            top="0"
                            left="0"
                            bottom="0"
                            width="100%"
                            bg="yellow.100"
                            p={4}
                            border="2px dashed"
                            borderColor="yellow.500"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Text textAlign="center" fontWeight="bold" color="yellow.800" mb={2}>
                              CENTER SPREAD AD PLACEMENT
                            </Text>
                            <Text textAlign="center" fontSize="sm" color="yellow.800" mb={4}>
                              {previewAd.size}
                            </Text>
                            <Image
                              src={previewAd.visualPreview}
                              alt="Ad Preview"
                              fallbackSrc="https://via.placeholder.com/800x400"
                              maxW="90%"
                              maxH="350px"
                              objectFit="contain"
                            />
                          </Box>
                        )}
                        
                        {/* Classified Ad */}
                        {previewAd.position === 'Classified Section' && (
                          <Box
                            position="absolute"
                            bottom="20px"
                            right="20px"
                            width="100px"
                            height="100px"
                            bg="yellow.100"
                            p={2}
                            border="2px dashed"
                            borderColor="yellow.500"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Text textAlign="center" fontWeight="bold" color="yellow.800" fontSize="xs" mb={1}>
                              CLASSIFIED AD
                            </Text>
                            <Text textAlign="center" fontSize="xs" color="yellow.800" mb={2}>
                              {previewAd.size}
                            </Text>
                            <Image
                              src={previewAd.visualPreview}
                              alt="Ad Preview"
                              fallbackSrc="https://via.placeholder.com/80x80"
                              maxW="80px"
                              maxH="80px"
                              objectFit="contain"
                            />
                          </Box>
                        )}
                        
                        {/* Default publication content */}
                        {!['Back Cover', 'Inside Front Cover', 'Center'].includes(previewAd.position) && previewAd.size !== 'Double Page' && (
                          <>
                            <Box flex="1" p={4} bg="white" m={2} borderRadius="sm">
                              <Heading size="sm" mb={3}>Publication Content</Heading>
                              <Text fontSize="sm" mb={2}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                              </Text>
                              <Text fontSize="sm">
                                Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                              </Text>
                            </Box>
                            <Box flex="1" p={4} bg="white" m={2} borderRadius="sm">
                              <Heading size="sm" mb={3}>More Content</Heading>
                              <Text fontSize="sm">
                                Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                              </Text>
                            </Box>
                          </>
                        )}
                      </Flex>
                      
                      {/* Publication footer */}
                      <Flex justify="center" align="center" mt={4}>
                        <Text fontSize="sm" color="gray.500">Page 1</Text>
                      </Flex>
                    </Box>
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
                      <Text fontWeight="medium">Available Issues:</Text>
                      <Text>{previewAd.availableIssues}</Text>
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

export default PrintInventoryPage;
