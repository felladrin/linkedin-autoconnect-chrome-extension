import { LinkedInSelector } from "../enums/LinkedInSelector";
import { state } from "../constants/state";

export function addPeopleFromRecommendedForYouPage() {
  if (!state.isAutoConnectRunning) return;

  const delayBetweenClicks = 2000;
  let alreadyInvited = 0;

  const connectButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(
      LinkedInSelector.ConnectButtonsFromRecommendedPage
    )
  )
    .filter(
      (element) =>
        element.innerText === "Connect" &&
        typeof element.parentElement.click !== "undefined"
    )
    .map((element) => element.parentElement);

  window.scrollTo(0, document.body.scrollHeight);

  if (connectButtons.length > 0) {
    for (const item of connectButtons) {
      setTimeout(() => {
        if (state.isAutoConnectRunning) {
          item.focus();
          item.click();
          window.scrollBy(0, 200);
        }
      }, alreadyInvited++ * delayBetweenClicks);
    }
  }

  setTimeout(() => {
    addPeopleFromRecommendedForYouPage();
  }, alreadyInvited * delayBetweenClicks + 1000);
}
