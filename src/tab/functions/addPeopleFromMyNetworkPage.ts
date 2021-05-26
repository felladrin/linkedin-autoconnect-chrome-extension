import { LinkedInSelector } from "../enums/LinkedInSelector";
import { isRunningStore } from "../stores";

export function addPeopleFromMyNetworkPage() {
  if (!isRunningStore.getState()) return;

  const delayBetweenClicks = 2000;
  let alreadyInvited = 0;

  const connectButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(
      LinkedInSelector.ConnectButtonsFromRecommendedPage
    )
  );

  window.scrollTo(0, document.body.scrollHeight);

  if (connectButtons.length > 0) {
    for (const item of connectButtons) {
      setTimeout(() => {
        if (isRunningStore.getState()) {
          item.focus();
          item.click();
          item.disabled = true;
        }
      }, alreadyInvited++ * delayBetweenClicks);
    }
  }

  setTimeout(() => {
    addPeopleFromMyNetworkPage();
  }, alreadyInvited * delayBetweenClicks + 1000);
}
