import React from 'react';
import {
  Box,
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  BoxProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const MotionBox = motion(Box);

interface StatCardProps extends BoxProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  change?: number;
  changeLabel?: string;
  accentColor?: string;
  isGlass?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel,
  accentColor,
  isGlass = false,
  ...rest
}) => {
  // Dynamic colors based on color mode
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  
  // Determine if change is positive, negative, or neutral
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  // Default accent color if not provided
  const defaultAccentColor = useColorModeValue('blue.500', 'blue.300');
  const iconBgColor = useColorModeValue(
    `${accentColor || defaultAccentColor}10`,
    `${accentColor || defaultAccentColor}20`
  );
  
  const iconColor = accentColor || defaultAccentColor;
  
  // Card content
  const cardContent = (
    <Box p={6} {...rest}>
      <Flex align="center" justify="space-between">
        <Stat>
          <StatLabel color={labelColor} fontSize="sm" fontWeight="medium">
            {title}
          </StatLabel>
          <StatNumber
            fontSize="2xl"
            fontWeight="bold"
            color={textColor}
            mt={1}
            letterSpacing="tight"
          >
            {value}
          </StatNumber>
          {(change || changeLabel) && (
            <StatHelpText mt={1} mb={0} fontSize="xs">
              {change && (
                <>
                  <StatArrow
                    type={isPositive ? 'increase' : 'decrease'}
                    color={isPositive ? 'green.400' : isNegative ? 'red.400' : undefined}
                  />
                  {Math.abs(change).toFixed(2)}%
                </>
              )}
              {changeLabel && (
                <Text as="span" ml={change ? 1 : 0}>
                  {changeLabel}
                </Text>
              )}
            </StatHelpText>
          )}
        </Stat>
        <MotionBox
          p={3}
          borderRadius="xl"
          bg={iconBgColor}
          color={iconColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {React.cloneElement(icon, { size: 24 })}
        </MotionBox>
      </Flex>
    </Box>
  );

  // Return either a glass card or a regular card
  return isGlass ? (
    <GlassCard>{cardContent}</GlassCard>
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
      {cardContent}
    </Box>
  );
};

export default StatCard;
