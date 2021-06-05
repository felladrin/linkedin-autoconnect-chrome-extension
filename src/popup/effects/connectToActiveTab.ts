import { createEffect } from "effector";

export const connectToActiveTab = createEffect((activeTabId: number) => chrome.tabs.connect(activeTabId));
