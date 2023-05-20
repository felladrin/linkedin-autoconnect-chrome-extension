import { extendTheme } from "@chakra-ui/react";
import { createEffect, createEvent, restore, sample, split } from "effector";

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
  ConnectButtonFromSearchPage = "li.reusable-search__result-container div.entity-result__actions > div > button.ember-view:enabled:not(.artdeco-button--muted)",
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

export const chromePortConnected = createEvent<chrome.runtime.Port>();

export const chromePortMessageReceived = createEvent<ChromePortMessage>();

export const extensionMessageReceived = split(chromePortMessageReceived, {
  [MessageId.ConnectionEstablished]: ({ message }) => message.id === MessageId.ConnectionEstablished,
  [MessageId.RunningStateUpdated]: ({ message }) => message.id === MessageId.RunningStateUpdated,
  [MessageId.ButtonClicksCountUpdated]: ({ message }) => message.id === MessageId.ButtonClicksCountUpdated,
  [MessageId.StartAutoConnect]: ({ message }) => message.id === MessageId.StartAutoConnect,
  [MessageId.StopAutoConnect]: ({ message }) => message.id === MessageId.StopAutoConnect,
});

export const maximumAutoConnectionsPerSessionChanged = createEvent<string>();

export const delay = createEffect(
  (milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds))
);

export const loadOptions = createEffect(
  (options: { maximumAutoConnectionsPerSession: string }) =>
    new Promise<typeof options>((resolve) => {
      chrome.storage.sync.get(options, (items) => resolve(items as typeof options));
    })
);

export const postChromePortMessage = createEffect((chromePortMessage: ChromePortMessage) => {
  const { message, port } = chromePortMessage;
  port.postMessage(message);
});

export const startListeningToChromePortMessages = createEffect((port: chrome.runtime.Port) => {
  port.onMessage.addListener((message) => {
    chromePortMessageReceived({ message, port });
  });
});

export const darkChakraTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});

export const chromePortStore = restore(chromePortConnected, null);

export const maximumAutoConnectionsPerSessionStore = restore(maximumAutoConnectionsPerSessionChanged, "100");

sample({
  clock: loadOptions.doneData,
  fn: ({ maximumAutoConnectionsPerSession }) => maximumAutoConnectionsPerSession,
  target: maximumAutoConnectionsPerSessionChanged,
});
