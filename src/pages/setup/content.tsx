import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  SimpleGrid,
  useToast,
  Checkbox,
  CheckboxGroup,
  Flex,
  Tag,
  TagLabel,
  useColorModeValue,
  Divider,
  Progress,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import SetupLayout from '@/components/layout/SetupLayout';
import { useRouter } from 'next/router';
import Heading from '@/components/ui/Heading';

// Sample content categories
const contentCategories = {
  'News & Politics': [
    'Local News',
    'National News',
    'International News',
    'Politics',
    'Government',
    'Law & Crime',
    'Education',
  ],
  'Arts & Entertainment': [
    'Music',
    'Film & TV',
    'Books & Literature',
    'Visual Arts',
    'Performing Arts',
    'Celebrity News',
    'Entertainment Industry',
  ],
  'Lifestyle': [
    'Food & Dining',
    'Travel',
    'Fashion & Style',
    'Home & Garden',
    'Wellness',
    'Relationships',
    'Parenting',
  ],
  'Business & Finance': [
    'Local Business',
    'Startups',
    'Economy',
    'Markets',
    'Real Estate',
    'Personal Finance',
    'Careers',
  ],
  'Technology': [
    'Consumer Tech',
    'Business Tech',
    'Science & Innovation',
    'Digital Culture',
    'Social Media',
    'Gaming',
    'Cybersecurity',
  ],
  'Sports': [
    'Local Sports',
    'Professional Sports',
    'College Sports',
    'Outdoor Recreation',
    'Fitness',
    'Motorsports',
    'Extreme Sports',
  ],
  'Opinion & Commentary': [
    'Editorials',
    'Columns',
    'Op-Eds',
    'Analysis',
    'Reviews',
    'Letters to the Editor',
  ],
};

// Audience demographics section removed

const ContentCategoriesSetup: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const tagBg = useColorModeValue('blue.50', 'blue.900');
  const accordionBg = useColorModeValue('gray.50', 'gray.700');
  
  // State for selected categories
  const [selectedCategories, setSelectedCategories] = useState<Record<string, string[]>>({});
  
  // Calculate total number of categories and selected categories
  const totalCategories = Object.values(contentCategories).flat().length;
  const totalSelectedCategories = Object.values(selectedCategories).flat().length;
  
  // Calculate completion percentage
  const completionPercentage = Math.min(
    100,
    Math.round(totalSelectedCategories > 0 ? 100 : 0)
  );
  
  // Handle category selection
  const handleCategoryChange = (category: string, values: string[]) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: values
    }));
  };
  
  // Simplified validation for demo purposes
  const isFormValid = () => {
    // No validation for demo
    return true;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least 3 main categories have subcategories selected
    const categoriesWithSelections = Object.entries(selectedCategories)
      .filter(([_, subcategories]) => subcategories.length > 0)
      .length;
    
    if (categoriesWithSelections >= 3) {
      // Save to local storage for demo purposes
      localStorage.setItem('contentSetup', JSON.stringify({
        categories: selectedCategories
      }));
      
      // Navigate to the next step
      router.push('/setup/audience');
    } else {
      toast({
        title: 'Incomplete Selection',
        description: 'Please select at least one subcategory from at least 3 main categories.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  return (
    <SetupLayout currentStep="content">
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading variant="h2" mb={2}>Content Categories</Heading>
          <Text>
            Select the categories and subcategories that best describe your content. This helps advertisers find your publication.
          </Text>
        </Box>
        
        <Box>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontWeight="medium">Completion</Text>
            <Text>{completionPercentage}%</Text>
          </Flex>
          <Progress value={completionPercentage} size="sm" colorScheme="blue" borderRadius="full" />
        </Box>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading variant="h3" mb={4}>Content Categories</Heading>
              <Text fontSize="sm" color="gray.500" mb={4}>
                Select at least one subcategory from at least 3 main categories that best represent your content.
              </Text>
              
              <Accordion allowMultiple defaultIndex={[0]} mb={6}>
                {Object.entries(contentCategories).map(([category, subcategories]) => (
                  <AccordionItem key={category} mb={2} border="1px solid" borderColor="gray.200" borderRadius="md" overflow="hidden">
                    <h2>
                      <AccordionButton bg={accordionBg} _expanded={{ bg: 'blue.50', color: 'blue.600' }}>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          {category}
                        </Box>
                        <Box mr={2}>
                          <Tag size="sm" colorScheme="blue" variant="subtle">
                            {selectedCategories[category]?.length || 0} selected
                          </Tag>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <CheckboxGroup
                        colorScheme="blue"
                        value={selectedCategories[category] || []}
                        onChange={(values) => handleCategoryChange(category, values as string[])}
                      >
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>
                          {subcategories.map(subcategory => (
                            <Checkbox key={subcategory} value={subcategory}>
                              {subcategory}
                            </Checkbox>
                          ))}
                        </SimpleGrid>
                      </CheckboxGroup>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <Box mb={4}>
                <Text fontWeight="medium" mb={2}>Selected Categories ({totalSelectedCategories})</Text>
                <Flex wrap="wrap" gap={2}>
                  {Object.entries(selectedCategories).flatMap(([category, subcategories]) =>
                    subcategories.map(subcategory => (
                      <Tag key={`${category}-${subcategory}`} size="md" borderRadius="full" bg={tagBg} mb={1}>
                        <TagLabel>{subcategory}</TagLabel>
                      </Tag>
                    ))
                  )}
                  {totalSelectedCategories === 0 && (
                    <Text fontSize="sm" color="gray.500">No categories selected yet</Text>
                  )}
                </Flex>
              </Box>
            </Box>
            
            {/* Audience Demographics section removed */}
            
            <Box pt={4}>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width={{ base: 'full', md: 'auto' }}
                float="right"
                bg="primary"
                color="white"
                _hover={{ bg: 'blue.600' }}
              >
                Continue to Audience Info
              </Button>
            </Box>
          </VStack>
        </form>
      </VStack>
    </SetupLayout>
  );
};

export default ContentCategoriesSetup;
