import { createEffect } from "effector";

export const loadOptions = createEffect(
  (options: { maximumAutoConnectionsPerSession: string }) =>
    new Promise<typeof options>((resolve) => {
      chrome.storage.sync.get(options, (items) =>
        resolve(items as typeof options)
      );
    })
);
