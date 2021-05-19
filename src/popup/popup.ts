import { ExtensionMessage } from "../shared/enums/ExtensionMessage";
import { LinkedInUrl } from "../shared/enums/LinkedInUrl";
import { state } from "./constants/state";
import { showStartButtonAndHideStopButton } from "./functions/showStartButtonAndHideStopButton";
import { showStopButtonAndHideStartButton } from "./functions/showStopButtonAndHideStartButton";
import { hideStartAndStopButtons } from "./functions/hideStartAndStopButtons";
import { hideAllMessages } from "./functions/hideAllMessages";
import { showSearchPeopleMessage } from "./functions/showSearchPeopleMessage";
import { showRecommendedForYouMessage } from "./functions/showRecommendedForYouMessage";
import { showSelectOptionMessage } from "./functions/showSelectOptionMessage";

state.startButton?.addEventListener("click", () => {
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
            showStopButtonAndHideStartButton();
          });
        } else {
          chrome.tabs.sendMessage(
            activeTabId,
            ExtensionMessage.StartAutoConnect
          );
          showStopButtonAndHideStartButton();
        }
      }
    );
  });
});

state.stopButton?.addEventListener("click", () => {
  chrome.tabs.query({ active: true }, ([activeTab]) => {
    if (!activeTab.id) return;
    chrome.tabs.sendMessage(activeTab.id, ExtensionMessage.StopAutoConnect);
    showStartButtonAndHideStopButton();
  });
});

state.openLinkedInSearchPage?.addEventListener("click", () => {
  chrome.tabs.update({ url: LinkedInUrl.SearchPeoplePage });
});

state.openLinkedInRecommendedForYouPage?.addEventListener("click", () => {
  chrome.tabs.update({ url: LinkedInUrl.MyNetworkPage });
});

chrome.tabs.query({ active: true }, function updatePopupContent([activeTab]) {
  if (!activeTab.id) return;

  const isOnSearchPage =
    activeTab.url?.includes(LinkedInUrl.PatternOfSearchPage) ?? false;
  const isOnRecommendedForYouPage =
    activeTab.url?.includes(LinkedInUrl.PatternOfMyNetworkPage) ?? false;

  hideAllMessages();

  if (isOnSearchPage) {
    showSearchPeopleMessage();
  } else if (isOnRecommendedForYouPage) {
    showRecommendedForYouMessage();
  } else {
    showSelectOptionMessage();
    hideStartAndStopButtons();
  }

  if (isOnSearchPage || isOnRecommendedForYouPage) {
    chrome.tabs.sendMessage(
      activeTab.id,
      ExtensionMessage.IsAutoConnectRunning,
      (response) => {
        if (!response) {
          showStartButtonAndHideStopButton();
        } else {
          showStopButtonAndHideStartButton();
        }
      }
    );
  }

  chrome.tabs.onUpdated.addListener(function handleTabUpdated(
    _,
    __,
    updatedTab
  ) {
    if (updatedTab.id !== activeTab.id) return;
    updatePopupContent([updatedTab]);
    chrome.tabs.onUpdated.removeListener(handleTabUpdated);
  });
});
