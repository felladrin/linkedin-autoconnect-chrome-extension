import { extendTheme } from "@chakra-ui/react";

export const darkChakraTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});
