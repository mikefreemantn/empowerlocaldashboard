import React from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Stack,
  StackDivider,
  useColorModeValue,
  Grid,
  GridItem,
  HStack,
  VStack,
  Badge,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react';
import { FiTrendingUp, FiUsers, FiDollarSign, FiActivity, FiPlus, FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';
import MainLayout from '../components/layout/MainLayout';
import DashboardStats from '../components/dashboard/DashboardStats';
import DashboardChart from '../components/dashboard/DashboardChart';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Home = () => {
  // Dynamic colors based on color mode
  const bgGradient = useColorModeValue(
    'linear-gradient(to bottom, rgba(247, 250, 252, 0.8), rgba(255, 255, 255, 0))',
    'linear-gradient(to bottom, rgba(26, 32, 44, 0.8), rgba(23, 25, 35, 0))'
  );
  const textColor = useColorModeValue('text', 'white');
  const textSecondaryColor = useColorModeValue('textSecondary', 'gray.400');
  const cardBg = useColorModeValue('card', 'gray.800');
  const borderColor = useColorModeValue('border', 'gray.700');
  const tabHoverBg = useColorModeValue('rgba(0, 98, 255, 0.08)', 'rgba(59, 130, 246, 0.16)');
  
  // Sample data for recent activity
  const recentActivity = [
    { 
      title: 'New campaign created', 
      time: '2 hours ago',
      user: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      type: 'campaign'
    },
    { 
      title: 'Inventory updated', 
      time: '5 hours ago',
      user: 'Mark Wilson',
      avatar: 'https://i.pravatar.cc/150?img=2',
      type: 'inventory'
    },
    { 
      title: 'New advertiser joined', 
      time: '1 day ago',
      user: 'Emily Chen',
      avatar: 'https://i.pravatar.cc/150?img=5',
      type: 'user'
    },
    { 
      title: 'Campaign performance report', 
      time: '2 days ago',
      user: 'Alex Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=4',
      type: 'report'
    },
  ];

  // Sample data for upcoming tasks
  const upcomingTasks = [
    { 
      title: 'Review campaign proposals', 
      due: 'Today',
      priority: 'High',
      status: 'In Progress',
      assignees: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2'
      ]
    },
    { 
      title: 'Update inventory pricing', 
      due: 'Tomorrow',
      priority: 'Medium',
      status: 'Not Started',
      assignees: [
        'https://i.pravatar.cc/150?img=3'
      ]
    },
    { 
      title: 'Team meeting', 
      due: 'May 15, 2023',
      priority: 'Low',
      status: 'Not Started',
      assignees: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4'
      ]
    },
    { 
      title: 'Quarterly performance review', 
      due: 'May 30, 2023',
      priority: 'High',
      status: 'Not Started',
      assignees: [
        'https://i.pravatar.cc/150?img=5',
        'https://i.pravatar.cc/150?img=6'
      ]
    },
  ];
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout title="Dashboard">
      {/* Hero section with gradient background */}
      <Box 
        position="relative" 
        mb={8} 
        pb={8}
        bgGradient={bgGradient}
        borderRadius="xl"
        overflow="hidden"
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          px={{ base: 4, md: 8 }}
          py={8}
        >
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ base: 'flex-start', md: 'center' }} 
            mb={6}
          >
            <Box mb={{ base: 4, md: 0 }}>
              <Heading 
                as="h1" 
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                fontWeight="bold"
                color={textColor}
                letterSpacing="tight"
                mb={2}
              >
                Welcome back, Michael!
              </Heading>
              <Text color={textSecondaryColor} fontSize={{ base: 'md', md: 'lg' }}>
                Here's what's happening with your campaigns today.
              </Text>
            </Box>
            <GradientButton
              leftIcon={<FiPlus />}
              size="lg"
              hoverScale={1.05}
              glowOnHover
            >
              New Campaign
            </GradientButton>
          </Flex>
        </MotionBox>
      </Box>

      {/* Stats Grid */}
      <Box mb={10}>
        <DashboardStats isGlass={false} />
      </Box>

      {/* Revenue Chart */}
      <Box mb={10}>
        <DashboardChart isGlass={false} />
      </Box>

      {/* Tabs for different views */}
      <Tabs 
        variant="line" 
        colorScheme="blue" 
        mb={8}
        isLazy
        size="md"
      >
        <TabList 
          mb={6} 
          borderBottomWidth="1px" 
          borderColor={borderColor}
          overflowX="auto"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
          }}
        >
          <Tab 
            fontWeight="medium"
            color={textSecondaryColor}
            _selected={{ 
              color: 'primary',
              fontWeight: 'bold',
              borderBottomWidth: '3px',
              borderColor: 'primary',
              bg: 'transparent',
            }}
            _hover={{ color: 'primary' }}
            px={4}
            py={3}
          >
            Overview
          </Tab>
          <Tab 
            fontWeight="medium"
            color={textSecondaryColor}
            _selected={{ 
              color: 'primary',
              fontWeight: 'bold',
              borderBottomWidth: '3px',
              borderColor: 'primary',
              bg: 'transparent',
            }}
            _hover={{ color: 'primary' }}
            px={4}
            py={3}
          >
            Campaigns
          </Tab>
          <Tab 
            fontWeight="medium"
            color={textSecondaryColor}
            _selected={{ 
              color: 'primary',
              fontWeight: 'bold',
              borderBottomWidth: '3px',
              borderColor: 'primary',
              bg: 'transparent',
            }}
            _hover={{ color: 'primary' }}
            px={4}
            py={3}
          >
            Performance
          </Tab>
          <Tab 
            fontWeight="medium"
            color={textSecondaryColor}
            _selected={{ 
              color: 'primary',
              fontWeight: 'bold',
              borderBottomWidth: '3px',
              borderColor: 'primary',
              bg: 'transparent',
            }}
            _hover={{ color: 'primary' }}
            px={4}
            py={3}
          >
            Revenue
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={8}>
              {/* Recent Activity */}
              <GridItem>
                <GlassCard>
                  <Box p={6}>
                    <Flex justifyContent="space-between" alignItems="center" mb={6}>
                      <Heading size="md" fontWeight="semibold" letterSpacing="tight">
                        Recent Activity
                      </Heading>
                      <Badge colorScheme="accent1" borderRadius="full" px={2}>
                        New
                      </Badge>
                    </Flex>
                    <MotionBox
                      as={VStack}
                      spacing={4}
                      divider={<StackDivider borderColor={borderColor} />}
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {recentActivity.map((item, index) => (
                        <MotionBox key={index} variants={item} width="100%">
                          <Flex alignItems="center">
                            <Avatar size="sm" src={item.avatar} mr={3} />
                            <Box flex="1">
                              <Text fontWeight="medium">{item.title}</Text>
                              <HStack spacing={2} mt={1}>
                                <Text fontSize="xs" color={textSecondaryColor}>
                                  {item.time}
                                </Text>
                                <Text fontSize="xs" color={textSecondaryColor}>
                                  •
                                </Text>
                                <Text fontSize="xs" color={textSecondaryColor}>
                                  {item.user}
                                </Text>
                              </HStack>
                            </Box>
                            <Badge 
                              colorScheme={
                                item.type === 'campaign' ? 'blue' : 
                                item.type === 'inventory' ? 'green' : 
                                item.type === 'user' ? 'purple' : 
                                'orange'
                              }
                              variant="subtle"
                              borderRadius="full"
                              px={2}
                              fontSize="xs"
                            >
                              {item.type}
                            </Badge>
                          </Flex>
                        </MotionBox>
                      ))}
                    </MotionBox>
                  </Box>
                </GlassCard>
              </GridItem>

              {/* Upcoming Tasks */}
              <GridItem>
                <GlassCard>
                  <Box p={6}>
                    <Flex justifyContent="space-between" alignItems="center" mb={6}>
                      <Heading size="md" fontWeight="semibold" letterSpacing="tight">
                        Upcoming Tasks
                      </Heading>
                      <Badge colorScheme="accent2" borderRadius="full" px={2}>
                        {upcomingTasks.length} Tasks
                      </Badge>
                    </Flex>
                    <MotionBox
                      as={VStack}
                      spacing={4}
                      divider={<StackDivider borderColor={borderColor} />}
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {upcomingTasks.map((item, index) => (
                        <MotionBox key={index} variants={item} width="100%">
                          <Flex justifyContent="space-between" alignItems="flex-start">
                            <Box flex="1">
                              <HStack spacing={2} mb={1}>
                                <Text fontWeight="medium">{item.title}</Text>
                                <Badge 
                                  colorScheme={
                                    item.priority === 'High' ? 'red' : 
                                    item.priority === 'Medium' ? 'orange' : 
                                    'green'
                                  }
                                  variant="subtle"
                                  borderRadius="full"
                                  px={2}
                                  fontSize="xs"
                                >
                                  {item.priority}
                                </Badge>
                              </HStack>
                              <HStack spacing={4} mt={2}>
                                <HStack spacing={1}>
                                  <Box as={FiCalendar} size="14px" color={textSecondaryColor} />
                                  <Text fontSize="xs" color={textSecondaryColor}>
                                    {item.due}
                                  </Text>
                                </HStack>
                                <HStack spacing={1}>
                                  <Box as={FiClock} size="14px" color={textSecondaryColor} />
                                  <Text fontSize="xs" color={textSecondaryColor}>
                                    {item.status}
                                  </Text>
                                </HStack>
                              </HStack>
                            </Box>
                            <AvatarGroup size="xs" max={3} ml={2}>
                              {item.assignees.map((avatar, idx) => (
                                <Avatar key={idx} src={avatar} />
                              ))}
                            </AvatarGroup>
                          </Flex>
                        </MotionBox>
                      ))}
                    </MotionBox>
                  </Box>
                </GlassCard>
              </GridItem>
            </Grid>
          </TabPanel>

          <TabPanel px={0}>
            <GlassCard>
              <Flex direction="column" align="center" justify="center" py={12} px={6}>
                <Box as={FiCheckCircle} size="48px" color="primary" mb={4} />
                <Heading size="md" mb={2} textAlign="center">Campaigns Panel</Heading>
                <Text textAlign="center" color={textSecondaryColor} mb={6}>
                  This section will display your active and past campaigns with detailed metrics.
                </Text>
                <GradientButton gradientType="accent" size="md">
                  View All Campaigns
                </GradientButton>
              </Flex>
            </GlassCard>
          </TabPanel>

          <TabPanel px={0}>
            <GlassCard>
              <Flex direction="column" align="center" justify="center" py={12} px={6}>
                <Box as={FiCheckCircle} size="48px" color="primary" mb={4} />
                <Heading size="md" mb={2} textAlign="center">Performance Metrics</Heading>
                <Text textAlign="center" color={textSecondaryColor} mb={6}>
                  This section will display detailed performance analytics for your campaigns.
                </Text>
                <GradientButton gradientType="accent" size="md">
                  View Performance Data
                </GradientButton>
              </Flex>
            </GlassCard>
          </TabPanel>

          <TabPanel px={0}>
            <GlassCard>
              <Flex direction="column" align="center" justify="center" py={12} px={6}>
                <Box as={FiCheckCircle} size="48px" color="primary" mb={4} />
                <Heading size="md" mb={2} textAlign="center">Revenue Reports</Heading>
                <Text textAlign="center" color={textSecondaryColor} mb={6}>
                  This section will display revenue reports and financial analytics.
                </Text>
                <GradientButton gradientType="accent" size="md">
                  View Revenue Data
                </GradientButton>
              </Flex>
            </GlassCard>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  );
};

export default Home;
