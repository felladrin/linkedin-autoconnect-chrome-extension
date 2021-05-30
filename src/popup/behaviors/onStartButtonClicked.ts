import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";
import { autoConnectionStatusRequested } from "../events/autoConnectionStatusRequested";
import { startButtonClicked } from "../events/startButtonClicked";

startButtonClicked.watch(() => {
  chrome.tabs.query({ active: true }, ([activeTab]) => {
    if (!activeTab.id) return;

    const activeTabId = activeTab.id;

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
          chrome.tabs.sendMessage(
            activeTabId,
            ExtensionMessage.StartAutoConnect
          );
          autoConnectionStatusRequested();
        }
      }
    );
  });
});
