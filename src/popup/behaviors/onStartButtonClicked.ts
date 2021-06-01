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
    (response) => {
      if (!response) {
        chrome.scripting.executeScript(
          { files: ["tab/tab.es.js"], target: { tabId: activeTabId } },
          () => {
            chrome.tabs.sendMessage(
              activeTabId,
              ExtensionMessage.StartAutoConnect
            );
            autoConnectionStatusRequested();
          }
        );
      } else {
        chrome.tabs.sendMessage(activeTabId, ExtensionMessage.StartAutoConnect);
        autoConnectionStatusRequested();
      }
    }
  );
});
