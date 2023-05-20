import { createEffect } from "effector";
import { chromePortMessageReceived } from "./events";
import { ChromePortMessage } from "./interfaces";

export const delay = createEffect(
  (milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds))
);

export const loadOptions = createEffect(
  (options: { maximumAutoConnectionsPerSession: string }) =>
    new Promise<typeof options>((resolve) => {
      chrome.storage.sync.get(options, (items) => resolve(items as typeof options));
    })
);

export const postChromePortMessage = createEffect((chromePortMessage: ChromePortMessage) => {
  const { message, port } = chromePortMessage;
  port.postMessage(message);
});

export const startListeningToChromePortMessages = createEffect((port: chrome.runtime.Port) => {
  port.onMessage.addListener((message) => {
    chromePortMessageReceived({ message, port });
  });
});
