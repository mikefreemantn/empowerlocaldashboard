import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
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

// Sample audience demographics
const audienceDemographics = {
  'Age Groups': [
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65+',
  ],
  'Income Levels': [
    'Under $25,000',
    '$25,000 - $49,999',
    '$50,000 - $74,999',
    '$75,000 - $99,999',
    '$100,000 - $149,999',
    '$150,000+',
  ],
  'Education': [
    'High School or Less',
    'Some College',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Graduate Degree',
  ],
  'Geographic Focus': [
    'Hyperlocal',
    'City/Metro Area',
    'Regional',
    'State/Provincial',
    'National',
    'International',
  ],
};

const ContentCategoriesSetup: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const tagBg = useColorModeValue('blue.50', 'blue.900');
  const accordionBg = useColorModeValue('gray.50', 'gray.700');
  
  // State for selected categories and subcategories
  const [selectedCategories, setSelectedCategories] = useState<Record<string, string[]>>({});
  const [selectedDemographics, setSelectedDemographics] = useState<Record<string, string[]>>({});
  
  // Calculate total number of categories and selected categories
  const totalCategories = Object.values(contentCategories).flat().length;
  const totalSelectedCategories = Object.values(selectedCategories).flat().length;
  
  // Calculate total number of demographics and selected demographics
  const totalDemographics = Object.values(audienceDemographics).flat().length;
  const totalSelectedDemographics = Object.values(selectedDemographics).flat().length;
  
  // Calculate overall completion percentage
  const completionPercentage = Math.round(
    ((totalSelectedCategories + totalSelectedDemographics) / 
    (totalCategories + totalDemographics)) * 100
  );
  
  // Handle category selection
  const handleCategoryChange = (category: string, values: string[]) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: values
    }));
  };
  
  // Handle demographic selection
  const handleDemographicChange = (demographic: string, values: string[]) => {
    setSelectedDemographics(prev => ({
      ...prev,
      [demographic]: values
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
    
    if (isFormValid()) {
      // Simulate API call
      setTimeout(() => {
        // Save to local storage for demo purposes
        localStorage.setItem('contentCategoriesSetup', JSON.stringify({
          categories: selectedCategories,
          demographics: selectedDemographics
        }));
        
        toast({
          title: 'Content categories saved',
          description: 'Your content categories and audience demographics have been saved successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Navigate to next step
        router.push('/setup/audience');
      }, 1000);
    } else {
      toast({
        title: 'Please complete the form',
        description: 'Please select at least one subcategory from at least 3 main categories and at least one option from each demographic category.',
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
          <Heading size="md" mb={2}>Content Categories</Heading>
          <Text color="gray.500">
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
              <Heading size="sm" mb={4}>Content Categories</Heading>
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
            
            <Divider />
            
            <Box>
              <Heading size="sm" mb={4}>Audience Demographics</Heading>
              <Text fontSize="sm" color="gray.500" mb={4}>
                Select at least one option from each category that best describes your audience demographics.
              </Text>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {Object.entries(audienceDemographics).map(([demographic, options]) => (
                  <Box key={demographic} p={4} borderWidth="1px" borderRadius="md">
                    <Text fontWeight="medium" mb={3}>{demographic}</Text>
                    <CheckboxGroup
                      colorScheme="blue"
                      value={selectedDemographics[demographic] || []}
                      onChange={(values) => handleDemographicChange(demographic, values as string[])}
                    >
                      <VStack align="start" spacing={2}>
                        {options.map(option => (
                          <Checkbox key={option} value={option}>
                            {option}
                          </Checkbox>
                        ))}
                      </VStack>
                    </CheckboxGroup>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
            
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
