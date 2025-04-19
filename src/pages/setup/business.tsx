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
  InputGroup,
  InputLeftElement,
  Divider,
} from '@chakra-ui/react';
import Heading from '@/components/ui/Heading';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase } from 'react-icons/fi';
import SetupLayout from '@/components/layout/SetupLayout';
import { useRouter } from 'next/router';

const BusinessSetup: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    contactName: '',
    contactTitle: '',
  });
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        localStorage.setItem('businessSetup', JSON.stringify(formData));
        
        setIsSubmitting(false);
        toast({
          title: 'Business information saved',
          description: 'Your company profile details have been saved successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Navigate to next step
        router.push('/setup/publication');
      }, 1500);
    }
  };
  
  return (
    <SetupLayout currentStep="business">
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading variant="h2" mb={2}>Company Profile</Heading>
          <Text color="gray.500">
            Enter your company information to get started. This information will be used for your account and billing.
          </Text>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading variant="h3" mb={4}>Company Information</Heading>
              
              <FormControl isRequired isInvalid={!!errors.companyName} mb={4}>
                <FormLabel>Company Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiBriefcase color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.companyName}</FormErrorMessage>
              </FormControl>
              
              <FormControl isRequired isInvalid={!!errors.address} mb={4}>
                <FormLabel>Street Address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiMapPin color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter street address"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              </FormControl>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
                <FormControl isRequired isInvalid={!!errors.city}>
                  <FormLabel>City</FormLabel>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                  <FormErrorMessage>{errors.city}</FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={!!errors.state}>
                  <FormLabel>State</FormLabel>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                  <FormErrorMessage>{errors.state}</FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={!!errors.zipCode}>
                  <FormLabel>ZIP Code</FormLabel>
                  <Input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="ZIP Code"
                  />
                  <FormErrorMessage>{errors.zipCode}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired isInvalid={!!errors.phone}>
                  <FormLabel>Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FiPhone color="gray.300" />
                    </InputLeftElement>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel>Business Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FiMail color="gray.300" />
                    </InputLeftElement>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="business@example.com"
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
            </Box>
            
            <Divider />
            
            <Box>
              <Heading variant="h3" mb={4}>Primary Contact</Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired isInvalid={!!errors.contactName}>
                  <FormLabel>Contact Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FiUser color="gray.300" />
                    </InputLeftElement>
                    <Input
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Full name"
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.contactName}</FormErrorMessage>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Job Title</FormLabel>
                  <Input
                    name="contactTitle"
                    value={formData.contactTitle}
                    onChange={handleChange}
                    placeholder="Job title"
                  />
                </FormControl>
              </SimpleGrid>
            </Box>
            
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
                Continue to Publication Profile
              </Button>
            </Box>
          </VStack>
        </form>
      </VStack>
    </SetupLayout>
  );
};

export default BusinessSetup;
