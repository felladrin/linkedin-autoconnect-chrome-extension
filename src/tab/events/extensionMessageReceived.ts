import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";
import { split } from "effector";
import { chromeMessageReceived } from "./chromeMessageReceived";

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
