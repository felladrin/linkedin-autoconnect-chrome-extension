import { createEffect } from "effector";
import { LinkedInCssSelector } from "../../shared/enums/LinkedInCssSelector";

export const confirmSendInviteDialog = createEffect(
  () =>
    new Promise((resolve) => {
      let attempts = 0;

      const interval = setInterval(() => {
        const sendButton = document.querySelector<HTMLButtonElement>(LinkedInCssSelector.SendButtonFromSendInviteModal);

        sendButton?.click();

        if (sendButton || ++attempts > 5) {
          clearInterval(interval);
          resolve(null);
        }
      }, 500);
    })
);
