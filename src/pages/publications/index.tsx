import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
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
} from '@chakra-ui/react';
import { FiSearch, FiFilter, FiPlus, FiChevronDown, FiEdit, FiBarChart2, FiEye } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';
import Heading from '@/components/ui/Heading';
import Link from 'next/link';

// Sample publication data
const publications = [
  {
    id: 1,
    name: 'Keep Portland Weird',
    logo: 'https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?q=80&w=1000&auto=format&fit=crop',
    type: 'Alternative Weekly',
    description: 'Portland\'s iconic cultural magazine celebrating the city\'s unique character, local artists, and independent businesses.',
    categories: ['Culture', 'Arts', 'Local Business', 'Events'],
    status: 'Active',
    metrics: {
      reach: '250K',
      engagement: '8.2%',
      subscribers: '45K',
    },
    lastUpdated: '2025-04-15',
  },
  {
    id: 2,
    name: 'Portland Skyline',
    logo: 'https://source.unsplash.com/random/800x600/?portland,skyline',
    type: 'Magazine',
    description: 'The definitive guide to Portland living with stunning photography and in-depth coverage of urban development, nightlife, and culture.',
    categories: ['Lifestyle', 'Architecture', 'Nightlife', 'Arts'],
    status: 'Active',
    metrics: {
      reach: '180K',
      engagement: '6.5%',
      subscribers: '32K',
    },
    lastUpdated: '2025-04-12',
  },
  {
    id: 3,
    name: 'Bridge City Chronicle',
    logo: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?q=80&w=1000&auto=format&fit=crop',
    type: 'Newspaper',
    description: 'Award-winning journalism covering Portland\'s iconic bridges, infrastructure, and the communities they connect.',
    categories: ['News', 'Infrastructure', 'Community', 'History'],
    status: 'Active',
    metrics: {
      reach: '200K',
      engagement: '7.8%',
      subscribers: '38K',
    },
    lastUpdated: '2025-04-10',
  },
  {
    id: 4,
    name: 'Portland Business Review',
    logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop',
    type: 'Business Journal',
    description: 'Leading source for business news, market analysis, and economic trends in the greater Portland metropolitan area.',
    categories: ['Business', 'Finance', 'Real Estate', 'Technology'],
    status: 'Active',
    metrics: {
      reach: '120K',
      engagement: '5.2%',
      subscribers: '28K',
    },
    lastUpdated: '2025-04-08',
  },
  {
    id: 5,
    name: 'The Weekly Gazette',
    logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop',
    type: 'Newspaper',
    description: 'Portland\'s trusted source for local news, featuring in-depth reporting on community events, politics, and human interest stories.',
    categories: ['News', 'Politics', 'Community', 'Features'],
    status: 'Pending',
    metrics: {
      reach: '150K',
      engagement: '4.8%',
      subscribers: '30K',
    },
    lastUpdated: '2025-04-05',
  },
];

// Publication types for filtering
const publicationTypes = [
  'All Types',
  'Newspaper',
  'Magazine',
  'Alternative Weekly',
  'Business Journal',
  'Blog',
  'Newsletter',
];

// Categories for filtering
const allCategories = [
  'News',
  'Culture',
  'Food & Drink',
  'Music',
  'Lifestyle',
  'Travel',
  'Arts',
  'Business',
  'Finance',
  'Real Estate',
  'Technology',
  'Sports',
  'Community',
];

// Statuses for filtering
const statuses = [
  'All Statuses',
  'Active',
  'Pending',
  'Inactive',
];

const PublicationsPage = () => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  const tagBg = useColorModeValue('blue.50', 'blue.900');
  
  // Filter publications based on search and filters
  const filteredPublications = publications.filter(pub => {
    // Filter by search query
    const matchesSearch = pub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    const matchesType = selectedType === 'All Types' || pub.type === selectedType;
    
    // Filter by status
    const matchesStatus = selectedStatus === 'All Statuses' || pub.status === selectedStatus;
    
    // Filter by categories
    const matchesCategories = selectedCategories.length === 0 ||
                             selectedCategories.some(cat => pub.categories.includes(cat));
    
    return matchesSearch && matchesType && matchesStatus && matchesCategories;
  });
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All Types');
    setSelectedStatus('All Statuses');
    setSelectedCategories([]);
  };
  
  return (
    <MainLayout title="Publications" activeRoute="/publications">
      <VStack spacing={8} align="stretch">
        {/* Header with actions */}
        <Flex justify="space-between" align="center" wrap={{ base: 'wrap', md: 'nowrap' }} gap={4}>
          <Box>
            <Heading variant="h2" size="lg" mb={1}>Publications</Heading>
            <Text color={textSecondaryColor}>
              Manage your publications and view performance metrics
            </Text>
          </Box>
          
          <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            as={Link}
            href="/setup/publication"
            bg="primary"
            color="white"
            _hover={{ bg: 'blue.600' }}
          >
            Add Publication
          </Button>
        </Flex>
        
        {/* Filters */}
        <Box
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          borderColor={borderColor}
          bg={cardBg}
        >
          <VStack spacing={4} align="stretch">
            <Flex gap={4} wrap={{ base: 'wrap', md: 'nowrap' }}>
              {/* Search */}
              <InputGroup maxW={{ md: '320px' }} flex={{ md: 1 }} w={{ base: 'full' }}>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
              
              {/* Type filter */}
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                maxW={{ md: '180px' }}
                w={{ base: 'full' }}
              >
                {publicationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
              
              {/* Status filter */}
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                maxW={{ md: '180px' }}
                w={{ base: 'full' }}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
              
              {/* Categories filter */}
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  rightIcon={<FiChevronDown />}
                  variant="outline"
                  w={{ base: 'full', md: 'auto' }}
                >
                  <HStack>
                    <Icon as={FiFilter} />
                    <Text>Categories</Text>
                    {selectedCategories.length > 0 && (
                      <Badge colorScheme="blue" borderRadius="full">
                        {selectedCategories.length}
                      </Badge>
                    )}
                  </HStack>
                </MenuButton>
                <MenuList maxH="320px" overflowY="auto">
                  {allCategories.map(category => (
                    <MenuItem
                      key={category}
                      onClick={() => toggleCategory(category)}
                      bg={selectedCategories.includes(category) ? tagBg : undefined}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              
              {/* Clear filters */}
              {(searchQuery || selectedType !== 'All Types' || selectedStatus !== 'All Statuses' || selectedCategories.length > 0) && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  w={{ base: 'full', md: 'auto' }}
                >
                  Clear Filters
                </Button>
              )}
            </Flex>
            
            {/* Selected categories */}
            {selectedCategories.length > 0 && (
              <Flex wrap="wrap" gap={2} mt={2}>
                {selectedCategories.map(category => (
                  <Tag
                    key={category}
                    size="md"
                    borderRadius="full"
                    variant="subtle"
                    colorScheme="blue"
                    onClick={() => toggleCategory(category)}
                    cursor="pointer"
                  >
                    {category}
                  </Tag>
                ))}
              </Flex>
            )}
          </VStack>
        </Box>
        
        {/* Publications grid */}
        {filteredPublications.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredPublications.map(publication => (
              <Box
                key={publication.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor={borderColor}
                overflow="hidden"
                bg={cardBg}
                transition="all 0.2s"
                _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
              >
                <Box position="relative">
                  {/* Status badge */}
                  <Badge
                    position="absolute"
                    top={3}
                    right={3}
                    colorScheme={publication.status === 'Active' ? 'green' : publication.status === 'Pending' ? 'orange' : 'red'}
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    {publication.status}
                  </Badge>
                  
                  {/* Publication logo */}
                  <Flex
                    h="180px"
                    bg={useColorModeValue('gray.50', 'gray.900')}
                    align="center"
                    justify="center"
                    p={0}
                    overflow="hidden"
                    position="relative"
                  >
                    {publication.id === 2 ? (
                      <Box 
                        as="div"
                        w="100%"
                        h="100%"
                        bgImage="url('https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
                        bgSize="cover"
                        bgPosition="center"
                      />
                    ) : (
                      <Image
                        src={publication.logo}
                        alt={publication.name}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        fallbackSrc={`https://source.unsplash.com/random/400x300/?portland,${publication.type.toLowerCase()}`}
                      />
                    )}
                  </Flex>
                </Box>
                
                <Box p={5}>
                  <Heading size="md" mb={2} noOfLines={1}>{publication.name}</Heading>
                  <Text fontSize="sm" color={textSecondaryColor} mb={3} noOfLines={2}>
                    {publication.description}
                  </Text>
                  
                  {/* Publication type */}
                  <HStack mb={4}>
                    <Tag size="sm" colorScheme="purple">{publication.type}</Tag>
                    <Text fontSize="xs" color={textSecondaryColor}>
                      Updated {publication.lastUpdated}
                    </Text>
                  </HStack>
                  
                  {/* Categories */}
                  <Box mb={4}>
                    <Flex wrap="wrap" gap={2}>
                      {publication.categories.slice(0, 3).map(category => (
                        <Tag
                          key={category}
                          size="sm"
                          borderRadius="full"
                          variant="subtle"
                          bg={tagBg}
                        >
                          {category}
                        </Tag>
                      ))}
                      {publication.categories.length > 3 && (
                        <Tag
                          size="sm"
                          borderRadius="full"
                          variant="subtle"
                          bg={tagBg}
                        >
                          +{publication.categories.length - 3} more
                        </Tag>
                      )}
                    </Flex>
                  </Box>
                  
                  {/* Metrics */}
                  <SimpleGrid columns={3} spacing={2} mb={4}>
                    <Box>
                      <Text fontSize="xs" color={textSecondaryColor}>Reach</Text>
                      <Text fontWeight="bold">{publication.metrics.reach}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color={textSecondaryColor}>Engagement</Text>
                      <Text fontWeight="bold">{publication.metrics.engagement}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color={textSecondaryColor}>Subscribers</Text>
                      <Text fontWeight="bold">{publication.metrics.subscribers}</Text>
                    </Box>
                  </SimpleGrid>
                  
                  {/* Actions */}
                  <Flex justify="space-between" mt={4}>
                    <Button
                      leftIcon={<FiEdit />}
                      size="sm"
                      variant="ghost"
                      as={Link}
                      href="/setup/publication"
                    >
                      Edit
                    </Button>
                    <Button
                      leftIcon={<FiBarChart2 />}
                      size="sm"
                      variant="ghost"
                      as={Link}
                      href="/analytics"
                    >
                      Analytics
                    </Button>
                    <Button
                      leftIcon={<FiEye />}
                      size="sm"
                      variant="ghost"
                      as={Link}
                      href={`/publications/${publication.id}`}
                    >
                      View
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Box
            p={10}
            borderWidth="1px"
            borderRadius="lg"
            borderColor={borderColor}
            bg={cardBg}
            textAlign="center"
          >
            <Heading size="md" mb={3}>No publications found</Heading>
            <Text color={textSecondaryColor} mb={6}>
              Try adjusting your filters or create a new publication.
            </Text>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              as={Link}
              href="/setup"
              bg="primary"
              color="white"
              _hover={{ bg: 'blue.600' }}
            >
              Add Publication
            </Button>
          </Box>
        )}
      </VStack>
    </MainLayout>
  );
};

export default PublicationsPage;
