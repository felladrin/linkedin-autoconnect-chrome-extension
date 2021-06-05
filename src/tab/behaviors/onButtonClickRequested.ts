import { guard, sample } from "effector";
import { LinkedInPage } from "../../shared/enums/LinkedInPage";
import { LinkedInSelector } from "../enums/LinkedInSelector";
import { buttonClickRequested } from "../events/buttonClickRequested";
import { isRunningStore } from "../stores/isRunningStore";
import { currentLinkedInPageStore } from "../stores/currentLinkedInPageStore";
import { findNextAvailableConnectButton } from "../effects/findNextAvailableConnectButton";

const onButtonClickRequested = sample({
  clock: guard(buttonClickRequested, {
    filter: isRunningStore,
  }),
  source: currentLinkedInPageStore,
});

guard(onButtonClickRequested, {
  filter: (currentLinkedInPage) => currentLinkedInPage === LinkedInPage.MyNetwork,
}).watch(() => findNextAvailableConnectButton(LinkedInSelector.ConnectButtonsFromMyNetworkPage));

guard(onButtonClickRequested, {
  filter: (currentLinkedInPage) => currentLinkedInPage === LinkedInPage.SearchPeople,
}).watch(() => findNextAvailableConnectButton(LinkedInSelector.ConnectButtonsFromSearchPage));
