import React from 'react';
import { SimpleGrid, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { FiTrendingUp, FiUsers, FiDollarSign, FiActivity, FiEye, FiBarChart } from 'react-icons/fi';
import StatCard from '../ui/StatCard';
import GlassCard from '../ui/GlassCard';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface DashboardStatsProps {
  isGlass?: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ isGlass = false }) => {
  // Animation variants for staggered children
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
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Stats data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,532',
      icon: <FiDollarSign />,
      change: 12.5,
      changeLabel: 'from last month',
      accentColor: 'green.500'
    },
    {
      title: 'Active Campaigns',
      value: '18',
      icon: <FiActivity />,
      change: 8.2,
      changeLabel: 'from last month',
      accentColor: 'blue.500'
    },
    {
      title: 'Total Impressions',
      value: '1.2M',
      icon: <FiEye />,
      change: 24.1,
      changeLabel: 'from last month',
      accentColor: 'purple.500'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      icon: <FiTrendingUp />,
      change: -1.8,
      changeLabel: 'from last month',
      accentColor: 'orange.500'
    },
    {
      title: 'New Advertisers',
      value: '32',
      icon: <FiUsers />,
      change: 5.3,
      changeLabel: 'from last month',
      accentColor: 'teal.500'
    },
    {
      title: 'Avg. Campaign Value',
      value: '$1,245',
      icon: <FiBarChart />,
      change: 2.1,
      changeLabel: 'from last month',
      accentColor: 'pink.500'
    }
  ];

  return (
    <MotionBox
      variants={container}
      initial="hidden"
      animate="show"
      width="100%"
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        {stats.map((stat, index) => (
          <MotionBox key={index} variants={item}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              changeLabel={stat.changeLabel}
              accentColor={stat.accentColor}
              isGlass={isGlass}
            />
          </MotionBox>
        ))}
      </SimpleGrid>
    </MotionBox>
  );
};

export default DashboardStats;
