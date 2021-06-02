import { LinkedInSelector } from "../../shared/enums/LinkedInSelector";

export function dismissSendInviteDialog() {
  document
    .querySelector<HTMLButtonElement>(
      LinkedInSelector.DismissSendInviteDialogButton
    )
    ?.click();
}
