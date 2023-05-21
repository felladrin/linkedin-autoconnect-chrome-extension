import { createPubSub } from "create-pubsub";
import randomInt from "random-int";
import {
  LinkedInCssSelector,
  LinkedInPage,
  LinkedInUrl,
  MessageId,
  delay,
  emitChromePortConnected,
  getChromePort,
  getMaximumAutoConnectionsPerSession,
  loadOptions,
  onChromePortConnected,
  onChromePortMessageReceived,
  postChromePortMessage,
  startListeningToChromePortMessages,
} from "./shared";

const maximumAttemptsForFindingHtmlElements = 5;
const minimumDelayBetweenConnectClicks = 1500;
const maximumDelayBetweenConnectClicks = 3000;
const oneSecondIntervalInMilliseconds = 1000;
const halfSecondIntervalInMilliseconds = 500;
const [emitNextAvailableConnectButtonFound, onNextAvailableConnectButtonFound] = createPubSub<HTMLButtonElement>();
const [emitNextAvailableConnectButtonNotFound, onNextAvailableConnectButtonNotFound] = createPubSub();
const [emitConnectButtonClicked, onConnectButtonClicked] = createPubSub();
const [emitOneSecondIntervalTicked, onOneSecondIntervalTicked] = createPubSub();
const [emitStarted, onStarted] = createPubSub();
const [emitStopped, onStopped] = createPubSub();
const [emitWindowLocationUpdated, onWindowLocationUpdated, getLastWindowLocation] = createPubSub("");
const [emitSearchPageLoaded, onSearchPageLoaded] = createPubSub();
const [emitMyNetworkPageLoaded, onMyNetworkPageLoaded] = createPubSub();
const [emitUnidentifiedPageLoaded, onUnidentifiedPageLoaded] = createPubSub();
const [emitButtonClicksCount, onButtonClicksCountUpdated, getButtonClicksCount] = createPubSub(0);
const [emitCurrentLinkedInPage, , getCurrentLinkedInPage] = createPubSub(LinkedInPage.Unidentified);
const [emitIsRunning, onIsRunningUpdated, getIsRunning] = createPubSub(false);

function clickConnectButton(button: HTMLButtonElement) {
  button.focus();
  button.click();
  button.setAttribute("disabled", "disabled");
  emitConnectButtonClicked();
}

function confirmSendInviteModal() {
  return new Promise((resolve) => {
    let attempts = 0;

    const interval = setInterval(() => {
      const sendButton = document.querySelector<HTMLButtonElement>(LinkedInCssSelector.SendButtonFromSendInviteModal);

      sendButton?.click();

      if (sendButton || ++attempts > maximumAttemptsForFindingHtmlElements) {
        clearInterval(interval);
        resolve(null);
      }
    }, halfSecondIntervalInMilliseconds);
  });
}

function findNextAvailableConnectButton(selector: LinkedInCssSelector) {
  let attempts = 0;

  const interval = setInterval(() => {
    window.scrollTo(0, document.body.scrollHeight);

    const nextAvailableConnectButton = document.querySelector<HTMLButtonElement>(selector);

    if (nextAvailableConnectButton) {
      clearInterval(interval);
      emitNextAvailableConnectButtonFound(nextAvailableConnectButton);
    } else if (++attempts > maximumAttemptsForFindingHtmlElements) {
      clearInterval(interval);
      emitNextAvailableConnectButtonNotFound();
    }
  }, halfSecondIntervalInMilliseconds);
}

function goToNextPage() {
  document.querySelector<HTMLButtonElement>(LinkedInCssSelector.NextPageButton)?.click();
}

function startListeningToChromePortConnections() {
  return chrome.runtime.onConnect.addListener(emitChromePortConnected);
}

function startOneSecondIntervalTicker() {
  return setInterval(emitOneSecondIntervalTicked, oneSecondIntervalInMilliseconds);
}

function searchForConnectButtonIfRunning() {
  const isRunning = getIsRunning();
  const currentLinkedInPage = getCurrentLinkedInPage();
  if (isRunning && [LinkedInPage.MyNetwork, LinkedInPage.SearchPeople].includes(currentLinkedInPage)) {
    findNextAvailableConnectButton(
      currentLinkedInPage === LinkedInPage.MyNetwork
        ? LinkedInCssSelector.ConnectButtonFromMyNetworkPage
        : LinkedInCssSelector.ConnectButtonFromSearchPage
    );
  }
}

(async () => {
  await loadOptions();

  startListeningToChromePortConnections();

  startOneSecondIntervalTicker();

  onWindowLocationUpdated((windowLocation) => {
    if (windowLocation.includes(LinkedInUrl.PatternOfSearchPage)) {
      emitSearchPageLoaded();
    } else if (windowLocation.includes(LinkedInUrl.PatternOfMyNetworkPage)) {
      emitMyNetworkPageLoaded();
    } else {
      emitUnidentifiedPageLoaded();
    }
  });

  onStarted(() => emitIsRunning(true));

  onStopped(() => emitIsRunning(false));

  onUnidentifiedPageLoaded(() => emitIsRunning(false));

  onConnectButtonClicked(async () => {
    emitButtonClicksCount(getButtonClicksCount() + 1);
    confirmSendInviteModal();
    await delay(randomInt(minimumDelayBetweenConnectClicks, maximumDelayBetweenConnectClicks));
    if (getIsRunning()) {
      if (getButtonClicksCount() >= Number(getMaximumAutoConnectionsPerSession())) {
        emitStopped();
      } else {
        searchForConnectButtonIfRunning();
      }
    }
  });

  onButtonClicksCountUpdated((buttonClicksCount) => {
    const port = getChromePort();
    if (port) {
      postChromePortMessage({ message: { id: MessageId.ButtonClicksCountUpdated, content: buttonClicksCount }, port });
    }
  });

  onChromePortConnected((port) => {
    postChromePortMessage({ message: { id: MessageId.RunningStateUpdated, content: getIsRunning() }, port });
    postChromePortMessage({
      message: { id: MessageId.ButtonClicksCountUpdated, content: getButtonClicksCount() },
      port,
    });
  });

  onChromePortMessageReceived(({ message }) => {
    switch (message.id) {
      case MessageId.StartAutoConnect:
        return emitStarted();
      case MessageId.StopAutoConnect:
        return emitStopped();
    }
  });

  onIsRunningUpdated((isRunning) => {
    const port = getChromePort();

    if (port) postChromePortMessage({ message: { id: MessageId.RunningStateUpdated, content: isRunning }, port });

    searchForConnectButtonIfRunning();
  });

  onOneSecondIntervalTicked(() => {
    if (window.location.href !== getLastWindowLocation()) emitWindowLocationUpdated(window.location.href);
  });

  onChromePortConnected((port) => {
    postChromePortMessage({ message: { id: MessageId.ConnectionEstablished }, port });
    startListeningToChromePortMessages(port);
  });

  onNextAvailableConnectButtonFound(clickConnectButton);

  onNextAvailableConnectButtonNotFound(goToNextPage);

  onMyNetworkPageLoaded(() => {
    emitCurrentLinkedInPage(LinkedInPage.MyNetwork);
    searchForConnectButtonIfRunning();
  });

  onSearchPageLoaded(() => {
    emitCurrentLinkedInPage(LinkedInPage.SearchPeople);
    searchForConnectButtonIfRunning();
  });
})();
