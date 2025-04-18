import React from 'react';
import { Heading as ChakraHeading, HeadingProps as ChakraHeadingProps, useColorModeValue } from '@chakra-ui/react';

interface HeadingProps extends ChakraHeadingProps {
  variant?: 'h1' | 'h2' | 'h3' | 'subtitle';
}

/**
 * Custom Heading component that applies the proper light and dark mode variants
 * based on the textStyles defined in the theme.
 */
const Heading: React.FC<HeadingProps> = ({ variant = 'h2', children, ...props }) => {
  // Map variant to the appropriate heading level
  const asMapping: Record<string, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    subtitle: 'h4',
  };

  // Use color mode value to determine the appropriate color and background
  const color = useColorModeValue(
    variant === 'h2' ? '#0F52BA' : undefined, // Sapphire Blue for light mode (from EmpowerLocal palette)
    variant === 'h2' ? '#F5F5F5' : undefined  // Off-White for dark mode (from EmpowerLocal palette)
  );
  
  // Gradient background for h2 in light and dark modes
  const bgGradient = useColorModeValue(
    variant === 'h2' ? 'linear-gradient(to right, rgba(15, 82, 186, 0.08), rgba(15, 82, 186, 0.01))' : undefined, // Sapphire Blue gradient
    variant === 'h2' ? 'linear-gradient(to right, rgba(79, 70, 229, 0.15), rgba(59, 130, 246, 0.05))' : undefined // Purple-blue gradient for dark mode
  );
  
  // Border color for h2
  const borderColor = useColorModeValue(
    variant === 'h2' ? 'rgba(15, 82, 186, 0.2)' : undefined, // Sapphire Blue border
    variant === 'h2' ? 'rgba(79, 70, 229, 0.3)' : undefined // Purple border for dark mode
  );
  
  // Additional styles for h2
  const h2Styles = variant === 'h2' ? {
    py: 2,
    px: 4,
    borderRadius: 'md',
    display: 'inline-block',
    borderLeftWidth: '3px',
    borderLeftColor: borderColor,
    mb: 4,
    transition: 'all 0.3s ease-in-out'
  } : {};

  return (
    <ChakraHeading
      as={asMapping[variant]}
      color={color}
      bgGradient={bgGradient}
      letterSpacing={variant === 'h2' ? '-0.01em' : undefined}
      fontWeight={variant === 'h2' ? 'semibold' : undefined}
      {...h2Styles}
      {...props}
    >
      {children}
    </ChakraHeading>
  );
};

export default Heading;
