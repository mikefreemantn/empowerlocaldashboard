import { useColorMode, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionIconButton = motion(IconButton);

interface ColorModeToggleProps {
  size?: string;
  variant?: string;
  position?: 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky';
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number;
}

const ColorModeToggle = ({
  size = 'md',
  variant = 'ghost',
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
}: ColorModeToggleProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  // Dynamic styles based on color mode
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconColor = useColorModeValue('brand.primary', 'brand.primaryAlt');
  
  return (
    <Tooltip 
      label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} 
      placement="left"
      hasArrow
    >
      <MotionIconButton
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        icon={isDark ? <FiSun /> : <FiMoon />}
        onClick={toggleColorMode}
        size={size}
        variant={variant}
        position={position}
        top={top}
        right={right}
        bottom={bottom}
        left={left}
        zIndex={zIndex}
        color={iconColor}
        bg={position ? bgColor : undefined}
        border={position ? '1px solid' : undefined}
        borderColor={position ? borderColor : undefined}
        borderRadius="full"
        boxShadow={position ? 'md' : undefined}
        _hover={{
          transform: 'translateY(-2px)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      />
    </Tooltip>
  );
};

export default ColorModeToggle;
