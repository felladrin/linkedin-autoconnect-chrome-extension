let running = true;
let lastLocation = null;

if (!sessionStorage.getItem("buttonsClicked")) {
  sessionStorage.setItem("buttonsClicked", JSON.stringify([]));
}

const buttonsClicked = JSON.parse(sessionStorage.getItem("buttonsClicked"));

const extractProfileId = string => {
  const expression = /key=(\d*)/g;
  const matches = expression.exec(string);
  return matches[1];
};

const arrayContains = (needle, haystack) => haystack.includes(needle);

const addPeopleFromSearchPage = () => {
  if (!running) return;

  let delayBetweenClicks = 500;
  let alreadyInvited = 0;

  const buttonSelector =
    "button.search-result__action-button.search-result__actions--primary:enabled";

  const buttons = document.querySelectorAll(buttonSelector);

  const clickSendNowButtonIfAvailable = () => {
    const buttonSendNow = document.querySelector(
      "button.ml1.artdeco-button.artdeco-button--3.artdeco-button--primary"
    );

    if (buttonSendNow) buttonSendNow.click();
  };

  window.scrollTo(0, document.body.scrollHeight);

  if (buttons.length > 0) {
    delayBetweenClicks = 1500;

    buttons.forEach(item => {
      setTimeout(() => {
        if (running) {
          clickSendNowButtonIfAvailable();
          item.focus();
          item.click();
          window.scrollBy(0, 200);
          item.setAttribute("disabled", "true");
          item["innerText"] = "Invite Sent";
          clickSendNowButtonIfAvailable();
        }
      }, alreadyInvited++ * delayBetweenClicks);
    });
  }

  setTimeout(() => {
    if (!running) return;
    let connectButtonsLeft = false;
    document.querySelectorAll(".primary-action-button").forEach(item => {
      if (
        !arrayContains(
          extractProfileId(item.getAttribute("href")),
          buttonsClicked
        )
      ) {
        connectButtonsLeft = true;
      }
    });
    if (document.querySelectorAll(buttonSelector).length > 0) {
      connectButtonsLeft = true;
    }
    if (connectButtonsLeft) {
      addPeopleFromSearchPage();
    } else {
      const nextButton = document.querySelector(
        "artdeco-pagination > button.artdeco-pagination__button--next"
      );
      if (nextButton) nextButton.click();
    }
  }, alreadyInvited * delayBetweenClicks + 1000);
};

const addPeopleFromRecommendedForYouPage = () => {
  if (!running) return;

  const delayBetweenClicks = 2000;
  let alreadyInvited = 0;

  const buttons = document.querySelectorAll(
    'footer > button[data-control-name="invite"]'
  );

  const functionToBeCalledOnButtons = item => {
    setTimeout(() => {
      if (running) {
        item.focus();
        item.click();
        window.scrollBy(0, 200);
      }
    }, alreadyInvited++ * delayBetweenClicks);
  };

  window.scrollTo(0, document.body.scrollHeight);

  if (buttons.length > 0) {
    buttons.forEach(functionToBeCalledOnButtons);
  }

  setTimeout(() => {
    addPeopleFromRecommendedForYouPage();
  }, alreadyInvited * delayBetweenClicks + 1000);
};

const strContains = (string, substring) => string.includes(substring);

const isOnSearchPage = () =>
  strContains(location.href, "linkedin.com/search/results/people");

const isOnRecommendedForYouPage = () =>
  strContains(location.href, "linkedin.com/mynetwork");

const checkIfUrlHasChanged = () => {
  if (!running || location.href === lastLocation) return;

  lastLocation = location.href;

  if (isOnSearchPage()) {
    addPeopleFromSearchPage();
  } else if (isOnRecommendedForYouPage()) {
    addPeopleFromRecommendedForYouPage();
  } else {
    running = false;
  }
};

if (typeof loop === "undefined") {
  var loop = setInterval(checkIfUrlHasChanged, 1000);
}
