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
import { createPubSub } from "create-pubsub";
import { usePubSub } from "create-pubsub/react";
import { render } from "react-dom";
import { MdPeople, MdSearch, MdSettings } from "react-icons/md";
import {
  LinkedInUrl,
  MessageId,
  darkChakraTheme,
  emitChromePortConnected,
  getChromePort,
  loadOptions,
  maximumAutoConnectionsPerSessionStorePubSub,
  onChromePortConnected,
  onChromePortMessageReceived,
  postChromePortMessage,
  startListeningToChromePortMessages,
} from "./shared";

const [emitPopupOpened, onPopupOpened] = createPubSub();
const [emitStartButtonClicked, onStartButtonClicked] = createPubSub();
const [emitStopButtonClicked, onStopButtonClicked] = createPubSub();
const buttonClicksCountStorePubSub = createPubSub(0);
const [emitButtonClicksCountUpdated] = buttonClicksCountStorePubSub;
const isAutoConnectionRunningPubSub = createPubSub(false);
const [emitIsAutoConnectionRunning] = isAutoConnectionRunningPubSub;
const isActiveTabConnectedPubSub = createPubSub(false);
const [emitIsActiveTabConnected] = isActiveTabConnectedPubSub;

async function connectToActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.id) {
    const port = chrome.tabs.connect(tab.id);
    emitChromePortConnected(port);
  }
}

function openMyNetworkPage() {
  chrome.tabs.create({ url: LinkedInUrl.MyNetworkPage });
}

function openOptionsPage() {
  chrome.runtime.openOptionsPage();
}

function openSearchPeoplePage() {
  chrome.tabs.create({ url: LinkedInUrl.SearchPeoplePage });
}

function renderPopup() {
  render(<Popup />, document.body.appendChild(document.createElement("div")));
}

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
  const [isActiveTabConnected] = usePubSub(isActiveTabConnectedPubSub);

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
  const [isAutoConnectionRunning] = usePubSub(isAutoConnectionRunningPubSub);
  const [buttonClicksCount] = usePubSub(buttonClicksCountStorePubSub);
  const [maximumAutoConnectionsPerSession] = usePubSub(maximumAutoConnectionsPerSessionStorePubSub);

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
          onClick={() => (isAutoConnectionRunning ? emitStopButtonClicked() : emitStartButtonClicked())}
          width="full"
        >
          {isAutoConnectionRunning ? "STOP" : "START"} CONNECTING
        </Button>
      </Box>
    </VStack>
  );
}

onChromePortConnected(startListeningToChromePortMessages);

onChromePortMessageReceived(({ message }) => {
  switch (message.id) {
    case MessageId.ConnectionEstablished:
      return emitIsActiveTabConnected(true);
    case MessageId.RunningStateUpdated:
      return emitIsAutoConnectionRunning(message.content);
    case MessageId.ButtonClicksCountUpdated:
      return emitButtonClicksCountUpdated(message.content);
  }
});

onStartButtonClicked(() => {
  const port = getChromePort();
  if (port) {
    postChromePortMessage({ message: { id: MessageId.StartAutoConnect }, port });
    emitIsAutoConnectionRunning(true);
  }
});

onStopButtonClicked(() => {
  const port = getChromePort();
  if (port) {
    postChromePortMessage({ message: { id: MessageId.StopAutoConnect }, port });
    emitIsAutoConnectionRunning(false);
  }
});

onPopupOpened(async () => {
  await loadOptions();
  await connectToActiveTab();
  renderPopup();
});

emitPopupOpened();
