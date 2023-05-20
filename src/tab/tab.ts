import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  restore,
  sample,
  split,
} from "effector";
import randomInt from "random-int";
import { delay } from "../shared/effects/delay";
import { loadOptions } from "../shared/effects/loadOptions";
import { postChromePortMessage } from "../shared/effects/postChromePortMessage";
import { startListeningToChromePortMessages } from "../shared/effects/startListeningToChromePortMessages";
import { LinkedInCssSelector } from "../shared/enums/LinkedInCssSelector";
import { LinkedInPage } from "../shared/enums/LinkedInPage";
import { LinkedInUrl } from "../shared/enums/LinkedInUrl";
import { MessageId } from "../shared/enums/MessageId";
import { chromePortConnected } from "../shared/events/chromePortConnected";
import { extensionMessageReceived } from "../shared/events/extensionMessageReceived";
import { ChromePortMessage } from "../shared/interfaces/ChromePortMessage";
import { Message } from "../shared/interfaces/Message";
import { chromePortStore } from "../shared/stores/chromePortStore";
import { maximumAutoConnectionsPerSessionStore } from "../shared/stores/maximumAutoConnectionsPerSessionStore";

const clickButton = createEffect((button: HTMLButtonElement) => {
  button.focus();
  button.click();
  button.setAttribute("disabled", "disabled");
});

const confirmSendInviteDialog = createEffect(
  () =>
    new Promise((resolve) => {
      let attempts = 0;

      const interval = setInterval(() => {
        const sendButton = document.querySelector<HTMLButtonElement>(LinkedInCssSelector.SendButtonFromSendInviteModal);

        sendButton?.click();

        if (sendButton || ++attempts > 5) {
          clearInterval(interval);
          resolve(null);
        }
      }, 500);
    })
);

const delayNextClick = attach({ effect: delay });

const findNextAvailableConnectButton = createEffect(
  (selector: LinkedInCssSelector) =>
    new Promise((resolve) => {
      let attempts = 0;

      const interval = setInterval(() => {
        window.scrollTo(0, document.body.scrollHeight);

        const nextAvailableConnectButton = document.querySelector<HTMLButtonElement>(selector);

        if (nextAvailableConnectButton) {
          clearInterval(interval);
          resolve(nextAvailableConnectButton);
        } else if (++attempts > 5) {
          clearInterval(interval);
          resolve(null);
        }
      }, 500);
    })
);

const goToNextPage = createEffect(() => {
  document.querySelector<HTMLButtonElement>(LinkedInCssSelector.NextPageButton)?.click();
});

const startListeningToChromePortConnections = createEffect(() =>
  chrome.runtime.onConnect.addListener(chromePortConnected)
);

const startOneSecondIntervalTicker = createEffect(() => setInterval(oneSecondIntervalTicked, 1000));

const buttonClicked = clickButton.done;

const buttonClickRequested = createEvent();

const { nextAvailableConnectButtonFound, nextAvailableConnectButtonNotFound } = split(
  findNextAvailableConnectButton.doneData,
  {
    nextAvailableConnectButtonFound: (button): button is HTMLButtonElement => button !== null,
    nextAvailableConnectButtonNotFound: (button): button is null => button === null,
  }
);

const oneSecondIntervalTicked = createEvent();

const started = createEvent();

const stopped = createEvent();

const tabScriptInjected = createEvent();

const windowLocationUpdated = createEvent<string>();

const {
  searchPageLoaded,
  myNetworkPageLoaded,
  __: unidentifiedPageLoaded,
} = split(windowLocationUpdated, {
  searchPageLoaded: (windowLocation) => windowLocation.includes(LinkedInUrl.PatternOfSearchPage),
  myNetworkPageLoaded: (windowLocation) => windowLocation.includes(LinkedInUrl.PatternOfMyNetworkPage),
});

const buttonClicksCountStore = createStore(0).on(buttonClicked, (state) => state + 1);

const currentLinkedInPageStore = createStore(LinkedInPage.Unidentified)
  .on(searchPageLoaded, () => LinkedInPage.SearchPeople)
  .on(myNetworkPageLoaded, () => LinkedInPage.MyNetwork);

const isRunningStore = createStore(false)
  .on(started, () => true)
  .reset([stopped, unidentifiedPageLoaded]);

const lastWindowLocationStore = restore(windowLocationUpdated, "");

sample({ clock: buttonClicked, target: confirmSendInviteDialog });

sample({
  clock: buttonClicked,
  fn: () => randomInt(1500, 3000),
  target: delayNextClick,
});

guard({
  clock: buttonClicked,
  source: combine({
    buttonClicksCount: buttonClicksCountStore,
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  filter: ({ buttonClicksCount, maximumAutoConnectionsPerSession }) =>
    buttonClicksCount >= Number(maximumAutoConnectionsPerSession),
  target: stopped,
});

sample({
  clock: guard({
    clock: buttonClickRequested,
    source: combine({ isRunning: isRunningStore, currentLinkedInPage: currentLinkedInPageStore }),
    filter: ({ isRunning, currentLinkedInPage }) =>
      isRunning && [LinkedInPage.MyNetwork, LinkedInPage.SearchPeople].includes(currentLinkedInPage),
  }),
  fn: ({ currentLinkedInPage }) =>
    currentLinkedInPage === LinkedInPage.MyNetwork
      ? LinkedInCssSelector.ConnectButtonFromMyNetworkPage
      : LinkedInCssSelector.ConnectButtonFromSearchPage,
  target: findNextAvailableConnectButton,
});

guard({
  clock: sample({
    clock: buttonClicksCountStore.updates,
    source: chromePortStore,
    fn: (chromePort, buttonClicksCount) => ({
      message: { id: MessageId.ButtonClicksCountUpdated, content: buttonClicksCount } as Message,
      port: chromePort,
    }),
  }),
  filter: (payload): payload is ChromePortMessage => payload.port !== null,
  target: postChromePortMessage,
});

forward({ from: chromePortConnected, to: startListeningToChromePortMessages });

forward({
  from: chromePortConnected.map((port) => ({ message: { id: MessageId.ConnectionEstablished }, port })),
  to: postChromePortMessage,
});

sample({
  clock: chromePortConnected,
  source: isRunningStore,
  fn: (isRunning, port) => ({ message: { id: MessageId.RunningStateUpdated, content: isRunning }, port }),
  target: postChromePortMessage,
});

sample({
  clock: chromePortConnected,
  source: buttonClicksCountStore,
  fn: (buttonClicksCount, port) => ({
    message: { id: MessageId.ButtonClicksCountUpdated, content: buttonClicksCount },
    port,
  }),
  target: postChromePortMessage,
});

forward({ from: delayNextClick.doneData, to: buttonClickRequested });

sample({
  clock: extensionMessageReceived[MessageId.StartAutoConnect],
  target: started,
});

sample({
  clock: extensionMessageReceived[MessageId.StopAutoConnect],
  target: stopped,
});

guard({ clock: isRunningStore.updates, filter: (isRunning) => isRunning, target: buttonClickRequested });

guard({
  clock: sample({
    clock: isRunningStore.updates,
    source: chromePortStore,
    fn: (chromePort, isRunning) => ({
      message: { id: MessageId.RunningStateUpdated, content: isRunning } as Message,
      port: chromePort,
    }),
  }),
  filter: (payload): payload is ChromePortMessage => payload.port !== null,
  target: postChromePortMessage,
});

guard({ clock: myNetworkPageLoaded, filter: isRunningStore, target: buttonClickRequested });

forward({
  from: nextAvailableConnectButtonFound,
  to: clickButton,
});

sample({ clock: nextAvailableConnectButtonNotFound, target: goToNextPage });

guard({
  clock: oneSecondIntervalTicked,
  source: lastWindowLocationStore,
  filter: (lastWindowLocation) => window.location.href !== lastWindowLocation,
  target: windowLocationUpdated.prepend(() => window.location.href),
});

guard({ clock: searchPageLoaded, filter: isRunningStore, target: buttonClickRequested });

forward({
  from: tabScriptInjected,
  to: [startListeningToChromePortConnections, startOneSecondIntervalTicker],
});

sample({
  clock: tabScriptInjected,
  source: combine({
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  target: loadOptions,
});

tabScriptInjected();
