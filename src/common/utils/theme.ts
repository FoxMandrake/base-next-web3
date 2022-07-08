import { theme as baseTheme, extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      "html, body": {
        color: "text",
        background: "gray.100",
        lineHeight: "tall",
      },
      ".web3modal-modal-lightbox": {
        zIindex: 9999,
      },
    },
  },
  colors: {
    background: "black",
  },
});

export default theme;
