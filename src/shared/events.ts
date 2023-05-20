import { createEvent, split } from "effector";
import { MessageId } from "./enums";
import { ChromePortMessage } from "./interfaces";

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
