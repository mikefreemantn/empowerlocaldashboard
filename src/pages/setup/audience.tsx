import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputLeftElement,
  HStack,
  Icon,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { FiGlobe, FiMail, FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin } from 'react-icons/fi';
import SetupLayout from '@/components/layout/SetupLayout';
import { useRouter } from 'next/router';

// Social platforms
const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', icon: FiFacebook },
  { id: 'twitter', name: 'Twitter', icon: FiTwitter },
  { id: 'instagram', name: 'Instagram', icon: FiInstagram },
  { id: 'youtube', name: 'YouTube', icon: FiYoutube },
  { id: 'linkedin', name: 'LinkedIn', icon: FiLinkedin },
];

// Newsletter frequencies
const newsletterFrequencies = [
  'Daily',
  'Weekly',
  'Bi-weekly',
  'Monthly',
  'Quarterly',
];

const AudienceInfoSetup: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Form state
  const [socialData, setSocialData] = useState<Record<string, { url: string, followers: string }>>({
    facebook: { url: '', followers: '' },
    twitter: { url: '', followers: '' },
    instagram: { url: '', followers: '' },
    youtube: { url: '', followers: '' },
    linkedin: { url: '', followers: '' },
  });
  
  const [newsletterData, setNewsletterData] = useState({
    name: '',
    description: '',
    frequency: '',
    subscribers: '',
    sampleUrl: '',
  });
  
  const [webData, setWebData] = useState({
    monthlyVisitors: '',
    averageTimeOnSite: '',
    bounceRate: '',
    topCountries: '',
  });
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({
    social: {},
    newsletter: {},
    web: {},
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle social media input changes
  const handleSocialChange = (platform: string, field: 'url' | 'followers', value: string) => {
    setSocialData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
    
    // Clear error when field is edited
    if (errors.social?.[`${platform}_${field}`]) {
      setErrors(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [`${platform}_${field}`]: ''
        }
      }));
    }
  };
  
  // Handle newsletter input changes
  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewsletterData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors.newsletter?.[name]) {
      setErrors(prev => ({
        ...prev,
        newsletter: {
          ...prev.newsletter,
          [name]: ''
        }
      }));
    }
  };
  
  // Handle web analytics input changes
  const handleWebChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWebData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors.web?.[name]) {
      setErrors(prev => ({
        ...prev,
        web: {
          ...prev.web,
          [name]: ''
        }
      }));
    }
  };
  
  // Simplified validation for demo purposes
  const validateForm = () => {
    // No validation for demo
    return true;
  };
  
  // Check if any data has been entered
  const hasEnteredData = () => {
    const hasSocialData = Object.values(socialData).some(data => data.url || data.followers);
    const hasNewsletterData = Object.values(newsletterData).some(value => value);
    const hasWebData = Object.values(webData).some(value => value);
    
    return hasSocialData || hasNewsletterData || hasWebData;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        // Save to local storage for demo purposes
        localStorage.setItem('audienceInfoSetup', JSON.stringify({
          social: socialData,
          newsletter: newsletterData,
          web: webData,
        }));
        
        setIsSubmitting(false);
        toast({
          title: 'Audience information saved',
          description: 'Your audience information has been saved successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Navigate to dashboard
        router.push('/');
      }, 1500);
    }
  };
  
  return (
    <SetupLayout currentStep="audience">
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="md" mb={2}>Audience Information</Heading>
          <Text color="gray.500">
            Add information about your audience across different platforms. This helps advertisers understand your reach.
          </Text>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={8} align="stretch">
            <Tabs variant="enclosed" colorScheme="blue">
              <TabList>
                <Tab>Social Media</Tab>
                <Tab>Newsletter</Tab>
                <Tab>Web Analytics</Tab>
              </TabList>
              
              <TabPanels>
                {/* Social Media Panel */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    {socialPlatforms.map(platform => (
                      <Box key={platform.id} p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
                        <Heading size="sm" mb={4}>
                          <HStack>
                            <Icon as={platform.icon} />
                            <Text>{platform.name}</Text>
                          </HStack>
                        </Heading>
                        
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                          <FormControl isInvalid={!!errors.social?.[`${platform.id}_url`]}>
                            <FormLabel>Profile URL</FormLabel>
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <FiGlobe color="gray.300" />
                              </InputLeftElement>
                              <Input
                                value={socialData[platform.id].url}
                                onChange={(e) => handleSocialChange(platform.id, 'url', e.target.value)}
                                placeholder={`https://${platform.id}.com/youraccount`}
                              />
                            </InputGroup>
                            <FormErrorMessage>{errors.social?.[`${platform.id}_url`]}</FormErrorMessage>
                          </FormControl>
                          
                          <FormControl isInvalid={!!errors.social?.[`${platform.id}_followers`]}>
                            <FormLabel>Followers/Subscribers</FormLabel>
                            <Input
                              value={socialData[platform.id].followers}
                              onChange={(e) => handleSocialChange(platform.id, 'followers', e.target.value)}
                              placeholder="e.g. 10000"
                            />
                            <FormErrorMessage>{errors.social?.[`${platform.id}_followers`]}</FormErrorMessage>
                          </FormControl>
                        </SimpleGrid>
                      </Box>
                    ))}
                  </VStack>
                </TabPanel>
                
                {/* Newsletter Panel */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Box p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
                      <Heading size="sm" mb={4}>
                        <HStack>
                          <Icon as={FiMail} />
                          <Text>Newsletter Information</Text>
                        </HStack>
                      </Heading>
                      
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isInvalid={!!errors.newsletter?.name}>
                          <FormLabel>Newsletter Name</FormLabel>
                          <Input
                            name="name"
                            value={newsletterData.name}
                            onChange={handleNewsletterChange}
                            placeholder="e.g. Weekly Digest"
                          />
                          <FormErrorMessage>{errors.newsletter?.name}</FormErrorMessage>
                        </FormControl>
                        
                        <FormControl isInvalid={!!errors.newsletter?.frequency}>
                          <FormLabel>Frequency</FormLabel>
                          <Select
                            name="frequency"
                            value={newsletterData.frequency}
                            onChange={handleNewsletterChange}
                            placeholder="Select frequency"
                          >
                            {newsletterFrequencies.map(frequency => (
                              <option key={frequency} value={frequency}>{frequency}</option>
                            ))}
                          </Select>
                          <FormErrorMessage>{errors.newsletter?.frequency}</FormErrorMessage>
                        </FormControl>
                      </SimpleGrid>
                      
                      <FormControl mt={4} isInvalid={!!errors.newsletter?.description}>
                        <FormLabel>Description</FormLabel>
                        <Input
                          name="description"
                          value={newsletterData.description}
                          onChange={handleNewsletterChange}
                          placeholder="Brief description of your newsletter"
                        />
                        <FormErrorMessage>{errors.newsletter?.description}</FormErrorMessage>
                      </FormControl>
                      
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
                        <FormControl isInvalid={!!errors.newsletter?.subscribers}>
                          <FormLabel>Subscribers</FormLabel>
                          <Input
                            name="subscribers"
                            value={newsletterData.subscribers}
                            onChange={handleNewsletterChange}
                            placeholder="e.g. 5000"
                          />
                          <FormErrorMessage>{errors.newsletter?.subscribers}</FormErrorMessage>
                        </FormControl>
                        
                        <FormControl isInvalid={!!errors.newsletter?.sampleUrl}>
                          <FormLabel>Sample Newsletter URL</FormLabel>
                          <Input
                            name="sampleUrl"
                            value={newsletterData.sampleUrl}
                            onChange={handleNewsletterChange}
                            placeholder="https://example.com/newsletter-sample"
                          />
                          <FormErrorMessage>{errors.newsletter?.sampleUrl}</FormErrorMessage>
                        </FormControl>
                      </SimpleGrid>
                    </Box>
                  </VStack>
                </TabPanel>
                
                {/* Web Analytics Panel */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Box p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
                      <Heading size="sm" mb={4}>
                        <HStack>
                          <Icon as={FiGlobe} />
                          <Text>Website Analytics</Text>
                        </HStack>
                      </Heading>
                      
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isInvalid={!!errors.web?.monthlyVisitors}>
                          <FormLabel>Monthly Unique Visitors</FormLabel>
                          <Input
                            name="monthlyVisitors"
                            value={webData.monthlyVisitors}
                            onChange={handleWebChange}
                            placeholder="e.g. 50000"
                          />
                          <FormErrorMessage>{errors.web?.monthlyVisitors}</FormErrorMessage>
                        </FormControl>
                        
                        <FormControl isInvalid={!!errors.web?.averageTimeOnSite}>
                          <FormLabel>Average Time on Site (minutes)</FormLabel>
                          <Input
                            name="averageTimeOnSite"
                            value={webData.averageTimeOnSite}
                            onChange={handleWebChange}
                            placeholder="e.g. 3.5"
                          />
                          <FormErrorMessage>{errors.web?.averageTimeOnSite}</FormErrorMessage>
                        </FormControl>
                      </SimpleGrid>
                      
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
                        <FormControl isInvalid={!!errors.web?.bounceRate}>
                          <FormLabel>Bounce Rate (%)</FormLabel>
                          <Input
                            name="bounceRate"
                            value={webData.bounceRate}
                            onChange={handleWebChange}
                            placeholder="e.g. 45"
                          />
                          <FormErrorMessage>{errors.web?.bounceRate}</FormErrorMessage>
                        </FormControl>
                        
                        <FormControl isInvalid={!!errors.web?.topCountries}>
                          <FormLabel>Top Countries/Regions</FormLabel>
                          <Input
                            name="topCountries"
                            value={webData.topCountries}
                            onChange={handleWebChange}
                            placeholder="e.g. USA, Canada, UK"
                          />
                          <FormErrorMessage>{errors.web?.topCountries}</FormErrorMessage>
                        </FormControl>
                      </SimpleGrid>
                    </Box>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
            
            <Divider />
            
            <Box pt={4}>
              <HStack spacing={4} justify="flex-end">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push('/')}
                  borderColor="primary"
                  color="primary"
                  _hover={{ bg: 'blue.50' }}
                >
                  Skip for Now
                </Button>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  isLoading={isSubmitting}
                  loadingText="Saving"
                  bg="primary"
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                >
                  Complete Setup
                </Button>
              </HStack>
            </Box>
          </VStack>
        </form>
      </VStack>
    </SetupLayout>
  );
};

export default AudienceInfoSetup;
