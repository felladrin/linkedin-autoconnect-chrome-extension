import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";
import { sample } from "effector";
import { stopButtonClicked, autoConnectionStatusRequested } from "../events";
import { activeTabIdStore } from "../stores";

sample({
  clock: stopButtonClicked,
  source: activeTabIdStore,
}).watch((activeTabId) => {
  chrome.tabs.sendMessage(activeTabId, ExtensionMessage.StopAutoConnect);
  autoConnectionStatusRequested();
});
