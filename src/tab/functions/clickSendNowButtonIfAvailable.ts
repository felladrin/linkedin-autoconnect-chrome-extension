import { LinkedInSelector } from "../enums/LinkedInSelector";

export function clickSendNowButtonIfAvailable() {
  const sendNowButton = document.querySelector<HTMLButtonElement>(
    LinkedInSelector.SendNowButton
  );

  if (sendNowButton) sendNowButton.click();
}
