import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Center, Spinner, Text, VStack } from '@chakra-ui/react';

const SetupIndex = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the first step of the setup process
    const timer = setTimeout(() => {
      router.push('/setup/business');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6}>
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        <Text fontSize="lg">Preparing your setup experience...</Text>
      </VStack>
    </Box>
  );
};

export default SetupIndex;
