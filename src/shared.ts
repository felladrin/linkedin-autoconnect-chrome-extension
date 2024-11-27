import { extendTheme } from "@chakra-ui/react";
import { createPubSub } from "create-pubsub";

export const [emitChromePortMessageReceived, onChromePortMessageReceived] = createPubSub<ChromePortMessage>();
export const [emitChromePortConnected, onChromePortConnected, getChromePort] = createPubSub<chrome.runtime.Port>();
export const maximumAutoConnectionsPerSessionStorePubSub = createPubSub("100");
export const [emitMaximumAutoConnectionsPerSessionChanged, , getMaximumAutoConnectionsPerSession] =
  maximumAutoConnectionsPerSessionStorePubSub;

export interface Message {
  id: MessageId;
  content?: any;
}

export interface ChromePortMessage {
  message: Message;
  port: chrome.runtime.Port;
}

export enum LinkedInCssSelector {
  NextPageButton = "button.artdeco-pagination__button--next",
  ConnectButtonFromMyNetworkPage = "div.discover-entity-type-card__bottom-container button.ember-view:enabled:not(.artdeco-button--muted):not(.artdeco-button--full)",
  ConnectButtonFromSearchPage = "div.search-results-container div > button.ember-view:enabled:not(.artdeco-button--muted)",
  SendButtonFromSendInviteModal = "div.send-invite button.artdeco-button--primary",
}

export enum LinkedInPage {
  Unidentified,
  SearchPeople,
  MyNetwork,
}

export enum LinkedInUrl {
  SearchPeoplePage = "https://www.linkedin.com/search/results/people/",
  MyNetworkPage = "https://www.linkedin.com/mynetwork/",
  PatternOfSearchPage = "linkedin.com/search/results/people",
  PatternOfMyNetworkPage = "linkedin.com/mynetwork",
}

export enum MessageId {
  ConnectionEstablished,
  RunningStateUpdated,
  ButtonClicksCountUpdated,
  StartAutoConnect,
  StopAutoConnect,
}

export function delay(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

export async function loadOptions() {
  const options = { maximumAutoConnectionsPerSession: getMaximumAutoConnectionsPerSession() };
  const { maximumAutoConnectionsPerSession } = await new Promise<typeof options>((resolve) => {
    chrome.storage.sync.get(options, (items) => resolve(items as typeof options));
  });
  emitMaximumAutoConnectionsPerSessionChanged(maximumAutoConnectionsPerSession);
}

export function postChromePortMessage(chromePortMessage: ChromePortMessage) {
  const { message, port } = chromePortMessage;
  port.postMessage(message);
}

export function startListeningToChromePortMessages(port: chrome.runtime.Port) {
  port.onMessage.addListener((message) => {
    emitChromePortMessageReceived({ message, port });
  });
}

export const darkChakraTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});
