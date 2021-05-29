import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";
import { sample } from "effector";
import { autoConnectionStatusRequested } from "../events/autoConnectionStatusRequested";
import { autoConnectionStopped } from "../events/autoConnectionStopped";
import { autoConnectionStarted } from "../events/autoConnectionStarted";
import { activeTabIdStore } from "../stores/activeTabIdStore";

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
