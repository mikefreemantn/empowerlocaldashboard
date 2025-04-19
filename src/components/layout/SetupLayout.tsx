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
  { id: 'business', label: 'Company Profile', path: '/setup/business' },
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
  const activeColor = useColorModeValue('blue.600', 'blue.300');
  const completedColor = useColorModeValue('green.600', 'green.300');
  const defaultColor = useColorModeValue('gray.500', 'gray.400');

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
            role="tablist"
          >
            {setupSteps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              // Make all steps clickable at all times
              const isClickable = true;
              return (
                <Box 
                  key={step.id}
                  as={Link}
                  href={step.path}
                  flex="1"
                  minW="150px"
                  textAlign="center"
                  py={3}
                  px={4}
                  fontWeight={isCurrent ? 'semibold' : 'medium'}
                  color={isCurrent ? activeColor : isCompleted ? completedColor : defaultColor}
                  borderBottom="3px solid"
                  borderColor={isCurrent ? activeColor : isCompleted ? completedColor : 'transparent'}
                  cursor={isClickable ? 'pointer' : 'default'}
                  opacity={1}
                  transition="all 0.2s"
                  _hover={{ color: isCurrent ? activeColor : completedColor, borderColor: completedColor, bg: useColorModeValue('gray.100', 'gray.700') }}
                  aria-current={isCurrent ? 'step' : undefined}
                  role="tab"
                  tabIndex={0}
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
