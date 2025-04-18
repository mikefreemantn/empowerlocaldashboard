import React from 'react';
import { Box, Flex, Text, useColorModeValue, Select, HStack, useToken } from '@chakra-ui/react';
import GlassCard from '../ui/GlassCard';
import { motion } from 'framer-motion';

interface ChartDataItem {
  label: string;
  value: number;
}

interface ChartProps {
  data: ChartDataItem[];
  gradient: string;
  height?: number;
}

// Mock chart component - in a real app, you'd use a library like recharts or chart.js
const Chart: React.FC<ChartProps> = ({ data, gradient, height = 200 }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const gridColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  
  // Create chart bars
  const maxValue = Math.max(...data.map((item: ChartDataItem) => item.value));
  
  return (
    <Box position="relative" height={`${height}px`} mt={6}>
      {/* Grid lines */}
      {[0, 1, 2, 3].map((line) => (
        <Box 
          key={line}
          position="absolute"
          left={0}
          right={0}
          bottom={`${(line * 25)}%`}
          height="1px"
          bg={gridColor}
          zIndex={1}
        />
      ))}
      
      {/* Y-axis labels */}
      {[0, 1, 2, 3, 4].map((label) => (
        <Text
          key={label}
          position="absolute"
          left="-24px"
          bottom={`${(label * 25) - 2}%`}
          fontSize="xs"
          color={textColor}
          fontFamily="mono"
        >
          {Math.round((maxValue / 4) * label)}
        </Text>
      ))}
      
      {/* Bars */}
      <Flex 
        height="100%" 
        alignItems="flex-end" 
        justifyContent="space-between"
        position="relative"
        zIndex={2}
      >
        {data.map((item: ChartDataItem, index: number) => {
          const height = (item.value / maxValue) * 100;
          
          return (
            <Box 
              key={index} 
              width="8%" 
              position="relative"
              height="100%"
              display="flex"
              alignItems="flex-end"
            >
              <Box
                as={motion.div}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ type: 'spring', duration: 0.5, delay: index * 0.1 } as any}
                width="100%"
                borderRadius="md"
                bgGradient={gradient}
                position="relative"
                sx={{
                  _hover: {
                    transform: 'scaleY(1.05)',
                  },
                  transition: "transform 0.2s"
                }}
              />
              <Text
                fontSize="xs"
                color={textColor}
                position="absolute"
                bottom="-20px"
                left="50%"
                transform="translateX(-50%)"
                fontFamily="mono"
              >
                {item.label}
              </Text>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

interface DashboardChartProps {
  title?: string;
  isGlass?: boolean;
}

const DashboardChart: React.FC<DashboardChartProps> = ({ 
  title = 'Revenue Overview',
  isGlass = false
}) => {
  const [timeRange, setTimeRange] = React.useState('month');
  
  // Get gradient colors from theme
  const [primaryGradient] = useToken('gradients', ['primary']);
  
  // Dynamic colors based on color mode
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  
  // Mock data
  const monthlyData = [
    { label: 'Jan', value: 5400 },
    { label: 'Feb', value: 6200 },
    { label: 'Mar', value: 7800 },
    { label: 'Apr', value: 6800 },
    { label: 'May', value: 9200 },
    { label: 'Jun', value: 8400 },
    { label: 'Jul', value: 7900 },
    { label: 'Aug', value: 8700 },
    { label: 'Sep', value: 10200 },
    { label: 'Oct', value: 9800 },
    { label: 'Nov', value: 11500 },
    { label: 'Dec', value: 12800 },
  ];
  
  const weeklyData = [
    { label: 'Mon', value: 1200 },
    { label: 'Tue', value: 1800 },
    { label: 'Wed', value: 2400 },
    { label: 'Thu', value: 1900 },
    { label: 'Fri', value: 2700 },
    { label: 'Sat', value: 1600 },
    { label: 'Sun', value: 1100 },
  ];
  
  const data = timeRange === 'month' ? monthlyData : weeklyData;
  
  // Card content
  const chartContent = (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="semibold" fontSize="lg" color={textColor}>
          {title}
        </Text>
        <Select
          size="sm"
          width="120px"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          borderColor={borderColor}
        >
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </Select>
      </Flex>
      
      <Chart 
        data={data} 
        gradient={primaryGradient}
        height={240}
      />
      
      <HStack mt={8} justifyContent="space-between">
        <Box>
          <Text fontSize="sm" color={textSecondaryColor}>Total Revenue</Text>
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>$124,532</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color={textSecondaryColor}>Growth</Text>
          <Text fontSize="2xl" fontWeight="bold" color="green.500">+24.5%</Text>
        </Box>
      </HStack>
    </Box>
  );
  
  // Return either a glass card or a regular card
  return isGlass ? (
    <GlassCard>
      {chartContent}
    </GlassCard>
  ) : (
    <Box
      bg={cardBg}
      borderRadius="xl"
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'md',
      }}
    >
      {chartContent}
    </Box>
  );
};

export default DashboardChart;
