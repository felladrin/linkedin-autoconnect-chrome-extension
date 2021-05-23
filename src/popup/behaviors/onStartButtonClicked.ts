import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";
import { startButtonClicked, autoConnectionStatusRequested } from "../events";

startButtonClicked.watch(() => {
  chrome.tabs.query({ active: true }, ([activeTab]) => {
    if (!activeTab.id) return;

    const activeTabId = activeTab.id;

    chrome.tabs.sendMessage(
      activeTabId,
      ExtensionMessage.IsAutoConnectAvailable,
      (response) => {
        if (!response) {
          chrome.tabs.executeScript({ file: "tab/tab.js" }, () => {
            chrome.tabs.sendMessage(
              activeTabId,
              ExtensionMessage.StartAutoConnect
            );
            autoConnectionStatusRequested();
          });
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
