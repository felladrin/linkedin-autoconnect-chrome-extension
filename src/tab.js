var running = true;
var lastLocation = null;

if (!sessionStorage.getItem('buttonsClicked')) {
    sessionStorage.setItem('buttonsClicked', JSON.stringify([]));
}

var buttonsClicked = JSON.parse(sessionStorage.getItem('buttonsClicked'));

var extractProfileId = function (string) {
    var expression = /key=(\d*)/g;
    var matches = expression.exec(string);
    return matches[1];
};

var addPeopleFromSearchPage = function () {
    if (!running) {
        return;
    }

    var delayBetweenClicks = 500;

    var alreadyInvited = 0;

    var buttonsFromOldInterface = document.querySelectorAll('.primary-action-button');

    var buttonsFromNewInterface = document.querySelectorAll('button.search-result__actions--primary.m5:enabled');

    if (buttonsFromOldInterface.length > 0) {
        buttonsFromOldInterface.forEach(function (item) {
            if (!arrayContains(extractProfileId(item.getAttribute("href")), buttonsClicked)) {
                setTimeout(function () {
                    if (running) {
                        item.focus();
                        item.click();
                        buttonsClicked.push(extractProfileId(item.getAttribute("href")));
                        sessionStorage.setItem('buttonsClicked', JSON.stringify(buttonsClicked));
                    }
                }, alreadyInvited++ * delayBetweenClicks);
            }
        });
    } else if (buttonsFromNewInterface.length > 0) {
        delayBetweenClicks = 1500;
        buttonsFromNewInterface.forEach(function (item) {
            setTimeout(function () {
                if (running) {
                    var buttonSendNow = document.querySelector('button.button-primary-large.ml3');
                    if (buttonSendNow) {
                        buttonSendNow.click();
                    }
                    item.focus();
                    item.click();
                    item.setAttribute("disabled", "true");
                    buttonSendNow = document.querySelector('button.button-primary-large.ml3');
                    if (buttonSendNow) {
                        buttonSendNow.click();
                    }
                }
            }, alreadyInvited++ * delayBetweenClicks);
        });
    }

    setTimeout(function () {
        if (!running) {
            return;
        }

        var connectButtonsLeft = false;

        document.querySelectorAll('.primary-action-button').forEach(function (item) {
            if (!arrayContains(extractProfileId(item.getAttribute("href")), buttonsClicked)) {
                connectButtonsLeft = true;
            }
        });

        if (document.querySelectorAll('button.search-result__actions--primary.m5:enabled').length > 0) {
            connectButtonsLeft = true;
        }

        if (connectButtonsLeft) {
            addPeopleFromSearchPage();
        } else {
            var nextButtonFromOldInterface = document.querySelector('.next > a');
            var nextButtonFromNewInterface = document.querySelector('button.next');
            if (nextButtonFromOldInterface) {
                nextButtonFromOldInterface.click();
            } else if (nextButtonFromNewInterface) {
                nextButtonFromNewInterface.click();
            }
        }
    }, alreadyInvited * delayBetweenClicks + 1000);
};

var addPeopleFromPymkPage = function () {
    if (!running) {
        return;
    }

    var alreadyInvited = 0;

    var buttonsFromOldInterface = document.querySelectorAll('.bt-request-buffed');

    var buttonsFromNewInterface = document.querySelectorAll('button.button-secondary-small[data-control-name="invite"]');

    var functionToBeCalledOnButtons = function (item) {
        setTimeout(function () {
            if (running) {
                item.focus();
                item.click();
                window.scrollBy(0, window.innerHeight);
            }
        }, alreadyInvited++ * 1000);
    };

    if (buttonsFromOldInterface.length > 0) {
        buttonsFromOldInterface.forEach(functionToBeCalledOnButtons);
    } else if (buttonsFromNewInterface.length > 0) {
        buttonsFromNewInterface.forEach(functionToBeCalledOnButtons);
    }

    setTimeout(function () {
        addPeopleFromPymkPage();
    }, alreadyInvited * 1000 + 1000);
};

var strContains = function (string, substring) {
    return (string.indexOf(substring) !== -1);
};

var isOnSearchPage = function () {
    return (strContains(location.href, "linkedin.com/vsearch/p") || strContains(location.href, "linkedin.com/search/results/people"));
};

var isOnPymkPage = function () {
    return (strContains(location.href, "linkedin.com/people/pymk") || strContains(location.href, "linkedin.com/mynetwork"));
};

var arrayContains = function (needle, haystack) {
    return (haystack.indexOf(needle) > -1);
};

var checkIfUrlHasChanged = function () {
    if (!running || location.href === lastLocation) {
        return;
    }

    lastLocation = location.href;

    if (isOnSearchPage()) {
        addPeopleFromSearchPage();
    } else if (isOnPymkPage()) {
        addPeopleFromPymkPage();
    } else {
        running = false;
    }
};

if (typeof loop === 'undefined') {
    var loop = setInterval(checkIfUrlHasChanged, 1000);
}