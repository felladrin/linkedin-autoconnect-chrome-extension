var running = true;
var lastLocation = null;

if (!sessionStorage.getItem("buttonsClicked")) {
  sessionStorage.setItem("buttonsClicked", JSON.stringify([]));
}

var buttonsClicked = JSON.parse(sessionStorage.getItem("buttonsClicked"));

var extractProfileId = function(string) {
  var expression = /key=(\d*)/g;
  var matches = expression.exec(string);
  return matches[1];
};

var addPeopleFromSearchPage = function() {
  if (!running) return;

  var delayBetweenClicks = 500;

  var alreadyInvited = 0;

  var buttonSelector =
    "button.search-result__action-button.search-result__actions--primary:enabled";

  var buttons = document.querySelectorAll(buttonSelector);

  var clickSendNowButtonIfAvailable = function() {
    var buttonSendNow = document.querySelector(
      "button.ml1.artdeco-button.artdeco-button--3.artdeco-button--primary"
    );

    if (buttonSendNow) buttonSendNow.click();
  };

  window.scrollTo(0, document.body.scrollHeight);

  if (buttons.length > 0) {
    delayBetweenClicks = 1500;
    buttons.forEach(function(item) {
      setTimeout(function() {
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

  setTimeout(function() {
    if (!running) return;

    var connectButtonsLeft = false;

    document.querySelectorAll(".primary-action-button").forEach(function(item) {
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
      var nextButton = document.querySelector(
        "artdeco-pagination > button.artdeco-pagination__button--next"
      );

      if (nextButton) nextButton.click();
    }
  }, alreadyInvited * delayBetweenClicks + 1000);
};

var addPeopleFromRecommendedForYouPage = function() {
  if (!running) return;

  var delayBetweenClicks = 2000;

  var alreadyInvited = 0;

  var buttons = document.querySelectorAll(
    'footer > button[data-control-name="invite"]'
  );

  var functionToBeCalledOnButtons = function(item) {
    setTimeout(function() {
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

  setTimeout(function() {
    addPeopleFromRecommendedForYouPage();
  }, alreadyInvited * delayBetweenClicks + 1000);
};

var strContains = function(string, substring) {
  return string.indexOf(substring) !== -1;
};

var isOnSearchPage = function() {
  return strContains(location.href, "linkedin.com/search/results/people");
};

var isOnRecommendedForYouPage = function() {
  return strContains(location.href, "linkedin.com/mynetwork");
};

var arrayContains = function(needle, haystack) {
  return haystack.indexOf(needle) > -1;
};

var checkIfUrlHasChanged = function() {
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
