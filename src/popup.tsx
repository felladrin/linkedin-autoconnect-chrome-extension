import {
  Box,
  Button,
  ChakraProvider,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { combine, createEffect, createEvent, createStore, forward, guard, restore, sample } from "effector";
import { useStore } from "effector-react";
import { render } from "react-dom";
import { MdPeople, MdSearch, MdSettings } from "react-icons/md";
import {
  ChromePortMessage,
  LinkedInUrl,
  Message,
  MessageId,
  chromePortConnected,
  chromePortStore,
  darkChakraTheme,
  extensionMessageReceived,
  loadOptions,
  maximumAutoConnectionsPerSessionStore,
  postChromePortMessage,
  startListeningToChromePortMessages,
} from "./shared";

function PageSelection() {
  return (
    <List spacing={3}>
      <ListItem>
        <Button onClick={() => openMyNetworkPage()} leftIcon={<MdPeople />} width="full">
          People You May Know
        </Button>
      </ListItem>
      <ListItem>
        <Button onClick={() => openSearchPeoplePage()} leftIcon={<MdSearch />} width="full">
          Search People
        </Button>
      </ListItem>
    </List>
  );
}

function Popup() {
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

function StartStopButton() {
  const isAutoConnectionRunning = useStore(isAutoConnectionRunningStore);
  const buttonClicksCount = useStore(buttonClicksCountStore);
  const maximumAutoConnectionsPerSession = useStore(maximumAutoConnectionsPerSessionStore);

  return (
    <VStack spacing="3">
      <Box>
        <Text fontSize="18px">Invitations Sent</Text>
      </Box>
      <Box>
        <CircularProgress
          value={(buttonClicksCount / Number(maximumAutoConnectionsPerSession)) * 100}
          color="green.400"
          size="100px"
        >
          <CircularProgressLabel>{buttonClicksCount}</CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box>
        <Button
          colorScheme={isAutoConnectionRunning ? "red" : "green"}
          onClick={() => (isAutoConnectionRunning ? stopButtonClicked() : startButtonClicked())}
          width="full"
        >
          {isAutoConnectionRunning ? "STOP" : "START"} CONNECTING
        </Button>
      </Box>
    </VStack>
  );
}

const connectToActiveTab = createEffect((activeTabId: number) => chrome.tabs.connect(activeTabId));

const getActiveTab = createEffect(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
});

const openMyNetworkPage = createEffect(() => {
  chrome.tabs.create({ url: LinkedInUrl.MyNetworkPage });
});

const openOptionsPage = createEffect(() => {
  chrome.runtime.openOptionsPage();
});

const openSearchPeoplePage = createEffect(() => {
  chrome.tabs.create({ url: LinkedInUrl.SearchPeoplePage });
});

const renderPopup = createEffect(() => {
  render(<Popup />, document.body.appendChild(document.createElement("div")));
});

const activeTabConnected = createEvent();

const activeTabInfoReceived = getActiveTab.doneData;

const activeTabIdUpdated = guard(activeTabInfoReceived, { filter: ({ id }) => id !== undefined }).map(
  ({ id }) => id as number
);

const buttonClicksCountUpdated = createEvent<number>();

const popupOpened = createEvent();

const runningStateUpdated = createEvent<boolean>();

const startButtonClicked = createEvent();

const stopButtonClicked = createEvent();

const activeTabIdStore = restore(activeTabIdUpdated, 0);

const buttonClicksCountStore = restore(buttonClicksCountUpdated, 0);

const isAutoConnectionRunningStore = restore(runningStateUpdated, false);

const isActiveTabConnectedStore = createStore(false).on(activeTabConnected, () => true);

forward({
  from: activeTabIdStore.updates,
  to: connectToActiveTab,
});

forward({
  from: chromePortConnected,
  to: startListeningToChromePortMessages,
});

forward({
  from: connectToActiveTab.doneData,
  to: chromePortConnected,
});

sample({
  clock: extensionMessageReceived[MessageId.ConnectionEstablished],
  target: activeTabConnected,
});

forward({
  from: extensionMessageReceived[MessageId.RunningStateUpdated].map(({ message }) => message.content),
  to: runningStateUpdated,
});

forward({
  from: extensionMessageReceived[MessageId.ButtonClicksCountUpdated].map(({ message }) => message.content),
  to: buttonClicksCountUpdated,
});

forward({
  from: popupOpened,
  to: [renderPopup, getActiveTab],
});

sample({
  clock: popupOpened,
  source: combine({
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  target: loadOptions,
});

guard({
  clock: sample({
    clock: startButtonClicked,
    source: chromePortStore,
    fn: (chromePort) => ({
      message: { id: MessageId.StartAutoConnect } as Message,
      port: chromePort,
    }),
  }),
  filter: (payload): payload is ChromePortMessage => payload.port !== null,
  target: postChromePortMessage,
});

guard({
  clock: sample({
    clock: stopButtonClicked,
    source: chromePortStore,
    fn: (chromePort) => ({
      message: { id: MessageId.StopAutoConnect } as Message,
      port: chromePort,
    }),
  }),
  filter: (payload): payload is ChromePortMessage => payload.port !== null,
  target: postChromePortMessage,
});

popupOpened();
