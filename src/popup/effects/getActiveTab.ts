import { createEffect } from "effector";

export const getActiveTab = createEffect(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
});
