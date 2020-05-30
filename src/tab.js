(function() {
  let isAutoConnectRunning = false;
  let autoConnectLastLocation = null;

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message) {
      case 'isAutoConnectAvailable':
        sendResponse(true);
        break;
      case 'isAutoConnectRunning':
        sendResponse(isAutoConnectRunning);
        break;
      case 'startAutoConnect':
        isAutoConnectRunning = true;
        sendResponse(isAutoConnectRunning);
        break;
      case 'stopAutoConnect':
        isAutoConnectRunning = false;
        autoConnectLastLocation = null
        sendResponse(isAutoConnectRunning);
        break;
    }
  });

  if (!sessionStorage.getItem("buttonsClicked")) {
    sessionStorage.setItem("buttonsClicked", JSON.stringify([]));
  }
  
  const buttonsClicked = JSON.parse(sessionStorage.getItem("buttonsClicked"));
  
  function extractProfileId(string) {
    const expression = /key=(\d*)/g;
    const matches = expression.exec(string);
    return matches[1];
  };
  
  function clickSendNowButtonIfAvailable() {
    const buttonSendNow = document.querySelector(
      "button.ml1.artdeco-button.artdeco-button--3.artdeco-button--primary"
    );
  
    if (buttonSendNow) buttonSendNow.click();
  };
  
  function dismissEmailRequiredDialog() {
    const cancelButton = document.querySelector('button[aria-label="Dismiss"] > li-icon[type="cancel-icon"]');
    
    if (cancelButton) cancelButton.click();
  }
  
  function goToNextPage() {
    const nextButton = document.querySelector(
      "button.artdeco-pagination__button--next"
    );
  
    if (nextButton) nextButton.click();
  }
  
  function addPeopleFromSearchPage() {
    if (!isAutoConnectRunning) return;
  
    let delayBetweenClicks = 500;
    let alreadyInvited = 0;
  
    const buttonSelector =
      "button.search-result__action-button.search-result__actions--primary:enabled";
  
    const buttons = document.querySelectorAll(buttonSelector);
  
    window.scrollTo(0, document.body.scrollHeight);
  
    if (buttons.length > 0) {
      delayBetweenClicks = 1500;
  
      for (const button of buttons) {
        setTimeout(() => {
          if (isAutoConnectRunning) {
            dismissEmailRequiredDialog();
            clickSendNowButtonIfAvailable();
            button.focus();
            button.click();
            window.scrollBy(0, 200);
            button.setAttribute("disabled", "true");
            button["innerText"] = "Invite Sent";
            dismissEmailRequiredDialog();
            clickSendNowButtonIfAvailable();
          }
        }, alreadyInvited++ * delayBetweenClicks);
      }
    }
  
    setTimeout(() => {
      if (!isAutoConnectRunning) return;
      let thereAreConnectButtonsLeft = false;
      const primaryActionButtons = document.querySelectorAll(".primary-action-button");
  
      for (const item of primaryActionButtons) {
        if (
          !buttonsClicked.includes(extractProfileId(item.getAttribute("href")))
        ) {
          thereAreConnectButtonsLeft = true;
        }
      }
  
      if (document.querySelectorAll(buttonSelector).length > 0) {
        thereAreConnectButtonsLeft = true;
      }
  
      if (thereAreConnectButtonsLeft) {
        addPeopleFromSearchPage();
      } else {
        goToNextPage();
      }
    }, alreadyInvited * delayBetweenClicks + 1000);
  };
  
  function addPeopleFromRecommendedForYouPage() {
    if (!isAutoConnectRunning) return;
  
    const delayBetweenClicks = 2000;
    let alreadyInvited = 0;
  
    const buttons = document.querySelectorAll(
      'footer > button[data-control-name="people_connect"]'
    );
  
    window.scrollTo(0, document.body.scrollHeight);
  
    if (buttons.length > 0) {
      for (const item of buttons) {
        setTimeout(() => {
          if (isAutoConnectRunning) {
            item.focus();
            item.click();
            window.scrollBy(0, 200);
          }
        }, alreadyInvited++ * delayBetweenClicks);
      }
    }
  
    setTimeout(() => {
      addPeopleFromRecommendedForYouPage();
    }, alreadyInvited * delayBetweenClicks + 1000);
  };
  
  function isOnSearchPage () {
    return location.href.includes("linkedin.com/search/results/people");
  }
  
  function isOnRecommendedForYouPage () {
    return location.href.includes("linkedin.com/mynetwork");
  }
  
  function checkIfUrlHasChanged() {
    if (!isAutoConnectRunning || location.href === autoConnectLastLocation) return;
  
    autoConnectLastLocation = location.href;
  
    if (isOnSearchPage()) {
      addPeopleFromSearchPage();
    } else if (isOnRecommendedForYouPage()) {
      addPeopleFromRecommendedForYouPage();
    } else {
      isAutoConnectRunning = false;
    }
  };

  setInterval(checkIfUrlHasChanged, 1000);
})();
