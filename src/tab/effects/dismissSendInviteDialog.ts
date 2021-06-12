import { createEffect } from "effector";
import { LinkedInCssSelector } from "../../shared/enums/LinkedInCssSelector";

export const dismissSendInviteDialog = createEffect(() => {
  document.querySelector<HTMLButtonElement>(LinkedInCssSelector.DismissButtonFromSendInviteModal)?.click();
});
