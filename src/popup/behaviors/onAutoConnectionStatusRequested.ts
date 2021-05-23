import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";
import { sample } from "effector";
import {
  autoConnectionStarted,
  autoConnectionStopped,
  autoConnectionStatusRequested,
} from "../events";
import { activeTabIdStore } from "../stores";

sample({
  clock: autoConnectionStatusRequested,
  source: activeTabIdStore,
}).watch((activeTabId) => {
  chrome.tabs.sendMessage(
    activeTabId,
    ExtensionMessage.IsAutoConnectRunning,
    (isRunning: boolean) =>
      isRunning ? autoConnectionStarted() : autoConnectionStopped()
  );
});
