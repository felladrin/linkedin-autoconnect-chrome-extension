import { clickSendNowButtonIfAvailable } from "./clickSendNowButtonIfAvailable";
import { dismissEmailRequiredDialog } from "./dismissEmailRequiredDialog";
import { goToNextPage } from "./goToNextPage";
import { LinkedInSelector } from "../enums/LinkedInSelector";
import { isRunningStore } from "../stores";

export function addPeopleFromSearchPage() {
  if (!isRunningStore.getState()) return;

  let alreadyInvited = 0;

  const delayBetweenClicks = 1500;
  const connectButtons = document.querySelectorAll<HTMLButtonElement>(
    LinkedInSelector.ConnectButtonsFromSearchPage
  );

  window.scrollTo(0, document.body.scrollHeight);

  if (connectButtons.length > 0) {
    for (const button of connectButtons) {
      setTimeout(() => {
        if (isRunningStore.getState()) {
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
    if (!isRunningStore.getState()) return;

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
