import React, { ReactNode } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Progress,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Define the setup steps in order
const setupSteps = [
  { id: 'business', label: 'Business Account', path: '/setup/business' },
  { id: 'publication', label: 'Publication Profile', path: '/setup/publication' },
  { id: 'visual', label: 'Visual Identity', path: '/setup/visual' },
  { id: 'content', label: 'Content Categories', path: '/setup/content' },
  { id: 'audience', label: 'Audience Info', path: '/setup/audience' },
];

interface SetupLayoutProps {
  children: ReactNode;
  currentStep: string;
}

const SetupLayout: React.FC<SetupLayoutProps> = ({ children, currentStep }) => {
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Find the current step index
  const currentStepIndex = setupSteps.findIndex(step => step.id === currentStep);
  
  // Calculate progress percentage
  const progressPercentage = ((currentStepIndex + 1) / setupSteps.length) * 100;

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <Heading size="lg">Publication Setup</Heading>
            <HStack>
              <Text fontSize="sm" color="gray.500">
                Step {currentStepIndex + 1} of {setupSteps.length}
              </Text>
            </HStack>
          </Flex>
          
          {/* Progress bar */}
          <Progress 
            value={progressPercentage} 
            size="sm" 
            colorScheme="blue" 
            borderRadius="full"
          />
          
          {/* Step navigation */}
          <HStack 
            spacing={0} 
            overflowX="auto" 
            py={2}
            css={{
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            {setupSteps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isClickable = index <= currentStepIndex;
              
              return (
                <Box 
                  key={step.id}
                  as={isClickable ? Link : 'div'}
                  href={isClickable ? step.path : undefined}
                  flex="1"
                  minW="150px"
                  textAlign="center"
                  py={3}
                  px={4}
                  fontWeight={isCurrent ? 'semibold' : 'medium'}
                  color={isCurrent ? 'primary' : isCompleted ? 'green.500' : 'gray.500'}
                  borderBottom="3px solid"
                  borderColor={isCurrent ? 'primary' : isCompleted ? 'green.500' : 'transparent'}
                  cursor={isClickable ? 'pointer' : 'default'}
                  opacity={isClickable ? 1 : 0.6}
                  transition="all 0.2s"
                  _hover={isClickable ? { color: isCurrent ? 'primary' : 'green.500' } : {}}
                >
                  <HStack spacing={2} justify="center">
                    {isCompleted && <Icon as={FiCheckCircle} />}
                    <Text>{step.label}</Text>
                  </HStack>
                </Box>
              );
            })}
          </HStack>
          
          {/* Content area */}
          <Box 
            bg={bgColor} 
            p={8} 
            borderRadius="lg" 
            boxShadow="md"
            borderWidth="1px"
            borderColor={borderColor}
          >
            {children}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default SetupLayout;
