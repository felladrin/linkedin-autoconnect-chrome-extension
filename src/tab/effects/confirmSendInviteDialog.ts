import { createEffect } from "effector";
import { LinkedInCssSelector } from "../../shared/enums/LinkedInCssSelector";

export const confirmSendInviteDialog = createEffect(() => {
  document.querySelector<HTMLButtonElement>(LinkedInCssSelector.SendButtonFromSendInviteModal)?.click();
});
