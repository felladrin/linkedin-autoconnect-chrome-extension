import {
  Box,
  Button,
  ChakraProvider,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  createStandaloneToast,
} from "@chakra-ui/react";
import { combine, createEffect, createEvent, forward, sample } from "effector";
import { useStore } from "effector-react";
import React from "react";
import { render } from "react-dom";
import { darkChakraTheme } from "../shared/constants/darkChakraTheme";
import { loadOptions } from "../shared/effects/loadOptions";
import { maximumAutoConnectionsPerSessionChanged } from "../shared/events/maximumAutoConnectionsPerSessionChanged";
import { maximumAutoConnectionsPerSessionStore } from "../shared/stores/maximumAutoConnectionsPerSessionStore";

const optionsSubmitted = createEvent();

const optionsPageOpened = createEvent();

const saveOptions = createEffect(
  (options: { maximumAutoConnectionsPerSession: string }) =>
    new Promise<void>((resolve) => {
      chrome.storage.sync.set(options, resolve);
    })
);

function OptionsPage() {
  const maximumAutoConnectionsPerSession = useStore(maximumAutoConnectionsPerSessionStore);
  ToastContainer;
  return (
    <ChakraProvider theme={darkChakraTheme}>
      <ToastContainer />
      <Container backgroundColor="gray.700" padding="5" borderRadius="md" marginY="5">
        <VStack spacing={4} align="stretch">
          <Box>
            <Heading as="h1" size="md">
              LinkedIn AutoConnect Options
            </Heading>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Maximum auto-connections per session</FormLabel>
              <NumberInput value={maximumAutoConnectionsPerSession} onChange={maximumAutoConnectionsPerSessionChanged}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>Automatically stops connecting after reaching this value.</FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <Button colorScheme="blue" onClick={() => optionsSubmitted()}>
              Save Options
            </Button>
          </Box>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

const renderOptionsPage = createEffect(() =>
  render(React.createElement(OptionsPage), document.body.appendChild(document.createElement("div")))
);

const { ToastContainer, toast } = createStandaloneToast();

const displayOptionsSavedToast = createEffect(() =>
  toast({
    position: "top",
    title: "Options saved!",
    status: "success",
    duration: 2000,
    isClosable: true,
  })
);

forward({
  from: saveOptions.doneData,
  to: displayOptionsSavedToast,
});

sample({
  clock: optionsSubmitted,
  source: combine({
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  target: saveOptions,
});

forward({
  from: optionsPageOpened,
  to: renderOptionsPage,
});

sample({
  clock: optionsPageOpened,
  source: combine({
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  target: loadOptions,
});

optionsPageOpened();
