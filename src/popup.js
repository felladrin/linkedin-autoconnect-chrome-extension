document.addEventListener("DOMContentLoaded", function() {
  var onTabInfoIsLoaded = function(tab) {
    var startButton = document.getElementById("startButton");
    var stopButton = document.getElementById("stopButton");
    var locationInfo = document.getElementById("locationInfo");

    var strContains = function(string, substring) {
      if (!string || !substring) return false;

      return string.indexOf(substring) !== -1;
    };

    var isOnSearchPage = function() {
      return strContains(tab.url, "linkedin.com/search/results/people");
    };

    var isOnRecommendedForYouPage = function() {
      return strContains(tab.url, "linkedin.com/mynetwork");
    };

    var openUrlOnCurrentTab = function(url) {
      chrome.tabs.update({ url: url }, onTabInfoIsLoaded);
    };

    var executeScriptOnCurrentTab = function() {
      chrome.tabs.executeScript({
        file: "tab.js"
      });
    };

    var onTabUpdated = function(tabId, changeInfo, tab) {
      if (changeInfo.status === "loading") {
        onTabInfoIsLoaded(tab);
        if (isOnSearchPage() || isOnRecommendedForYouPage()) {
          executeScriptOnCurrentTab();
          startButton.style.display = "none";
          stopButton.style.display = "block";
        }
      }
    };

    var onClickStartButton = function() {
      startButton.style.display = "none";
      stopButton.style.display = "block";
      executeScriptOnCurrentTab();
      chrome.tabs.onUpdated.addListener(onTabUpdated);
    };

    var onClickStopButton = function() {
      startButton.style.display = "block";
      stopButton.style.display = "none";
      chrome.tabs.onUpdated.removeListener(onTabUpdated);
      chrome.tabs.executeScript({
        code: "running = false"
      });
    };

    if (isOnSearchPage()) {
      locationInfo.innerHTML = "You're on 'Search People' page!";
      startButton.style.display = "block";
    } else if (isOnRecommendedForYouPage()) {
      locationInfo.innerHTML = "You're on 'Recommended For You' page!";
      startButton.style.display = "block";
    } else {
      locationInfo.innerHTML =
        "<p>Select one of the following<br/>LinkedIn Pages to open:</p>" +
        '<div><button id="openLinkedInSearchPage"><span>Search<br/>People</span></button></div>' +
        '<div><button id="openLinkedInRecommendedForYouPage"><span>Recommended For You</span></button></div>';
      startButton.style.display = "none";
      document
        .getElementById("openLinkedInSearchPage")
        .addEventListener("click", function() {
          openUrlOnCurrentTab(
            'https://www.linkedin.com/search/results/people/?facetNetwork=%5B"S"%5D'
          );
        });
      document
        .getElementById("openLinkedInRecommendedForYouPage")
        .addEventListener("click", function() {
          openUrlOnCurrentTab("https://www.linkedin.com/mynetwork/");
        });
    }

    stopButton.style.display = "none";
    startButton.addEventListener("click", onClickStartButton);
    stopButton.addEventListener("click", onClickStopButton);
    chrome.tabs.executeScript({
      code: "running = false"
    });
  };

  chrome.tabs.getSelected(onTabInfoIsLoaded);
});
