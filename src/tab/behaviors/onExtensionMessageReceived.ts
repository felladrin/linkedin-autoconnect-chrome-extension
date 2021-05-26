import { sample } from "effector";
import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";
import { extensionMessageReceived } from "../events";
import { isRunningStore } from "../stores";

extensionMessageReceived[ExtensionMessage.IsAutoConnectAvailable].watch(
  ({ sendResponse }) => sendResponse(true)
);

sample({
  clock: extensionMessageReceived[ExtensionMessage.IsAutoConnectRunning],
  source: isRunningStore,
  fn: (isRunning, message) => ({ isRunning, message }),
}).watch(({ isRunning, message }) => message.sendResponse(isRunning));
