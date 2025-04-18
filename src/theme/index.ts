import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Color palette with light and dark mode support
const colors = {
  // Light mode colors
  light: {
    // Primary brand colors
    primary: '#2563EB', // Rich blue for primary actions
    primaryAlt: '#4F46E5', // Deep indigo accent
    secondary: '#6B46C1', // Rich purple for secondary elements
    
    // Neutral colors
    background: '#F7F9FC', // Subtle off-white background
    card: '#FFFFFF', // Pure white for cards
    border: 'rgba(0, 98, 255, 0.12)', // Subtle blue-tinted borders
    
    // Accent colors
    accent1: '#FF6B35', // Vibrant orange for key highlights
    accent2: '#FFD166', // Gold for awards, important elements
    accent3: '#06D6A0', // Mint green for success states
    
    // Text colors
    text: '#1A365D', // Deep blue for primary text
    textSecondary: '#4A5568', // Medium gray for secondary text
    textMuted: '#718096', // Light gray for tertiary text
    
    // Functional colors
    success: '#10B981', // Emerald green for success
    warning: '#F59E0B', // Amber for warnings
    error: '#EF4444', // Red for errors
    info: '#3B82F6', // Blue for information
  },
  
  // Dark mode colors
  dark: {
    // Primary brand colors
    primary: '#3B82F6', // Slightly muted blue for dark mode
    primaryAlt: '#6366F1', // Deep indigo accent for dark mode
    secondary: '#8B5CF6', // Lighter purple for dark mode
    
    // Neutral colors
    background: '#111827', // Deep blue-gray background
    card: '#1F2937', // Slightly lighter cards
    border: 'rgba(59, 130, 246, 0.2)', // Subtle blue borders
    
    // Accent colors
    accent1: '#F97316', // Slightly muted orange
    accent2: '#FBBF24', // Muted gold
    accent3: '#34D399', // Slightly muted mint
    
    // Text colors
    text: '#F1F5F9', // Off-white for primary text
    textSecondary: '#CBD5E1', // Light gray for secondary text
    textMuted: '#94A3B8', // Medium gray for tertiary text
    
    // Functional colors
    success: '#10B981', // Same success color
    warning: '#F59E0B', // Same warning color
    error: '#EF4444', // Same error color
    info: '#3B82F6', // Same info color
  },
  
  // Semantic colors that automatically adjust based on color mode
  // These are the colors we'll use in components
  brand: {
    primary: { light: '#2563EB', dark: '#3B82F6' },
    primaryAlt: { light: '#4F46E5', dark: '#6366F1' },
    secondary: { light: '#6B46C1', dark: '#8B5CF6' },
    background: { light: '#F7F9FC', dark: '#111827' },
    card: { light: '#FFFFFF', dark: '#1F2937' },
    border: { light: 'rgba(0, 98, 255, 0.12)', dark: 'rgba(59, 130, 246, 0.2)' },
    accent1: { light: '#FF6B35', dark: '#F97316' },
    accent2: { light: '#FFD166', dark: '#FBBF24' },
    accent3: { light: '#06D6A0', dark: '#34D399' },
    text: { light: '#1A365D', dark: '#F1F5F9' },
    textSecondary: { light: '#4A5568', dark: '#CBD5E1' },
    textMuted: { light: '#718096', dark: '#94A3B8' },
    success: { light: '#10B981', dark: '#10B981' },
    warning: { light: '#F59E0B', dark: '#F59E0B' },
    error: { light: '#EF4444', dark: '#EF4444' },
    info: { light: '#3B82F6', dark: '#3B82F6' },
  },
  
  // Gradients
  gradients: {
    primary: { 
      // Rich blue to deep indigo - more sophisticated and premium
      light: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
      dark: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)'
    },
    accent: {
      // Vibrant coral to warm amber - energetic but refined
      light: 'linear-gradient(135deg, #F43F5E 0%, #F59E0B 100%)',
      dark: 'linear-gradient(135deg, #E11D48 0%, #FBBF24 100%)'
    },
    glass: {
      light: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
      dark: 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)'
    },
    // Additional gradient options
    royal: {
      // Deep blue to purple - elegant and luxurious
      light: 'linear-gradient(135deg, #1E40AF 0%, #7E22CE 100%)',
      dark: 'linear-gradient(135deg, #2563EB 0%, #9333EA 100%)'
    },
    sunset: {
      // Sunset inspired - warm and inviting
      light: 'linear-gradient(135deg, #DB2777 0%, #F59E0B 100%)',
      dark: 'linear-gradient(135deg, #BE185D 0%, #D97706 100%)'
    }
  },
};

// Font configuration
const fonts = {
  heading: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"JetBrains Mono", SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

// Blur effect for glass morphism
const blur = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
};

// Border radius tokens
const radii = {
  none: '0',
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// Component style overrides
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'md',
    },
    variants: {
      primary: {
        bgGradient: 'gradients.primary',
        color: 'white',
        _hover: {
          bgGradient: 'linear-gradient(90deg, #1F9D77 0%, #2259A8 100%)',
          _disabled: {
            bgGradient: 'gradients.primary',
          },
        },
      },
      secondary: {
        bg: 'white',
        color: 'brand.navy',
        border: '1px solid',
        borderColor: 'brand.navy',
        _hover: {
          bg: 'gray.50',
        },
      },
      gold: {
        bg: 'brand.gold',
        color: 'white',
        _hover: {
          bg: '#E08C00',
        },
      },
      coral: {
        bg: 'brand.coral',
        color: 'white',
        _hover: {
          bg: '#EA6A10',
        },
      },
      terracotta: {
        bg: 'brand.terracotta',
        color: 'white',
        _hover: {
          bg: '#B23A0B',
        },
      },
      outline: {
        bg: 'transparent',
        color: 'brand.primary',
        border: '1px solid',
        borderColor: 'brand.primary',
        _hover: {
          bg: 'rgba(40, 104, 195, 0.05)',
        },
      },
      ghost: {
        bg: 'transparent',
        color: 'brand.navy',
        _hover: {
          bg: 'rgba(10, 39, 86, 0.05)',
        },
      },
    },
    defaultProps: {
      variant: 'primary',
    },
  },
  Heading: {
    baseStyle: {
      color: 'brand.navy',
      fontWeight: 'bold',
    },
  },
  Text: {
    baseStyle: {
      color: 'brand.text',
    },
    variants: {
      secondary: {
        color: 'brand.textLight',
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        backgroundColor: 'white',
        borderRadius: 'lg',
        boxShadow: 'md',
        overflow: 'hidden',
      },
    },
  },
  Badge: {
    variants: {
      success: {
        bg: 'brand.success',
        color: 'white',
      },
      warning: {
        bg: 'brand.warning',
        color: 'white',
      },
      error: {
        bg: 'brand.error',
        color: 'white',
      },
      info: {
        bg: 'brand.info',
        color: 'white',
      },
    },
  },
  // Simple Tab styling to prevent blinking issues
  Tabs: {
    variants: {
      line: {
        tab: {
          _selected: {
            color: 'primary',
            borderColor: 'primary',
          },
          color: 'textSecondary',
          _hover: {
            color: 'primary',
          },
        },
      },
    },
  },
};

// Theme configuration
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true, // Use system preferences by default
};

// Function to create semantic tokens that respond to color mode
const createSemanticTokens = () => {
  const tokens: Record<string, any> = { colors: {} };
  
  // Process all brand colors into semantic tokens
  Object.entries(colors.brand).forEach(([key, value]) => {
    if (typeof value === 'object' && value.light && value.dark) {
      tokens.colors[key] = {
        default: value.light,
        _dark: value.dark,
      };
    }
  });
  
  // Process all gradients into semantic tokens
  tokens.gradients = {};
  Object.entries(colors.gradients).forEach(([key, value]) => {
    if (typeof value === 'object' && value.light && value.dark) {
      tokens.gradients[key] = {
        default: value.light,
        _dark: value.dark,
      };
    }
  });
  
  return tokens;
};

// Extended theme
const theme = extendTheme({
  // Base colors
  colors: {
    light: colors.light,
    dark: colors.dark,
  },
  
  // Semantic tokens for color mode
  semanticTokens: createSemanticTokens(),
  
  fonts,
  components,
  config,
  blur,
  radii,
  
  styles: {
    global: (props: any) => ({
      body: {
        bg: 'background',
        color: 'text',
        transition: 'background-color 0.2s, color 0.2s',
      },
      // Add smooth scrolling
      html: {
        scrollBehavior: 'smooth',
      },
      // Style focus outline for accessibility
      ':focus': {
        outline: '2px solid',
        outlineColor: 'primary',
        outlineOffset: '2px',
      },
    }),
  },
  
  // Custom breakpoints
  breakpoints: {
    sm: '30em',    // 480px
    md: '48em',    // 768px
    lg: '62em',    // 992px
    xl: '80em',    // 1280px
    '2xl': '96em', // 1536px
  },
  
  // Custom shadows
  shadows: {
    outline: '0 0 0 3px rgba(0, 98, 255, 0.4)',
    glass: {
      light: '0 8px 32px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
      dark: '0 8px 32px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.15)',
    },
    soft: '0 2px 8px rgba(0, 0, 0, 0.06)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.08)',
    strong: '0 8px 24px rgba(0, 0, 0, 0.12)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    highlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  
  // Layer styles for consistent component styling
  layerStyles: {
    glass: {
      bg: 'gradients.glass',
      backdropFilter: 'blur(12px)',
      borderRadius: 'xl',
      border: '1px solid',
      borderColor: 'border',
      boxShadow: 'glass',
    },
    card: {
      bg: 'card',
      borderRadius: 'xl',
      boxShadow: 'soft',
      transition: 'box-shadow 0.2s, transform 0.2s',
      _hover: {
        boxShadow: 'medium',
        transform: 'translateY(-2px)',
      },
    },
    subtle: {
      bg: 'background',
      borderRadius: 'lg',
      border: '1px solid',
      borderColor: 'border',
    },
  },
  
  // Text styles for consistent typography
  textStyles: {
    h1: {
      fontSize: ['3xl', '4xl', '5xl'],
      fontWeight: 'bold',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: ['2xl', '3xl', '4xl'],
      fontWeight: 'semibold',
      lineHeight: '1.2',
      letterSpacing: '-0.01em',
      color: 'text',
      _light: {
        color: '#1A365D', // Deep blue for light mode
        borderBottomWidth: '0px',
        borderBottomColor: 'rgba(0, 98, 255, 0.1)',
      },
      _dark: {
        color: '#F1F5F9', // Off-white for dark mode
        borderBottomWidth: '0px',
        borderBottomColor: 'rgba(59, 130, 246, 0.1)',
      },
    },
    h3: {
      fontSize: ['xl', '2xl', '3xl'],
      fontWeight: 'semibold',
      lineHeight: '1.3',
    },
    subtitle: {
      fontSize: ['md', 'lg', 'xl'],
      fontWeight: 'medium',
      lineHeight: '1.5',
      color: 'textSecondary',
    },
    body: {
      fontSize: 'md',
      fontWeight: 'normal',
      lineHeight: '1.6',
    },
    caption: {
      fontSize: 'sm',
      fontWeight: 'normal',
      lineHeight: '1.5',
      color: 'textMuted',
    },
  },
});

export default theme;
