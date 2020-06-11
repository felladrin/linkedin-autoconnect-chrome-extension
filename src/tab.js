(function() {
  let isAutoConnectRunning = false;
  let autoConnectLastLocation = "";

  const linkedInUrl = {
    patternOfSearchPage: "linkedin.com/search/results/people",
    patternOfMyNetworkPage: "linkedin.com/mynetwork"
  };
  const linkedInSelector = {
    sendNowButton: "button.ml1.artdeco-button.artdeco-button--3.artdeco-button--primary",
    cancelButton: 'button[aria-label="Dismiss"] > li-icon[type="cancel-icon"]',
    nextButton: "button.artdeco-pagination__button--next",
    connectButtonsFromRecommendedPage: 'footer > button[data-control-name="people_connect"]',
    connectButtonsFromSearchPage: "button.search-result__action-button.search-result__actions--primary:enabled",
  };
  
  function clickSendNowButtonIfAvailable() {
    const sendNowButton = document.querySelector(linkedInSelector.sendNowButton);

    if (sendNowButton) sendNowButton.click();
  };
  
  function dismissEmailRequiredDialog() {
    const cancelButton = document.querySelector(linkedInSelector.cancelButton);
    
    if (cancelButton) cancelButton.click();
  }
  
  function goToNextPage() {
    const nextButton = document.querySelector(linkedInSelector.nextButton);
  
    if (nextButton) nextButton.click();
  }
  
  function addPeopleFromSearchPage() {
    if (!isAutoConnectRunning) return;

    let alreadyInvited = 0;
  
    const delayBetweenClicks = 1500;
    const connectButtons = document.querySelectorAll(linkedInSelector.connectButtonsFromSearchPage);
  
    window.scrollTo(0, document.body.scrollHeight);
  
    if (connectButtons.length > 0) {
      for (const button of connectButtons) {
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
        }, alreadyInvited * delayBetweenClicks);

        alreadyInvited++;
      }
    }
  
    setTimeout(() => {
      if (!isAutoConnectRunning) return;
      
      let thereAreConnectButtonsLeft = false;
  
      if (document.querySelectorAll(linkedInSelector.connectButtonsFromSearchPage).length > 0) {
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
  
    const connectButtons = document.querySelectorAll(linkedInSelector.connectButtonsFromRecommendedPage);
  
    window.scrollTo(0, document.body.scrollHeight);
  
    if (connectButtons.length > 0) {
      for (const item of connectButtons) {
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
    return location.href.includes(linkedInUrl.patternOfSearchPage);
  }
  
  function isOnRecommendedForYouPage () {
    return location.href.includes(linkedInUrl.patternOfMyNetworkPage);
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
        autoConnectLastLocation = ""
        sendResponse(isAutoConnectRunning);
        break;
    }
  });
})();
