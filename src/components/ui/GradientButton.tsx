import React from 'react';
import { Button, ButtonProps, Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

interface GradientButtonProps extends ButtonProps {
  children: React.ReactNode;
  gradientType?: 'primary' | 'accent' | 'custom';
  customGradient?: string;
  hoverScale?: number;
  glowOnHover?: boolean;
  iconSpacing?: number;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  gradientType = 'primary',
  customGradient,
  hoverScale = 1.02,
  glowOnHover = true,
  iconSpacing,
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Dynamic gradients based on color mode
  const primaryGradient = useColorModeValue(
    'linear-gradient(135deg, #0062FF 0%, #00C2A0 100%)',
    'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)'
  );
  
  const accentGradient = useColorModeValue(
    'linear-gradient(135deg, #FF6B35 0%, #FFD166 100%)',
    'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)'
  );
  
  // Determine which gradient to use
  let gradient;
  if (customGradient) {
    gradient = customGradient;
  } else if (gradientType === 'accent') {
    gradient = accentGradient;
  } else {
    gradient = primaryGradient;
  }
  
  // Glow color based on gradient type
  const glowColor = useColorModeValue(
    gradientType === 'primary' ? 'rgba(0, 98, 255, 0.4)' : 'rgba(255, 107, 53, 0.4)',
    gradientType === 'primary' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(249, 115, 22, 0.4)'
  );
  
  return (
    <Box position="relative">
      <MotionButton
        bgGradient={gradient}
        color="white"
        fontWeight="semibold"
        borderRadius="xl"
        px={6}
        py={props.size === 'lg' ? 6 : undefined}
        _hover={{
          transform: `scale(${hoverScale})`,
          boxShadow: glowOnHover ? `0 0 20px ${glowColor}` : undefined,
        }}
        _active={{
          transform: 'scale(0.98)',
        }}
        transition="all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {leftIcon && (
          <Box as="span" display="inline-flex" mr={iconSpacing || 2} alignItems="center">
            {leftIcon}
          </Box>
        )}
        {children}
        {rightIcon && (
          <Box as="span" display="inline-flex" ml={iconSpacing || 2} alignItems="center">
            {rightIcon}
          </Box>
        )}
      </MotionButton>
    </Box>
  );
};

export default GradientButton;
