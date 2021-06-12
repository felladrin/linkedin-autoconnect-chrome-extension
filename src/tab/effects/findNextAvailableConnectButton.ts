import { createEffect } from "effector";
import { LinkedInCssSelector } from "../../shared/enums/LinkedInCssSelector";

export const findNextAvailableConnectButton = createEffect((selector: LinkedInCssSelector) => {
  window.scrollTo(0, document.body.scrollHeight);
  return document.querySelector<HTMLButtonElement>(selector);
});
