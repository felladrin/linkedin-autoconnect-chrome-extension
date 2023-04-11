import { createEffect } from "effector";
import { LinkedInCssSelector } from "../../shared/enums/LinkedInCssSelector";
import { confirmSendInviteDialog } from "./confirmSendInviteDialog";

export const findNextAvailableConnectButton = createEffect(
  (selector: LinkedInCssSelector) =>
    new Promise((resolve) => {
      let attempts = 0;

      const interval = setInterval(() => {
        window.scrollTo(0, document.body.scrollHeight);
        confirmSendInviteDialog();
        const nextAvailableConnectButton = document.querySelector<HTMLButtonElement>(selector);

        if (nextAvailableConnectButton) {
          clearInterval(interval);
          resolve(nextAvailableConnectButton);
        } else if (++attempts > 5) {
          clearInterval(interval);
          resolve(null);
        }
      }, 500);
    })
);
