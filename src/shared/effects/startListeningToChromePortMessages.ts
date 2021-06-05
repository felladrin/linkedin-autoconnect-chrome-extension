import { createEffect } from "effector";
import { chromePortMessageReceived } from "../events/chromePortMessageReceived";

export const startListeningToChromePortMessages = createEffect((port: chrome.runtime.Port) => {
  port.onMessage.addListener((message) => {
    chromePortMessageReceived({ message, port });
  });
});
