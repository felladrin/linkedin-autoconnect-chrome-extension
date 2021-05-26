import { createStore, restore } from "effector";
import { ExtensionMessage } from "../shared/enums/ExtensionMessage";
import {
  extensionMessageReceived,
  windowLocationUpdated,
  unexpectedPageLoaded,
} from "./events";

export const isRunningStore = createStore(false)
  .on(extensionMessageReceived[ExtensionMessage.StartAutoConnect], () => true)
  .reset([
    extensionMessageReceived[ExtensionMessage.StopAutoConnect],
    unexpectedPageLoaded,
  ]);

export const lastWindowLocationStore = restore(windowLocationUpdated, "");
