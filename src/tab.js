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

    var alreadyInvited = 0;

    document.querySelectorAll('.primary-action-button').forEach(function (item) {
        if (!arrayContains(extractProfileId(item.getAttribute("href")), buttonsClicked)) {
            setTimeout(function () {
                if (running) {
                    item.focus();
                    item.click();
                    buttonsClicked.push(extractProfileId(item.getAttribute("href")));
                    sessionStorage.setItem('buttonsClicked', JSON.stringify(buttonsClicked));
                }
            }, alreadyInvited++ * 500);
        }
    });

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
        if (connectButtonsLeft) {
            addPeopleFromSearchPage();
        } else {
            document.querySelector('.next > a').click();
        }
    }, 6000);
};

var addPeopleFromPymkPage = function () {
    if (!running) {
        return;
    }

    var alreadyInvited = 0;

    var buttonsFromOldInterface = document.querySelectorAll('.bt-request-buffed');

    var buttonsFromNewInterface = document.querySelectorAll('button.mn-person-card__person-btn-ext');

    var functionToBeCalledOnButtons = function (item) {
        setTimeout(function () {
            if (running) {
                item.focus();
                item.click();
            }
        }, alreadyInvited++ * 1000);
    };

    if (buttonsFromOldInterface.length > 0) {
        buttonsFromOldInterface.forEach(functionToBeCalledOnButtons);
    }

    if (buttonsFromNewInterface.length > 0) {
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

setInterval(checkIfUrlHasChanged, 1000);