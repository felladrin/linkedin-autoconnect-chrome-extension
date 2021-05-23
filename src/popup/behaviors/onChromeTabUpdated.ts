import { sample } from "effector";
import { activeTabUrlUpdated, chromeTabUpdated } from "../events";
import { activeTabIdStore } from "../stores";

sample({
  clock: chromeTabUpdated,
  source: activeTabIdStore,
  fn: (activeTabId, updatedChromeTab) => ({ activeTabId, updatedChromeTab }),
})
  .filter({
    fn: ({ activeTabId, updatedChromeTab }) =>
      updatedChromeTab &&
      updatedChromeTab.id === activeTabId &&
      typeof updatedChromeTab.url !== "undefined",
  })
  .watch(({ updatedChromeTab }) => {
    activeTabUrlUpdated(updatedChromeTab?.url!);
  });
