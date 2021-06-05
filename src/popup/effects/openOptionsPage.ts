import { createEffect } from "effector";

export const openOptionsPage = createEffect(() => {
  chrome.runtime.openOptionsPage();
});
