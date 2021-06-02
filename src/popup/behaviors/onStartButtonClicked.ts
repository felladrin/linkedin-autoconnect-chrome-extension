import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";
import { autoConnectionStatusRequested } from "../events/autoConnectionStatusRequested";
import { startButtonClicked } from "../events/startButtonClicked";
import { getActiveTab } from "../functions/getActiveTab";

startButtonClicked.watch(async () => {
  const { id: activeTabId } = await getActiveTab();

  if (!activeTabId) return;

  chrome.tabs.sendMessage(
    activeTabId,
    ExtensionMessage.IsAutoConnectAvailable,
    (isAvailable: boolean) => {
      if (!isAvailable) {
        alert("Error: Extension was not able to access the LinkedIn Page.");
        return;
      }

      chrome.tabs.sendMessage(activeTabId, ExtensionMessage.StartAutoConnect);
      autoConnectionStatusRequested();
    }
  );
});
