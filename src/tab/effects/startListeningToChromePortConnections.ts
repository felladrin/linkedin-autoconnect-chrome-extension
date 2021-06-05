import { createEffect } from "effector";
import { chromePortConnected } from "../../shared/events/chromePortConnected";

export const startListeningToChromePortConnections = createEffect(() =>
  chrome.runtime.onConnect.addListener(chromePortConnected)
);
