import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  SimpleGrid,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Image,
  Icon,
  Center,
  useColorModeValue,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import { FiUpload, FiInfo, FiX, FiCheck } from 'react-icons/fi';
import SetupLayout from '@/components/layout/SetupLayout';
import { useRouter } from 'next/router';
import Heading from '@/components/ui/Heading';

const VisualIdentitySetup: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Form state
  const [formData, setFormData] = useState({
    primaryColor: '#2563EB',
    secondaryColor: '#4F46E5',
    accentColor: '#F43F5E',
  });
  
  // Image state
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [faviconImage, setFaviconImage] = useState<string | null>(null);
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle color input changes
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  // Handle file upload
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'Please upload a valid image file (JPEG, PNG, or SVG)'
      }));
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'Image size should be less than 2MB'
      }));
      return;
    }
    
    // Clear any previous errors
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Handle logo upload click
  const handleLogoUploadClick = () => {
    logoInputRef.current?.click();
  };
  
  // Handle header upload click
  const handleHeaderUploadClick = () => {
    headerInputRef.current?.click();
  };
  
  // Handle favicon upload click
  const handleFaviconUploadClick = () => {
    faviconInputRef.current?.click();
  };
  
  // Remove image
  const removeImage = (
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = '';
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
        localStorage.setItem('visualIdentitySetup', JSON.stringify({
          ...formData,
          logoImage,
          headerImage,
          faviconImage
        }));
        
        setIsSubmitting(false);
        toast({
          title: 'Visual identity saved',
          description: 'Your visual identity settings have been saved successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Navigate to next step
        router.push('/setup/content');
      }, 1500);
    }
  };
  
  return (
    <SetupLayout currentStep="visual">
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading variant="h2" mb={2}>Visual Identity</Heading>
          <Text color="gray.500">
            Upload your brand assets and set your color scheme to customize the appearance of your publication.
          </Text>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading variant="h3" mb={4}>Brand Assets</Heading>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                {/* Logo Upload */}
                <FormControl isRequired isInvalid={!!errors.logo}>
                  <FormLabel>
                    Logo
                    <Tooltip label="Your primary logo. Will be displayed in the header and other prominent areas. Recommended size: 200x60px, transparent background.">
                      <Icon as={FiInfo} ml={1} />
                    </Tooltip>
                  </FormLabel>
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={(e) => handleFileUpload(e, setLogoImage, 'logo')}
                    accept="image/png,image/jpeg,image/svg+xml"
                    style={{ display: 'none' }}
                  />
                  
                  {logoImage ? (
                    <Box
                      position="relative"
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={borderColor}
                      p={4}
                      bg={cardBg}
                    >
                      <Button
                        size="xs"
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme="red"
                        onClick={() => removeImage(setLogoImage, logoInputRef)}
                      >
                        <Icon as={FiX} />
                      </Button>
                      <Center h="100px">
                        <Image
                          src={logoImage}
                          alt="Logo preview"
                          maxH="100px"
                          objectFit="contain"
                        />
                      </Center>
                      <HStack mt={2} justify="center">
                        <Icon as={FiCheck} color="green.500" />
                        <Text fontSize="sm" color="green.500">Logo uploaded</Text>
                      </HStack>
                    </Box>
                  ) : (
                    <Button
                      onClick={handleLogoUploadClick}
                      variant="outline"
                      h="120px"
                      w="100%"
                      borderStyle="dashed"
                      borderWidth="2px"
                    >
                      <VStack spacing={2}>
                        <Icon as={FiUpload} boxSize={6} />
                        <Text>Upload Logo</Text>
                        <Text fontSize="xs" color="gray.500">PNG, JPG, or SVG (max 2MB)</Text>
                      </VStack>
                    </Button>
                  )}
                  <FormErrorMessage>{errors.logo}</FormErrorMessage>
                </FormControl>
                
                {/* Header Image Upload */}
                <FormControl>
                  <FormLabel>
                    Header Image
                    <Tooltip label="Optional banner image for your publication. Will be displayed at the top of your profile. Recommended size: 1200x300px.">
                      <Icon as={FiInfo} ml={1} />
                    </Tooltip>
                  </FormLabel>
                  <input
                    type="file"
                    ref={headerInputRef}
                    onChange={(e) => handleFileUpload(e, setHeaderImage, 'header')}
                    accept="image/png,image/jpeg"
                    style={{ display: 'none' }}
                  />
                  
                  {headerImage ? (
                    <Box
                      position="relative"
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={borderColor}
                      p={4}
                      bg={cardBg}
                    >
                      <Button
                        size="xs"
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme="red"
                        onClick={() => removeImage(setHeaderImage, headerInputRef)}
                      >
                        <Icon as={FiX} />
                      </Button>
                      <Center h="100px">
                        <Image
                          src={headerImage}
                          alt="Header preview"
                          maxH="100px"
                          objectFit="cover"
                          w="100%"
                        />
                      </Center>
                      <HStack mt={2} justify="center">
                        <Icon as={FiCheck} color="green.500" />
                        <Text fontSize="sm" color="green.500">Header uploaded</Text>
                      </HStack>
                    </Box>
                  ) : (
                    <Button
                      onClick={handleHeaderUploadClick}
                      variant="outline"
                      h="120px"
                      w="100%"
                      borderStyle="dashed"
                      borderWidth="2px"
                    >
                      <VStack spacing={2}>
                        <Icon as={FiUpload} boxSize={6} />
                        <Text>Upload Header</Text>
                        <Text fontSize="xs" color="gray.500">PNG or JPG (max 2MB)</Text>
                      </VStack>
                    </Button>
                  )}
                  <FormErrorMessage>{errors.header}</FormErrorMessage>
                </FormControl>
                
                {/* Favicon Upload */}
                <FormControl>
                  <FormLabel>
                    Favicon
                    <Tooltip label="Optional icon for browser tabs. Will be displayed in browser tabs and bookmarks. Recommended size: 32x32px.">
                      <Icon as={FiInfo} ml={1} />
                    </Tooltip>
                  </FormLabel>
                  <input
                    type="file"
                    ref={faviconInputRef}
                    onChange={(e) => handleFileUpload(e, setFaviconImage, 'favicon')}
                    accept="image/png,image/x-icon,image/svg+xml"
                    style={{ display: 'none' }}
                  />
                  
                  {faviconImage ? (
                    <Box
                      position="relative"
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={borderColor}
                      p={4}
                      bg={cardBg}
                    >
                      <Button
                        size="xs"
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme="red"
                        onClick={() => removeImage(setFaviconImage, faviconInputRef)}
                      >
                        <Icon as={FiX} />
                      </Button>
                      <Center h="100px">
                        <Image
                          src={faviconImage}
                          alt="Favicon preview"
                          maxH="60px"
                          objectFit="contain"
                        />
                      </Center>
                      <HStack mt={2} justify="center">
                        <Icon as={FiCheck} color="green.500" />
                        <Text fontSize="sm" color="green.500">Favicon uploaded</Text>
                      </HStack>
                    </Box>
                  ) : (
                    <Button
                      onClick={handleFaviconUploadClick}
                      variant="outline"
                      h="120px"
                      w="100%"
                      borderStyle="dashed"
                      borderWidth="2px"
                    >
                      <VStack spacing={2}>
                        <Icon as={FiUpload} boxSize={6} />
                        <Text>Upload Favicon</Text>
                        <Text fontSize="xs" color="gray.500">PNG, ICO, or SVG (max 1MB)</Text>
                      </VStack>
                    </Button>
                  )}
                  <FormErrorMessage>{errors.favicon}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
            </Box>
            
            <Box>
              <Heading size="sm" mb={4}>Color Scheme</Heading>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                <FormControl isRequired isInvalid={!!errors.primaryColor}>
                  <FormLabel>
                    Primary Color
                    <Tooltip label="Your main brand color. Used for buttons, links, and primary UI elements.">
                      <Icon as={FiInfo} ml={1} />
                    </Tooltip>
                  </FormLabel>
                  <Flex>
                    <Input
                      type="color"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleColorChange}
                      w="80px"
                      p={1}
                      h="40px"
                    />
                    <Input
                      type="text"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleColorChange}
                      ml={2}
                      placeholder="#RRGGBB"
                    />
                  </Flex>
                  <FormErrorMessage>{errors.primaryColor}</FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={!!errors.secondaryColor}>
                  <FormLabel>
                    Secondary Color
                    <Tooltip label="Your secondary brand color. Used for secondary UI elements and accents.">
                      <Icon as={FiInfo} ml={1} />
                    </Tooltip>
                  </FormLabel>
                  <Flex>
                    <Input
                      type="color"
                      name="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={handleColorChange}
                      w="80px"
                      p={1}
                      h="40px"
                    />
                    <Input
                      type="text"
                      name="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={handleColorChange}
                      ml={2}
                      placeholder="#RRGGBB"
                    />
                  </Flex>
                  <FormErrorMessage>{errors.secondaryColor}</FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={!!errors.accentColor}>
                  <FormLabel>
                    Accent Color
                    <Tooltip label="Your accent color. Used for call-to-action buttons, highlights, and important UI elements.">
                      <Icon as={FiInfo} ml={1} />
                    </Tooltip>
                  </FormLabel>
                  <Flex>
                    <Input
                      type="color"
                      name="accentColor"
                      value={formData.accentColor}
                      onChange={handleColorChange}
                      w="80px"
                      p={1}
                      h="40px"
                    />
                    <Input
                      type="text"
                      name="accentColor"
                      value={formData.accentColor}
                      onChange={handleColorChange}
                      ml={2}
                      placeholder="#RRGGBB"
                    />
                  </Flex>
                  <FormErrorMessage>{errors.accentColor}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              
              {/* Preview Section */}
              <Box mt={8} p={6} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                <Heading size="xs" mb={4}>Live Preview</Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  <VStack>
                    <Text fontSize="sm">Primary</Text>
                    <Box
                      w="100%"
                      h="60px"
                      bg={formData.primaryColor}
                      borderRadius="md"
                      boxShadow="md"
                    />
                    <Button
                      size="sm"
                      bg={formData.primaryColor}
                      color="white"
                      _hover={{ bg: formData.primaryColor, opacity: 0.9 }}
                    >
                      Primary Button
                    </Button>
                  </VStack>
                  
                  <VStack>
                    <Text fontSize="sm">Secondary</Text>
                    <Box
                      w="100%"
                      h="60px"
                      bg={formData.secondaryColor}
                      borderRadius="md"
                      boxShadow="md"
                    />
                    <Button
                      size="sm"
                      bg={formData.secondaryColor}
                      color="white"
                      _hover={{ bg: formData.secondaryColor, opacity: 0.9 }}
                    >
                      Secondary Button
                    </Button>
                  </VStack>
                  
                  <VStack>
                    <Text fontSize="sm">Accent</Text>
                    <Box
                      w="100%"
                      h="60px"
                      bg={formData.accentColor}
                      borderRadius="md"
                      boxShadow="md"
                    />
                    <Button
                      size="sm"
                      bg={formData.accentColor}
                      color="white"
                      _hover={{ bg: formData.accentColor, opacity: 0.9 }}
                    >
                      Accent Button
                    </Button>
                  </VStack>
                </SimpleGrid>
                
                <Box mt={6} p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                  <Flex align="center" justify="space-between">
                    {logoImage && (
                      <Image
                        src={logoImage}
                        alt="Logo preview"
                        maxH="40px"
                        objectFit="contain"
                      />
                    )}
                    <HStack spacing={4}>
                      <Button size="sm" variant="ghost" color={formData.primaryColor}>Home</Button>
                      <Button size="sm" variant="ghost" color={formData.primaryColor}>About</Button>
                      <Button size="sm" variant="ghost" color={formData.primaryColor}>Contact</Button>
                      <Button size="sm" bg={formData.accentColor} color="white">Subscribe</Button>
                    </HStack>
                  </Flex>
                </Box>
              </Box>
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
                Continue to Content Categories
              </Button>
            </Box>
          </VStack>
        </form>
      </VStack>
    </SetupLayout>
  );
};

export default VisualIdentitySetup;
