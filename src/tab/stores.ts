import { createStore, restore } from "effector";
import { ExtensionMessage } from "../shared/enums/ExtensionMessage";
import { extensionMessageReceived, lastLocationUpdated, navigatedToAnUnexpectedPageWhileRunning } from "./events";

export const isRunningStore = createStore(false)
  .on(extensionMessageReceived[ExtensionMessage.StartAutoConnect], () => true)
  .reset([
    extensionMessageReceived[ExtensionMessage.StopAutoConnect],
    navigatedToAnUnexpectedPageWhileRunning,
  ]);

export const lastLocationStore = restore(lastLocationUpdated, "");
