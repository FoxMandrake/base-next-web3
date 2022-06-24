import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
