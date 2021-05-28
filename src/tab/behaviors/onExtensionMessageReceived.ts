import { sample } from "effector";
import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";
import { extensionMessageReceived } from "../events/extensionMessageReceived";
import { started } from "../events/started";
import { stopped } from "../events/stopped";
import { isRunningStore } from "../stores/isRunningStore";

extensionMessageReceived[ExtensionMessage.IsAutoConnectAvailable].watch(
  ({ sendResponse }) => sendResponse(true)
);

sample({
  clock: extensionMessageReceived[ExtensionMessage.IsAutoConnectRunning],
  source: isRunningStore,
  fn: (isRunning, message) => ({ isRunning, message }),
}).watch(({ isRunning, message }) => message.sendResponse(isRunning));

extensionMessageReceived[ExtensionMessage.StartAutoConnect].watch(() =>
  started()
);

extensionMessageReceived[ExtensionMessage.StopAutoConnect].watch(() =>
  stopped()
);
