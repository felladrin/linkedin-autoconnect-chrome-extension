const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const searchPeopleMessage = document.getElementById("searchPeopleMessage");
const recommendedForYouMessage = document.getElementById("recommendedForYouMessage");
const selectOptionMessage = document.getElementById("selectOptionMessage");
const openLinkedInSearchPage = document.getElementById("openLinkedInSearchPage");
const openLinkedInRecommendedForYouPage = document.getElementById("openLinkedInRecommendedForYouPage");
const classHidden = "hidden";
const linkedInUrl = {
  searchPeoplePage: 'https://www.linkedin.com/search/results/people/?facetNetwork=%5B"S"%5D',
  myNetworkPage: "https://www.linkedin.com/mynetwork/",
  patternOfSearchPage: "linkedin.com/search/results/people",
  patternOfMyNetworkPage: "linkedin.com/mynetwork"
};

function showStartButtonAndHideStopButton() {
  startButton.classList.remove(classHidden);
  stopButton.classList.add(classHidden);
};

function showStopButtonAndHideStartButton() {
  stopButton.classList.remove(classHidden);
  startButton.classList.add(classHidden);
};

function hideStartAndStopButtons() {
  startButton.classList.add(classHidden);
  stopButton.classList.add(classHidden);
};

function hideAllMessages() {
  searchPeopleMessage.classList.add(classHidden);
  recommendedForYouMessage.classList.add(classHidden);
  selectOptionMessage.classList.add(classHidden);
};

function showSearchPeopleMessage() {
  searchPeopleMessage.classList.remove(classHidden);
};

function showRecommendedForYouMessage() {
  recommendedForYouMessage.classList.remove(classHidden);
};

function showSelectOptionMessage() {
  selectOptionMessage.classList.remove(classHidden);
};

startButton.addEventListener("click", () => {
  chrome.tabs.query({ active: true }, ([activeTab]) => {
    chrome.tabs.sendMessage(activeTab.id, "isAutoConnectAvailable", (response) => {
      if (!response) {
        chrome.tabs.executeScript({ file: "tab.js" }, () => {
          chrome.tabs.sendMessage(activeTab.id, "startAutoConnect");
          showStopButtonAndHideStartButton();
        });
      } else {
        chrome.tabs.sendMessage(activeTab.id, "startAutoConnect");
        showStopButtonAndHideStartButton();
      }
    });
  });
});

stopButton.addEventListener("click", () => {
  chrome.tabs.query({ active: true }, ([activeTab]) => {
    chrome.tabs.sendMessage(activeTab.id, "stopAutoConnect");
    showStartButtonAndHideStopButton();
  });
});

openLinkedInSearchPage.addEventListener("click", () => {
  chrome.tabs.update({ url: linkedInUrl.searchPeoplePage });
});

openLinkedInRecommendedForYouPage.addEventListener("click", () => {
  chrome.tabs.update({ url: linkedInUrl.myNetworkPage });
});

chrome.tabs.query({ active: true }, function updatePopupContent([activeTab]) {
  const isOnSearchPage = activeTab.url.includes(linkedInUrl.patternOfSearchPage);
  const isOnRecommendedForYouPage = activeTab.url.includes(linkedInUrl.patternOfMyNetworkPage);

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
    chrome.tabs.sendMessage(activeTab.id, "isAutoConnectRunning", (response) => {
      if (!response) {
        showStartButtonAndHideStopButton();
      } else {
        showStopButtonAndHideStartButton();
      }
    });
  }

  chrome.tabs.onUpdated.addListener(function handleTabUpdated({ }, { }, updatedTab) {
    if (updatedTab.id !== activeTab.id) return;
    updatePopupContent([updatedTab]);
    chrome.tabs.onUpdated.removeListener(handleTabUpdated);
  });
});
