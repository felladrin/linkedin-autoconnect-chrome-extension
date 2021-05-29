import { createEffect } from "effector";
import { chromeMessageReceived } from "../events/chromeMessageReceived";

export const startListeningToChromeMessages = createEffect(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
    chromeMessageReceived({ message, sender, sendResponse })
  );
});
