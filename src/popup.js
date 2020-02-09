document.addEventListener("DOMContentLoaded", () => {
  const onTabInfoIsLoaded = ({ url }) => {
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const locationInfo = document.getElementById("locationInfo");

    const strContains = (string, substring) => {
      if (!string || !substring) return false;

      return string.includes(substring);
    };

    const isOnSearchPage = () =>
      strContains(url, "linkedin.com/search/results/people");

    const isOnRecommendedForYouPage = () =>
      strContains(url, "linkedin.com/mynetwork");

    const openUrlOnCurrentTab = url => {
      chrome.tabs.update({ url }, onTabInfoIsLoaded);
    };

    const executeScriptOnCurrentTab = () => {
      chrome.tabs.executeScript({
        file: "tab.js"
      });
    };

    const onTabUpdated = (tabId, { status }, tab) => {
      if (status === "loading") {
        onTabInfoIsLoaded(tab);
        if (isOnSearchPage() || isOnRecommendedForYouPage()) {
          executeScriptOnCurrentTab();
          startButton.style.display = "none";
          stopButton.style.display = "block";
        }
      }
    };

    const onClickStartButton = () => {
      startButton.style.display = "none";
      stopButton.style.display = "block";
      executeScriptOnCurrentTab();
      chrome.tabs.onUpdated.addListener(onTabUpdated);
    };

    const onClickStopButton = () => {
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
      locationInfo.innerHTML = `<p>Select one of the following<br/>LinkedIn Pages to open:</p>
        <div><button id="openLinkedInSearchPage"><span>Search<br/>People</span></button></div>
        <div><button id="openLinkedInRecommendedForYouPage"><span>Recommended For You</span></button></div>`;
      startButton.style.display = "none";
      document
        .getElementById("openLinkedInSearchPage")
        .addEventListener("click", () => {
          openUrlOnCurrentTab(
            'https://www.linkedin.com/search/results/people/?facetNetwork=%5B"S"%5D'
          );
        });
      document
        .getElementById("openLinkedInRecommendedForYouPage")
        .addEventListener("click", () => {
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
