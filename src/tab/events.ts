import { createEvent } from "effector";
import { ExtensionMessage } from "../shared/enums/ExtensionMessage";
import { split } from "effector";

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

export const lastLocationUpdated = createEvent<string>();

export const navigatedToAnUnexpectedPageWhileRunning = createEvent();

export const oneSecondIntervalTicked = createEvent();
