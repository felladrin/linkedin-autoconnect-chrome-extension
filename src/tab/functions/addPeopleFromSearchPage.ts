import { clickSendNowButtonIfAvailable } from "./clickSendNowButtonIfAvailable";
import { dismissEmailRequiredDialog } from "./dismissEmailRequiredDialog";
import { goToNextPage } from "./goToNextPage";
import { LinkedInSelector } from "../enums/LinkedInSelector";
import { state } from "../constants/state";

export function addPeopleFromSearchPage() {
  if (!state.isAutoConnectRunning) return;

  let alreadyInvited = 0;

  const delayBetweenClicks = 1500;
  const connectButtons = document.querySelectorAll<HTMLButtonElement>(
    LinkedInSelector.ConnectButtonsFromSearchPage
  );

  window.scrollTo(0, document.body.scrollHeight);

  if (connectButtons.length > 0) {
    for (const button of connectButtons) {
      setTimeout(() => {
        if (state.isAutoConnectRunning) {
          dismissEmailRequiredDialog();
          clickSendNowButtonIfAvailable();
          button.focus();
          button.click();
          button.disabled = true;
          clickSendNowButtonIfAvailable();
          dismissEmailRequiredDialog();
        }
      }, alreadyInvited * delayBetweenClicks);

      alreadyInvited++;
    }
  }

  setTimeout(() => {
    if (!state.isAutoConnectRunning) return;

    let thereAreConnectButtonsLeft = false;

    if (
      document.querySelectorAll(LinkedInSelector.ConnectButtonsFromSearchPage)
        .length > 0
    ) {
      thereAreConnectButtonsLeft = true;
    }

    if (thereAreConnectButtonsLeft) {
      addPeopleFromSearchPage();
    } else {
      goToNextPage();
    }
  }, alreadyInvited * delayBetweenClicks + 1000);
}
