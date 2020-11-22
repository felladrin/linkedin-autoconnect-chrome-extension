import { LinkedInSelector } from "../enums/LinkedInSelector";

export function dismissEmailRequiredDialog() {
  const cancelButton = document.querySelector<HTMLButtonElement>(
    LinkedInSelector.CancelButton
  );

  if (cancelButton) cancelButton.click();
}
