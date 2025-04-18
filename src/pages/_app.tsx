import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import theme from '../theme';
import '../styles/globals.css';
import '../styles/custom.css'; // Import custom CSS to force styling
import '../styles/fonts.css'; // Import our custom fonts

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>  
  );
}

export default MyApp;
