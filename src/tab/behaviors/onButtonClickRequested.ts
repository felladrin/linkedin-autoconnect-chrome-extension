import { combine, guard, sample } from "effector";
import { LinkedInPage } from "../../shared/enums/LinkedInPage";
import { LinkedInSelector } from "../enums/LinkedInSelector";
import { buttonClickRequested } from "../events/buttonClickRequested";
import { isRunningStore } from "../stores/isRunningStore";
import { currentLinkedInPageStore } from "../stores/currentLinkedInPageStore";
import { findNextAvailableConnectButton } from "../effects/findNextAvailableConnectButton";

sample({
  clock: guard({
    clock: buttonClickRequested,
    source: combine({ isRunning: isRunningStore, currentLinkedInPage: currentLinkedInPageStore }),
    filter: ({ isRunning, currentLinkedInPage }) =>
      isRunning && [LinkedInPage.MyNetwork, LinkedInPage.SearchPeople].includes(currentLinkedInPage),
  }),
  fn: ({ currentLinkedInPage }) =>
    currentLinkedInPage === LinkedInPage.MyNetwork
      ? LinkedInSelector.ConnectButtonsFromMyNetworkPage
      : LinkedInSelector.ConnectButtonsFromSearchPage,
  target: findNextAvailableConnectButton,
});
