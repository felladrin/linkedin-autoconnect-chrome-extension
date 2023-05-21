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
import { createPubSub } from "create-pubsub";
import { usePubSub } from "create-pubsub/react";
import { render } from "react-dom";
import {
  darkChakraTheme,
  getMaximumAutoConnectionsPerSession,
  loadOptions,
  maximumAutoConnectionsPerSessionStorePubSub,
} from "./shared";

const [emitOptionsSubmitted, onOptionsSubmitted] = createPubSub();
const { ToastContainer, toast } = createStandaloneToast();

function displayOptionsSavedToast() {
  return toast({
    position: "top",
    title: "Options saved!",
    status: "success",
    duration: 2000,
    isClosable: true,
  });
}

async function saveOptions(options: { maximumAutoConnectionsPerSession: string }) {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.set(options, resolve);
  });
}

function OptionsPage() {
  const [maximumAutoConnectionsPerSession, setMaximumAutoConnectionsPerSession] = usePubSub(
    maximumAutoConnectionsPerSessionStorePubSub
  );

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
              <NumberInput value={maximumAutoConnectionsPerSession} onChange={setMaximumAutoConnectionsPerSession}>
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
            <Button colorScheme="blue" onClick={() => emitOptionsSubmitted()}>
              Save Options
            </Button>
          </Box>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

(async () => {
  onOptionsSubmitted(async () => {
    await saveOptions({ maximumAutoConnectionsPerSession: getMaximumAutoConnectionsPerSession() });
    displayOptionsSavedToast();
  });

  await loadOptions();

  render(<OptionsPage />, document.body.appendChild(document.createElement("div")));
})();
