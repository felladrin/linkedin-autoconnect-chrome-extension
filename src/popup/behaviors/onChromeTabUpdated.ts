import { sample } from "effector";
import { chromeTabUpdated } from "../events/chromeTabUpdated";
import { activeTabUrlUpdated } from "../events/activeTabUrlUpdated";
import { activeTabIdStore } from "../stores/activeTabIdStore";

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
