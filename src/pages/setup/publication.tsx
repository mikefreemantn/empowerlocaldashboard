import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  SimpleGrid,
  FormErrorMessage,
  useToast,
  Textarea,
  Select,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import SetupLayout from '@/components/layout/SetupLayout';
import { useRouter } from 'next/router';
import Heading from '@/components/ui/Heading';

// Sample publication types
const publicationTypes = [
  'Newspaper',
  'Magazine',
  'Blog',
  'Podcast',
  'Video Channel',
  'Newsletter',
  'Social Media',
  'Other'
];

// Sample languages
const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Portuguese',
  'Chinese',
  'Japanese',
  'Korean',
  'Russian',
  'Arabic',
  'Other'
];

const PublicationSetup: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const tagBg = useColorModeValue('blue.50', 'blue.900');
  
  // Form state
  const [formData, setFormData] = useState({
    publicationName: '',
    publicationType: '',
    description: '',
    foundedYear: new Date().getFullYear().toString(),
    website: '',
    primaryLanguage: 'English',
    otherLanguages: [] as string[],
    keywords: [] as string[],
  });
  
  // New keyword input state
  const [newKeyword, setNewKeyword] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle keyword addition
  const handleAddKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };
  
  // Handle keyword removal
  const handleRemoveKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };
  
  // Handle language addition
  const handleAddLanguage = () => {
    if (newLanguage && !formData.otherLanguages.includes(newLanguage)) {
      setFormData(prev => ({
        ...prev,
        otherLanguages: [...prev.otherLanguages, newLanguage]
      }));
      setNewLanguage('');
    }
  };
  
  // Handle language removal
  const handleRemoveLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      otherLanguages: prev.otherLanguages.filter(l => l !== language)
    }));
  };
  
  // Handle key press for adding keywords
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newKeyword.trim()) {
      e.preventDefault();
      handleAddKeyword();
    }
  };
  
  // Simplified validation for demo purposes
  const validateForm = () => {
    // No validation for demo
    return true;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        // Save to local storage for demo purposes
        localStorage.setItem('publicationSetup', JSON.stringify(formData));
        
        setIsSubmitting(false);
        toast({
          title: 'Publication profile saved',
          description: 'Your publication profile has been saved successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Navigate to next step
        router.push('/setup/visual');
      }, 1500);
    }
  };
  
  return (
    <SetupLayout currentStep="publication">
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading variant="h2" mb={2}>Publication Profile</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.300')}>
            Tell us about your publication. This information will be visible to advertisers and users.
          </Text>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired isInvalid={!!errors.publicationName}>
                <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Publication Name</FormLabel>
                <Input
                  name="publicationName"
                  value={formData.publicationName}
                  onChange={handleChange}
                  placeholder="Enter publication name"
                />
                <FormErrorMessage>{errors.publicationName}</FormErrorMessage>
              </FormControl>
              
              <FormControl isRequired isInvalid={!!errors.publicationType}>
                <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Publication Type</FormLabel>
                <Select
                  name="publicationType"
                  value={formData.publicationType}
                  onChange={handleChange}
                  placeholder="Select publication type"
                >
                  {publicationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.publicationType}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
            
            <FormControl isRequired isInvalid={!!errors.description}>
              <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Publication Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your publication, its mission, and audience"
                rows={4}
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired isInvalid={!!errors.website}>
                <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Website</FormLabel>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.example.com"
                />
                <FormErrorMessage>{errors.website}</FormErrorMessage>
              </FormControl>
              
              <FormControl isRequired isInvalid={!!errors.foundedYear}>
                <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Founded Year</FormLabel>
                <Input
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleChange}
                  placeholder="YYYY"
                  maxLength={4}
                />
                <FormErrorMessage>{errors.foundedYear}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired>
                <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Primary Language</FormLabel>
                <Select
                  name="primaryLanguage"
                  value={formData.primaryLanguage}
                  onChange={handleChange}
                >
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Additional Languages</FormLabel>
                <HStack mb={2}>
                  <Select
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Select language"
                  >
                    {languages
                      .filter(lang => lang !== formData.primaryLanguage && !formData.otherLanguages.includes(lang))
                      .map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                  </Select>
                  <Button onClick={handleAddLanguage} disabled={!newLanguage}>
                    Add
                  </Button>
                </HStack>
                <Box>
                  {formData.otherLanguages.map(language => (
                    <Tag
                      key={language}
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="blue"
                      m={1}
                    >
                      <TagLabel>{language}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveLanguage(language)} />
                    </Tag>
                  ))}
                </Box>
              </FormControl>
            </SimpleGrid>
            
            <FormControl isRequired isInvalid={!!errors.keywords}>
              <FormLabel>Keywords</FormLabel>
              <InputGroup>
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add keywords that describe your publication"
                  onKeyPress={handleKeyPress}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleAddKeyword}>
                    <FiPlus />
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.keywords}</FormErrorMessage>
              <Box mt={2}>
                {formData.keywords.map(keyword => (
                  <Tag
                    key={keyword}
                    size="md"
                    borderRadius="full"
                    variant="subtle"
                    bg={tagBg}
                    m={1}
                  >
                    <TagLabel>{keyword}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveKeyword(keyword)} />
                  </Tag>
                ))}
              </Box>
            </FormControl>
            
            <Box pt={4}>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width={{ base: 'full', md: 'auto' }}
                isLoading={isSubmitting}
                loadingText="Saving"
                float="right"
                bg="primary"
                color="white"
                _hover={{ bg: 'blue.600' }}
              >
                Continue to Visual Identity
              </Button>
            </Box>
          </VStack>
        </form>
      </VStack>
    </SetupLayout>
  );
};

export default PublicationSetup;
