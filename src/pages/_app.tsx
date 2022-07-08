import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import "@talisman-connect/components/talisman-connect-components.esm.css";
import "@talisman-connect/ui/talisman-connect-ui.esm.css";
import { SubsocialApiProvider } from "../common/providers/SubsocialApiProvider";
import theme from "../common/utils/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SubsocialApiProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </ChakraProvider>
    </SubsocialApiProvider>
  );
}

export default MyApp;
