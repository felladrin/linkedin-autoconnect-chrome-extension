import React from "react";
import { StartStopButton } from "./StartStopButton";
import { PageSelection } from "./PageSelection";
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { darkChakraTheme } from "../../shared/constants/darkChakraTheme";

export function Popup() {
  return (
    <ChakraProvider theme={darkChakraTheme}>
      <Flex
        paddingX={5}
        paddingY={2}
        backgroundColor="gray.700"
        align="center"
        width="260px"
      >
        <Box>
          <Heading size="sm">LinkedIn AutoConnect</Heading>
        </Box>
        <Spacer />
        <Box>
          <Button size="sm" onClick={() => chrome.runtime.openOptionsPage()}>
            <MdSettings />
          </Button>
        </Box>
      </Flex>
      <Container padding="5">
        <PageSelection />
        <StartStopButton />
      </Container>
    </ChakraProvider>
  );
}
