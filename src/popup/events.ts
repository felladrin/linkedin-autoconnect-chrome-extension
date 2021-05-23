import { createEvent } from "effector";

export const startButtonClicked = createEvent();
export const stopButtonClicked = createEvent();
export const searchPeopleButtonClicked = createEvent();
export const myNetworkButtonClicked = createEvent();
export const activeTabIdUpdated = createEvent<number>();
export const activeTabUrlUpdated = createEvent<string>();
export const autoConnectionStarted = createEvent();
export const autoConnectionStopped = createEvent();
export const autoConnectionStatusRequested = createEvent();
export const activeTabInfoReceived = createEvent<chrome.tabs.Tab>();
export const chromeTabUpdated = createEvent<chrome.tabs.Tab>();
