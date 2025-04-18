import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface GlassCardProps extends BoxProps {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glowColor?: string;
  blur?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  hoverEffect = true,
  glowColor,
  blur = '12px',
  ...props
}) => {
  // Dynamic styles based on color mode
  const bgGradient = useColorModeValue(
    'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
    'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%)'
  );
  
  const borderColor = useColorModeValue(
    'rgba(255, 255, 255, 0.5)',
    'rgba(255, 255, 255, 0.1)'
  );
  
  const shadowColor = useColorModeValue(
    'rgba(0, 0, 0, 0.05)',
    'rgba(0, 0, 0, 0.3)'
  );
  
  const defaultGlow = useColorModeValue(
    'rgba(0, 98, 255, 0.15)',
    'rgba(59, 130, 246, 0.2)'
  );
  
  const actualGlowColor = glowColor || defaultGlow;
  
  return (
    <MotionBox
      bgGradient={bgGradient}
      borderRadius="xl"
      backdropFilter={`blur(${blur})`}
      border="1px solid"
      borderColor={borderColor}
      boxShadow={`0 8px 32px ${shadowColor}`}
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
      sx={{
        _hover: hoverEffect
          ? {
              boxShadow: `0 12px 32px ${shadowColor}, 0 0 0 1px ${actualGlowColor}`,
              transform: 'translateY(-4px)',
              _before: {
                opacity: 1,
              },
              _after: {
                opacity: 1,
              },
            }
          : {},
        _before: hoverEffect
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              bgGradient: `linear-gradient(90deg, transparent, ${actualGlowColor}, transparent)`,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }
          : {},
        _after: hoverEffect
          ? {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              bgGradient: `linear-gradient(90deg, transparent, ${actualGlowColor}, transparent)`,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }
          : {}
      }}
      whileHover={hoverEffect ? { y: -4 } : {}}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export default GlassCard;
