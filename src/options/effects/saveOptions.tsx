import { createEffect } from "effector";

export const saveOptions = createEffect(
  (options: { maximumAutoConnectionsPerSession: string }) =>
    new Promise<void>((resolve) => {
      chrome.storage.sync.set(options, resolve);
    })
);
