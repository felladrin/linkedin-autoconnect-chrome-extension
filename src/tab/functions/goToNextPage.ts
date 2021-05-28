import { LinkedInSelector } from "../../shared/enums/LinkedInSelector";

export function goToNextPage() {
  const nextButton = document.querySelector<HTMLButtonElement>(
    LinkedInSelector.NextButton
  );

  if (nextButton) nextButton.click();
}
