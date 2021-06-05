import { createEffect } from "effector";
import { LinkedInSelector } from "../enums/LinkedInSelector";

export const dismissSendInviteDialog = createEffect(() => {
  document.querySelector<HTMLButtonElement>(LinkedInSelector.DismissSendInviteDialogButton)?.click();
});
