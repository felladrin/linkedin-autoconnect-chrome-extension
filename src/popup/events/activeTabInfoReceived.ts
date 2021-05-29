import { createEvent } from "effector";

export const activeTabInfoReceived = createEvent<chrome.tabs.Tab>();
