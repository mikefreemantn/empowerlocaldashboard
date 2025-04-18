import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { 
  FiBarChart2, 
  FiTrendingUp, 
  FiUsers, 
  FiDollarSign, 
  FiPieChart, 
  FiActivity, 
  FiCalendar, 
  FiChevronDown,
  FiEye,
  FiTarget,
  FiThumbsUp,
  FiShare2,
  FiGlobe,
  FiSmartphone,
  FiMonitor
} from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';
import Heading from '@/components/ui/Heading';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Sample data for all charts
const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue 2025',
      data: [12500, 14200, 15800, 16300, 18500, 19200, 21000, 22500, 24100, 25600, 27200, 29800],
      borderColor: '#2563EB',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Revenue 2024',
      data: [10200, 11500, 12800, 13900, 15200, 16800, 18100, 19500, 20800, 22100, 23500, 25200],
      borderColor: '#9333EA',
      backgroundColor: 'rgba(147, 51, 234, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const channelPerformanceData = {
  labels: ['Website', 'Print', 'Newsletter', 'Social', 'Events', 'Podcasts'],
  datasets: [
    {
      label: 'Revenue',
      data: [35000, 28000, 15000, 22000, 18000, 12000],
      backgroundColor: [
        'rgba(37, 99, 235, 0.7)',
        'rgba(147, 51, 234, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(239, 68, 68, 0.7)',
      ],
      borderColor: [
        'rgba(37, 99, 235, 1)',
        'rgba(147, 51, 234, 1)',
        'rgba(236, 72, 153, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const audienceData = {
  labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  datasets: [
    {
      label: 'Male',
      data: [8, 22, 18, 15, 12, 8],
      backgroundColor: 'rgba(37, 99, 235, 0.7)',
    },
    {
      label: 'Female',
      data: [10, 25, 20, 14, 10, 7],
      backgroundColor: 'rgba(236, 72, 153, 0.7)',
    },
    {
      label: 'Other',
      data: [2, 4, 3, 2, 1, 1],
      backgroundColor: 'rgba(147, 51, 234, 0.7)',
    },
  ],
};

const deviceData = {
  labels: ['Mobile', 'Desktop', 'Tablet'],
  datasets: [
    {
      label: 'Device Usage',
      data: [58, 32, 10],
      backgroundColor: [
        'rgba(245, 158, 11, 0.7)',
        'rgba(37, 99, 235, 0.7)',
        'rgba(16, 185, 129, 0.7)',
      ],
      borderColor: [
        'rgba(245, 158, 11, 1)',
        'rgba(37, 99, 235, 1)',
        'rgba(16, 185, 129, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const engagementData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Morning',
      data: [22, 28, 25, 30, 24, 15, 12],
      backgroundColor: 'rgba(37, 99, 235, 0.7)',
    },
    {
      label: 'Afternoon',
      data: [38, 40, 42, 48, 40, 35, 30],
      backgroundColor: 'rgba(245, 158, 11, 0.7)',
    },
    {
      label: 'Evening',
      data: [65, 70, 75, 78, 68, 60, 55],
      backgroundColor: 'rgba(236, 72, 153, 0.7)',
    },
  ],
};

const geographicData = {
  labels: ['Oregon', 'Washington', 'California', 'Idaho', 'Nevada', 'Other States'],
  datasets: [
    {
      label: 'Audience Distribution',
      data: [65, 15, 10, 5, 3, 2],
      backgroundColor: [
        'rgba(37, 99, 235, 0.7)',
        'rgba(147, 51, 234, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(239, 68, 68, 0.7)',
      ],
      borderColor: [
        'rgba(37, 99, 235, 1)',
        'rgba(147, 51, 234, 1)',
        'rgba(236, 72, 153, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// Define chart data types
type ChartDataset = {
  label: string;
  data: number[];
  borderColor?: string | string[];
  backgroundColor: string | string[];
  fill?: boolean;
  tension?: number;
  borderWidth?: number;
};

type ChartData = {
  labels: string[];
  datasets: ChartDataset[];
};

// Line Chart Component
const LineChart = ({ data }: { data: ChartData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Use useLayoutEffect to prevent flickering
  useLayoutEffect(() => {
    let ctx: CanvasRenderingContext2D | null = null;
    
    if (chartRef.current) {
      ctx = chartRef.current.getContext('2d');
    }
    
    // Only create a new chart if we don't already have one or if the canvas context changed
    if (ctx && (!chartInstance.current || chartInstance.current.canvas !== chartRef.current)) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          animation: {
            duration: 0 // Disable animation to prevent flickering
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 6,
              },
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 1,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)',
              },
              ticks: {
                callback: (value) => {
                  return '$' + value.toLocaleString();
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 3,
              hoverRadius: 5,
            },
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
          },
        },
      });
    } else if (chartInstance.current && ctx) {
      // Just update the data if the chart already exists
      chartInstance.current.data = data;
      chartInstance.current.update('none'); // Update without animation
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;  
};

// Pie Chart Component
const PieChart = ({ data }: { data: ChartData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Use useLayoutEffect to prevent flickering
  useLayoutEffect(() => {
    let ctx: CanvasRenderingContext2D | null = null;
    
    if (chartRef.current) {
      ctx = chartRef.current.getContext('2d');
    }
    
    // Only create a new chart if we don't already have one or if the canvas context changed
    if (ctx && (!chartInstance.current || chartInstance.current.canvas !== chartRef.current)) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
          animation: {
            duration: 0 // Disable animation to prevent flickering
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                usePointStyle: true,
                boxWidth: 6,
              },
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw as number;
                  const total = context.chart.data.datasets[0].data.reduce((a, b) => (a as number) + (b as number), 0) as number;
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${percentage}% ($${value.toLocaleString()})`;
                }
              }
            },
          },
        },
      });
    } else if (chartInstance.current && ctx) {
      // Just update the data if the chart already exists
      chartInstance.current.data = data;
      chartInstance.current.update('none'); // Update without animation
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;  
};

// Bar Chart Component
const BarChart = ({ data }: { data: ChartData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Use useLayoutEffect to prevent flickering
  useLayoutEffect(() => {
    let ctx: CanvasRenderingContext2D | null = null;
    
    if (chartRef.current) {
      ctx = chartRef.current.getContext('2d');
    }
    
    // Only create a new chart if we don't already have one or if the canvas context changed
    if (ctx && (!chartInstance.current || chartInstance.current.canvas !== chartRef.current)) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          animation: {
            duration: 0 // Disable animation to prevent flickering
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 6,
              },
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 1,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)',
              },
              ticks: {
                precision: 0,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    } else if (chartInstance.current && ctx) {
      // Just update the data if the chart already exists
      chartInstance.current.data = data;
      chartInstance.current.update('none'); // Update without animation
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;  
};

const AnalyticsPage = () => {
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  
  // State for time period filter
  const [timePeriod, setTimePeriod] = useState('30d');
  
  return (
    <MainLayout title="Analytics Dashboard" activeRoute="/analytics">
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading variant="h2" size="lg" mb={1}>Analytics Dashboard</Heading>
            <Text color={textSecondaryColor}>
              Comprehensive insights and performance metrics for your media channels
            </Text>
          </Box>
          
          <HStack spacing={4}>
            <Menu>
              <MenuButton as={Button} rightIcon={<FiChevronDown />} variant="outline">
                {timePeriod === '7d' ? 'Last 7 Days' : 
                 timePeriod === '30d' ? 'Last 30 Days' : 
                 timePeriod === '90d' ? 'Last 90 Days' : 
                 'Last 12 Months'}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setTimePeriod('7d')}>Last 7 Days</MenuItem>
                <MenuItem onClick={() => setTimePeriod('30d')}>Last 30 Days</MenuItem>
                <MenuItem onClick={() => setTimePeriod('90d')}>Last 90 Days</MenuItem>
                <MenuItem onClick={() => setTimePeriod('12m')}>Last 12 Months</MenuItem>
              </MenuList>
            </Menu>
            <Button colorScheme="blue" leftIcon={<FiBarChart2 />}>
              Export Report
            </Button>
          </HStack>
        </Flex>
        
        {/* Key Metrics */}
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
          <GridItem>
            <Box p={5} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
              <Flex align="center" mb={3}>
                <Icon as={FiDollarSign} boxSize={6} color="blue.500" mr={3} />
                <Text fontWeight="medium" fontSize="lg">Total Revenue</Text>
              </Flex>
              <Stat>
                <StatNumber fontSize="3xl">$128,450</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36% vs. previous period
                </StatHelpText>
              </Stat>
            </Box>
          </GridItem>
          
          <GridItem>
            <Box p={5} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
              <Flex align="center" mb={3}>
                <Icon as={FiUsers} boxSize={6} color="purple.500" mr={3} />
                <Text fontWeight="medium" fontSize="lg">Total Audience</Text>
              </Flex>
              <Stat>
                <StatNumber fontSize="3xl">245,789</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  18.42% vs. previous period
                </StatHelpText>
              </Stat>
            </Box>
          </GridItem>
          
          <GridItem>
            <Box p={5} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
              <Flex align="center" mb={3}>
                <Icon as={FiActivity} boxSize={6} color="green.500" mr={3} />
                <Text fontWeight="medium" fontSize="lg">Engagement Rate</Text>
              </Flex>
              <Stat>
                <StatNumber fontSize="3xl">8.7%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  2.1% vs. previous period
                </StatHelpText>
              </Stat>
            </Box>
          </GridItem>
          
          <GridItem>
            <Box p={5} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
              <Flex align="center" mb={3}>
                <Icon as={FiTarget} boxSize={6} color="orange.500" mr={3} />
                <Text fontWeight="medium" fontSize="lg">Conversion Rate</Text>
              </Flex>
              <Stat>
                <StatNumber fontSize="3xl">4.2%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  0.8% vs. previous period
                </StatHelpText>
              </Stat>
            </Box>
          </GridItem>
        </Grid>
        
        {/* Tabs for different analytics views */}
        <Tabs variant="line" colorScheme="blue" mb={6}>
          <TabList>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Overview</Tab>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Revenue</Tab>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Audience</Tab>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Content</Tab>
            <Tab _selected={{ bg: 'transparent', color: 'blue.500' }}>Campaigns</Tab>
          </TabList>
          
          <TabPanels>
            {/* Overview Tab */}
            <TabPanel px={0}>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} mb={6}>
                <GridItem colSpan={{ base: 1, lg: 2 }}>
                  <Box p={5} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor} height="100%">
                    <Flex justify="space-between" align="center" mb={4}>
                      <Heading variant="h3" size="md">Revenue Trends</Heading>
                      <HStack>
                        <Select size="sm" defaultValue="all" width="auto">
                          <option value="all">All Channels</option>
                          <option value="website">Website</option>
                          <option value="print">Print</option>
                          <option value="newsletter">Newsletter</option>
                          <option value="social">Social</option>
                          <option value="events">Events</option>
                          <option value="podcasts">Podcasts</option>
                        </Select>
                      </HStack>
                    </Flex>
                    <Box height="300px">
                      <LineChart data={revenueData} />
                    </Box>
                  </Box>
                </GridItem>
                
                <GridItem>
                  <Box p={5} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor} height="100%">
                    <Heading variant="h3" size="md" mb={4}>Channel Performance</Heading>
                    <Box height="300px">
                      <PieChart data={channelPerformanceData} />
                    </Box>
                  </Box>
                </GridItem>
              </Grid>
              
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={6} mb={6}>
                <GridItem>
                  <Box p={5} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
                    <Heading variant="h3" size="md" mb={4}>Audience Demographics</Heading>
                    <Box height="300px">
                      <BarChart data={audienceData} />
                    </Box>
                  </Box>
                </GridItem>
                
                <GridItem>
                  <Box p={5} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
                    <Heading variant="h3" size="md" mb={4}>Engagement by Time & Day</Heading>
                    <Box height="300px">
                      <BarChart data={engagementData} />
                    </Box>
                  </Box>
                </GridItem>
              </Grid>
              
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                <GridItem>
                  <Box p={5} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
                    <Heading variant="h3" size="md" mb={4}>Device Usage</Heading>
                    <Box height="250px">
                      <PieChart data={deviceData} />
                    </Box>
                  </Box>
                </GridItem>
                
                <GridItem colSpan={{ base: 1, lg: 2 }}>
                  <Box p={5} bg={cardBg} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
                    <Heading variant="h3" size="md" mb={4}>Geographic Distribution</Heading>
                    <Box height="250px">
                      <PieChart data={geographicData} />
                    </Box>
                  </Box>
                </GridItem>
              </Grid>
            </TabPanel>
            
            {/* Revenue Tab */}
            <TabPanel px={0}>
              <Text>Detailed revenue analytics content would go here.</Text>
            </TabPanel>
            
            {/* Audience Tab */}
            <TabPanel px={0}>
              <Text>Detailed audience analytics content would go here.</Text>
            </TabPanel>
            
            {/* Content Tab */}
            <TabPanel px={0}>
              <Text>Detailed content analytics would go here.</Text>
            </TabPanel>
            
            {/* Campaigns Tab */}
            <TabPanel px={0}>
              <Text>Detailed campaign analytics would go here.</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  );
};

export default AnalyticsPage;
