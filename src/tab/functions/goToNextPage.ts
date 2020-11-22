import { LinkedInSelector } from "../enums/LinkedInSelector";

export function goToNextPage() {
  const nextButton = document.querySelector<HTMLButtonElement>(
    LinkedInSelector.NextButton
  );

  if (nextButton) nextButton.click();
}
