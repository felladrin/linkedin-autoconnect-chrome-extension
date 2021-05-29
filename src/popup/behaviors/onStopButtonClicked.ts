import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";
import { sample } from "effector";
import { autoConnectionStatusRequested } from "../events/autoConnectionStatusRequested";
import { stopButtonClicked } from "../events/stopButtonClicked";
import { activeTabIdStore } from "../stores/activeTabIdStore";

sample({
  clock: stopButtonClicked,
  source: activeTabIdStore,
}).watch((activeTabId) => {
  chrome.tabs.sendMessage(activeTabId, ExtensionMessage.StopAutoConnect);
  autoConnectionStatusRequested();
});
