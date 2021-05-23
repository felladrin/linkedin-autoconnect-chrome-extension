import { LinkedInUrl } from "../shared/enums/LinkedInUrl";
import { createStore, restore } from "effector";
import {
  activeTabIdUpdated,
  activeTabUrlUpdated,
  autoConnectionStarted,
  autoConnectionStopped,
} from "./events";

export const activeTabIdStore = restore(activeTabIdUpdated, 0);
const activeTabUrlStore = restore(activeTabUrlUpdated, "");
export const isOnSearchPeoplePageStore = activeTabUrlStore.map((url) =>
  url.includes(LinkedInUrl.PatternOfSearchPage)
);
export const isOnMyNetworkPageStore = activeTabUrlStore.map((url) =>
  url.includes(LinkedInUrl.PatternOfMyNetworkPage)
);
export const isAutoConnectionRunningStore = createStore(false)
  .on(autoConnectionStarted, () => true)
  .reset(autoConnectionStopped);
