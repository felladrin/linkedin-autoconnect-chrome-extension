import { createEvent } from "effector";
import { ExtensionMessage } from "../shared/enums/ExtensionMessage";
import { split } from "effector";
import { LinkedInUrl } from "../shared/enums/LinkedInUrl";

export const chromeMessageReceived =
  createEvent<{
    message: ExtensionMessage;
    sender: chrome.runtime.MessageSender;
    sendResponse: (response?: any) => void;
  }>();

export const extensionMessageReceived = split(chromeMessageReceived, {
  [ExtensionMessage.IsAutoConnectAvailable]: ({ message }) =>
    message === ExtensionMessage.IsAutoConnectAvailable,
  [ExtensionMessage.IsAutoConnectRunning]: ({ message }) =>
    message === ExtensionMessage.IsAutoConnectRunning,
  [ExtensionMessage.StartAutoConnect]: ({ message }) =>
    message === ExtensionMessage.StartAutoConnect,
  [ExtensionMessage.StopAutoConnect]: ({ message }) =>
    message === ExtensionMessage.StopAutoConnect,
});

export const windowLocationUpdated = createEvent<string>();

export const {
  searchPageLoaded,
  myNetworkPageLoaded,
  __: unexpectedPageLoaded,
} = split(windowLocationUpdated, {
  searchPageLoaded: (windowLocation) =>
    windowLocation.includes(LinkedInUrl.PatternOfSearchPage),
  myNetworkPageLoaded: (windowLocation) =>
    windowLocation.includes(LinkedInUrl.PatternOfMyNetworkPage),
});

export const oneSecondIntervalTicked = createEvent();
