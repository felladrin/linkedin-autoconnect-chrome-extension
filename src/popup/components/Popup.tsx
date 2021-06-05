import React from "react";
import { StartStopButton } from "./StartStopButton";
import { PageSelection } from "./PageSelection";
import { Box, Button, ChakraProvider, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { darkChakraTheme } from "../../shared/constants/darkChakraTheme";
import { useStore } from "effector-react";
import { openOptionsPage } from "../effects/openOptionsPage";
import { isActiveTabConnectedStore } from "../stores/isActiveTabConnectedStore";

export function Popup() {
  const isActiveTabConnected = useStore(isActiveTabConnectedStore);

  return (
    <ChakraProvider theme={darkChakraTheme}>
      <Flex paddingX={5} paddingY={2} backgroundColor="gray.700" align="center" width="260px">
        <Box>
          <Heading size="sm">LinkedIn AutoConnect</Heading>
        </Box>
        <Spacer />
        <Box>
          <Button size="sm" onClick={() => openOptionsPage()}>
            <MdSettings />
          </Button>
        </Box>
      </Flex>
      <Container padding="5">{isActiveTabConnected ? <StartStopButton /> : <PageSelection />}</Container>
    </ChakraProvider>
  );
}
