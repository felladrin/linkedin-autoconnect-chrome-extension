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
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";
import { maximumAutoConnectionsPerSessionChanged } from "../../shared/events/maximumAutoConnectionsPerSessionChanged";
import { optionsSubmitted } from "../events/optionsSubmitted";
import { maximumAutoConnectionsPerSessionStore } from "../../shared/stores/maximumAutoConnectionsPerSessionStore";
import { darkChakraTheme } from "../../shared/constants/darkChakraTheme";

export function OptionsPage() {
  const maximumAutoConnectionsPerSession = useStore(maximumAutoConnectionsPerSessionStore);

  return (
    <ChakraProvider theme={darkChakraTheme}>
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
