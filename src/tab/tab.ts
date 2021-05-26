import { chromeMessageReceived, oneSecondIntervalTicked } from "./events";
import "./behaviors/*.ts";

setInterval(oneSecondIntervalTicked, 1000);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
  chromeMessageReceived({ message, sender, sendResponse })
);
