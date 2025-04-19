import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  SimpleGrid,
  Tag,
  Text,
  useColorModeValue,
  VStack,
  Image,
  Badge,
  Heading as ChakraHeading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { FiSearch, FiFilter, FiPlus, FiChevronDown, FiEdit, FiBarChart2, FiEye, FiTrash2, FiStar } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';
import Heading from '@/components/ui/Heading';
import Link from 'next/link';

// Sample company data
const companies = [
  {
    id: 1,
    name: 'Portland Media Group',
    logo: 'https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?q=80&w=1000&auto=format&fit=crop',
    description: 'A leading media company in Portland, specializing in print and digital publications.',
    publicationCount: 3,
    teamCount: 24,
    status: 'Active',
    lastUpdated: '2025-04-15',
    publications: [
      { id: 101, name: 'Willamette Week', type: 'Newspaper', status: 'Active' },
      { id: 102, name: 'Portland Monthly', type: 'Magazine', status: 'Active' },
      { id: 103, name: 'PDX Eater', type: 'Blog', status: 'Active' },
    ]
  },
  {
    id: 2,
    name: 'Cascade Publishing',
    logo: 'https://source.unsplash.com/random/800x600/?portland,city',
    description: 'Cascade Publishing produces high-quality content for the Pacific Northwest region.',
    publicationCount: 4,
    teamCount: 32,
    status: 'Active',
    lastUpdated: '2025-04-10',
    publications: [
      { id: 201, name: 'The Oregonian', type: 'Newspaper', status: 'Active' },
      { id: 202, name: 'Portland Business Journal', type: 'Magazine', status: 'Active' },
      { id: 203, name: 'Rose City Review', type: 'Magazine', status: 'Active' },
      { id: 204, name: 'PDX Tech Weekly', type: 'Newsletter', status: 'Active' },
    ]
  },
  {
    id: 3,
    name: 'Bridge City Media',
    logo: 'https://source.unsplash.com/random/800x600/?portland,bridge',
    description: 'Bridge City Media focuses on alternative and arts publications in Portland.',
    publicationCount: 3,
    teamCount: 18,
    status: 'Active',
    lastUpdated: '2025-04-05',
    publications: [
      { id: 301, name: 'Portland Mercury', type: 'Alternative Weekly', status: 'Active' },
      { id: 302, name: 'PDX Arts', type: 'Magazine', status: 'Active' },
      { id: 303, name: 'Bridgetown Beat', type: 'Blog', status: 'Active' },
    ]
  },
  {
    id: 4,
    name: 'Rose City Digital',
    logo: 'https://source.unsplash.com/random/800x600/?portland,rose',
    description: 'Rose City Digital specializes in online publications and digital content.',
    publicationCount: 2,
    teamCount: 15,
    status: 'Active',
    lastUpdated: '2025-04-01',
    publications: [
      { id: 401, name: 'PDX Digital Times', type: 'Online Publication', status: 'Active' },
      { id: 402, name: 'Silicon Forest Report', type: 'Newsletter', status: 'Active' },
    ]
  },
];

// Sample custom views
const customViews = [
  {
    id: 1,
    name: 'All Companies',
    isDefault: true,
    companyIds: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: 'Print Media',
    isDefault: false,
    companyIds: [1, 2],
  },
  {
    id: 3,
    name: 'Digital Media',
    isDefault: false,
    companyIds: [3, 4],
  },
];

const CompaniesPage = () => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedView, setSelectedView] = useState(customViews.find(view => view.isDefault) || customViews[0]);
  
  // State for company detail modal
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  
  // State for view management
  const { isOpen: isViewModalOpen, onOpen: onViewModalOpen, onClose: onViewModalClose } = useDisclosure();
  const [newViewName, setNewViewName] = useState('');
  const [selectedCompaniesForView, setSelectedCompaniesForView] = useState<number[]>([]);
  const [isEditingView, setIsEditingView] = useState(false);
  const [editingViewId, setEditingViewId] = useState<number | null>(null);
  
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  const tagBg = useColorModeValue('blue.50', 'blue.900');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const starColor = useColorModeValue('yellow.500', 'yellow.300');
  
  // Filter companies based on search, status, and selected view
  const filteredCompanies = companies.filter(company => {
    // Filter by search query
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = selectedStatus === 'All Statuses' || company.status === selectedStatus;
    
    // Filter by selected view
    const matchesView = selectedView.companyIds.includes(company.id);
    
    return matchesSearch && matchesStatus && matchesView;
  });
  
  // Handle opening company detail modal
  const handleViewCompany = (company: any) => {
    setSelectedCompany(company);
    onDetailOpen();
  };
  
  // Open modal to create a new view
  const handleCreateView = () => {
    setIsEditingView(false);
    setNewViewName('');
    setSelectedCompaniesForView([]);
    onViewModalOpen();
  };
  
  // Open modal to edit an existing view
  const handleEditView = (view: any) => {
    setIsEditingView(true);
    setEditingViewId(view.id);
    setNewViewName(view.name);
    setSelectedCompaniesForView([...view.companyIds]);
    onViewModalOpen();
  };
  
  // Save a new or edited view
  const handleSaveView = () => {
    if (isEditingView && editingViewId) {
      // Update existing view (in a real app, this would update the backend)
      const viewIndex = customViews.findIndex(v => v.id === editingViewId);
      if (viewIndex !== -1) {
        customViews[viewIndex] = {
          ...customViews[viewIndex],
          name: newViewName,
          companyIds: selectedCompaniesForView,
        };
      }
    } else {
      // Create new view (in a real app, this would update the backend)
      const newView = {
        id: Math.max(...customViews.map(v => v.id)) + 1,
        name: newViewName,
        isDefault: false,
        companyIds: selectedCompaniesForView,
      };
      customViews.push(newView);
    }
    
    onViewModalClose();
  };
  
  // Set a view as default
  const handleSetDefaultView = (viewId: number) => {
    // In a real app, this would update the backend
    customViews.forEach(view => {
      view.isDefault = view.id === viewId;
    });
    setSelectedView(customViews.find(view => view.id === viewId) || customViews[0]);
  };
  
  return (
    <MainLayout title="Companies" activeRoute="/companies">
      <VStack spacing={8} align="stretch">
        {/* Header with actions */}
        <Flex justify="space-between" align="center" wrap={{ base: 'wrap', md: 'nowrap' }} gap={4}>
          <Box>
            <Heading variant="h2" size="lg" mb={1}>Companies</Heading>
            <Text color={textSecondaryColor}>
              Manage your media companies and their publications
            </Text>
          </Box>
          
          <HStack>
            <Button
              leftIcon={<FiPlus />}
              bgGradient="linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)"
              color="white"
              size="md"
              boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
              _hover={{ bgGradient: 'linear-gradient(135deg, #1E56D9 0%, #4338CA 100%)', boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)' }}
              borderRadius="xl"
            >
              Add Company
            </Button>
          </HStack>
        </Flex>
        
        {/* Filters and search */}
        <Flex 
          gap={4} 
          direction={{ base: 'column', md: 'row' }} 
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <InputGroup maxW={{ base: 'full', md: '320px' }}>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input 
              placeholder="Search companies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          
          <HStack spacing={4}>
            <Select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              minW="150px"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </Select>
            
            <Button
  variant="outline"
  px={4}
  py={2}
  height="40px"
  minW="200px"
  display="flex"
  alignItems="center"
  justifyContent="space-between"
  rightIcon={null}
>
  <Flex align="center" width="100%" justify="space-between">
    <Flex align="center">
      <Text mr={1}>View:</Text>
      <Text fontWeight="medium">All Companies</Text>
    </Flex>
    <Icon as={FiStar} ml={2} color={starColor} boxSize={4} />
  </Flex>
</Button>
          </HStack>
        </Flex>
        
        {/* Companies grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredCompanies.map(company => (
            <Card 
              key={company.id} 
              bg={cardBg} 
              borderWidth="1px" 
              borderColor={borderColor} 
              borderRadius="xl" 
              overflow="hidden"
              transition="all 0.2s"
              _hover={{ 
                transform: 'translateY(-4px)', 
                boxShadow: 'lg',
                borderColor: 'blue.200',
                bg: hoverBg
              }}
            >
              <CardHeader pb={0}>
                <Flex justify="space-between" align="start">
                  <HStack spacing={3} align="start">
                    <Image 
  src={company.logo}
  alt={company.name}
  boxSize="50px"
  objectFit="cover"
  borderRadius="md"
  fallbackSrc="https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?q=80&w=1000&auto=format&fit=crop"
  onError={(e) => {
    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?q=80&w=1000&auto=format&fit=crop';
  }}
/>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" fontSize="lg">{company.name}</Text>
                      <Badge colorScheme={company.status === 'Active' ? 'green' : 'gray'}>
                        {company.status}
                      </Badge>
                    </VStack>
                  </HStack>
                  <IconButton
                    aria-label="View company details"
                    icon={<FiEye />}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewCompany(company)}
                  />
                </Flex>
              </CardHeader>
              
              <CardBody>
                <Text noOfLines={2} color={textSecondaryColor} fontSize="sm" mb={4}>
                  {company.description}
                </Text>
                
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color={textSecondaryColor}>Publications</Text>
                    <Text fontWeight="bold">{company.publicationCount}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color={textSecondaryColor}>Team Members</Text>
                    <Text fontWeight="bold">{company.teamCount}</Text>
                  </Box>
                </SimpleGrid>
              </CardBody>
              
              <Divider />
              
              <CardFooter pt={2}>
                <HStack spacing={2} width="100%" justify="space-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    leftIcon={<FiEdit />}
                    flex={1}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    leftIcon={<FiBarChart2 />}
                    flex={1}
                  >
                    Analytics
                  </Button>
                </HStack>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
        
        {/* Company detail modal */}
        {selectedCompany && (
          <Modal isOpen={isDetailOpen} onClose={onDetailClose} size="xl">
            <ModalOverlay />
            <ModalContent bg={cardBg}>
              <ModalHeader>
                <Flex align="center" gap={3}>
                  <Image 
                    src={selectedCompany.logo} 
                    alt={selectedCompany.name}
                    boxSize="40px"
                    objectFit="cover"
                    borderRadius="md"
                    fallbackSrc="https://via.placeholder.com/40"
                  />
                  <Text>{selectedCompany.name}</Text>
                </Flex>
              </ModalHeader>
              <ModalCloseButton />
              
              <ModalBody>
                <Tabs variant="enclosed" colorScheme="blue">
                  <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Publications</Tab>
                    <Tab>Team</Tab>
                  </TabList>
                  
                  <TabPanels>
                    {/* Overview Tab */}
                    <TabPanel>
                      <VStack align="stretch" spacing={4}>
                        <Box>
                          <Text fontWeight="semibold" mb={1}>Description</Text>
                          <Text>{selectedCompany.description}</Text>
                        </Box>
                        
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                          <Box p={4} borderWidth="1px" borderRadius="md">
                            <Text fontSize="sm" color={textSecondaryColor}>Publications</Text>
                            <Text fontSize="xl" fontWeight="bold">{selectedCompany.publicationCount}</Text>
                          </Box>
                          <Box p={4} borderWidth="1px" borderRadius="md">
                            <Text fontSize="sm" color={textSecondaryColor}>Team Members</Text>
                            <Text fontSize="xl" fontWeight="bold">{selectedCompany.teamCount}</Text>
                          </Box>
                          <Box p={4} borderWidth="1px" borderRadius="md">
                            <Text fontSize="sm" color={textSecondaryColor}>Last Updated</Text>
                            <Text fontSize="xl" fontWeight="bold">{selectedCompany.lastUpdated}</Text>
                          </Box>
                        </SimpleGrid>
                      </VStack>
                    </TabPanel>
                    
                    {/* Publications Tab */}
                    <TabPanel>
                      <VStack align="stretch" spacing={4}>
                        {selectedCompany.publications.map((pub: any) => (
                          <Flex 
                            key={pub.id} 
                            justify="space-between" 
                            align="center" 
                            p={3}
                            borderWidth="1px"
                            borderRadius="md"
                            _hover={{ bg: hoverBg }}
                          >
                            <Box>
                              <Text fontWeight="semibold">{pub.name}</Text>
                              <Badge colorScheme="blue" variant="outline">{pub.type}</Badge>
                            </Box>
                            <HStack>
                              <Badge colorScheme={pub.status === 'Active' ? 'green' : 'gray'}>
                                {pub.status}
                              </Badge>
                              <IconButton
                                aria-label="View publication"
                                icon={<FiEye />}
                                variant="ghost"
                                size="sm"
                                as={Link}
                                href={`/publications?id=${pub.id}`}
                              />
                            </HStack>
                          </Flex>
                        ))}
                      </VStack>
                    </TabPanel>
                    
                    {/* Team Tab */}
                    <TabPanel>
                      <Text>Team members would be displayed here.</Text>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>
              
              <ModalFooter>
                <Button variant="outline" mr={3} onClick={onDetailClose}>
                  Close
                </Button>
                <Button 
                  bgGradient="linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)"
                  color="white"
                  _hover={{ bgGradient: 'linear-gradient(135deg, #1E56D9 0%, #4338CA 100%)' }}
                >
                  Edit Company
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        
        {/* View management modal */}
        <Modal isOpen={isViewModalOpen} onClose={onViewModalClose} size="md">
          <ModalOverlay />
          <ModalContent bg={cardBg}>
            <ModalHeader>
              {isEditingView ? 'Edit View' : 'Create New View'}
            </ModalHeader>
            <ModalCloseButton />
            
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>View Name</FormLabel>
                  <Input 
                    value={newViewName} 
                    onChange={(e) => setNewViewName(e.target.value)}
                    placeholder="Enter view name"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Select Companies</FormLabel>
                  <VStack align="stretch" spacing={2} maxH="300px" overflowY="auto" borderWidth="1px" borderRadius="md" p={2}>
                    {companies.map(company => (
                      <Flex 
                        key={company.id} 
                        justify="space-between" 
                        align="center" 
                        p={2}
                        borderRadius="md"
                        bg={selectedCompaniesForView.includes(company.id) ? activeBg : undefined}
                        _hover={{ bg: hoverBg }}
                        onClick={() => {
                          if (selectedCompaniesForView.includes(company.id)) {
                            setSelectedCompaniesForView(selectedCompaniesForView.filter(id => id !== company.id));
                          } else {
                            setSelectedCompaniesForView([...selectedCompaniesForView, company.id]);
                          }
                        }}
                        cursor="pointer"
                      >
                        <HStack>
                          <Image 
                            src={company.logo} 
                            alt={company.name}
                            boxSize="30px"
                            objectFit="cover"
                            borderRadius="md"
                            fallbackSrc="https://via.placeholder.com/30"
                          />
                          <Text>{company.name}</Text>
                        </HStack>
                        <Badge colorScheme={selectedCompaniesForView.includes(company.id) ? 'blue' : 'gray'}>
                          {selectedCompaniesForView.includes(company.id) ? 'Selected' : ''}
                        </Badge>
                      </Flex>
                    ))}
                  </VStack>
                </FormControl>
              </VStack>
            </ModalBody>
            
            <ModalFooter>
              <Button variant="outline" mr={3} onClick={onViewModalClose}>
                Cancel
              </Button>
              <Button 
                bgGradient="linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)"
                color="white"
                _hover={{ bgGradient: 'linear-gradient(135deg, #1E56D9 0%, #4338CA 100%)' }}
                onClick={handleSaveView}
                isDisabled={!newViewName || selectedCompaniesForView.length === 0}
              >
                {isEditingView ? 'Update View' : 'Save View'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </MainLayout>
  );
};

export default CompaniesPage;
