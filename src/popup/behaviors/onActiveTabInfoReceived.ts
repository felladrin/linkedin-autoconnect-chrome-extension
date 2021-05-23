import {
  activeTabIdUpdated,
  activeTabUrlUpdated,
  activeTabInfoReceived,
} from "../events";

activeTabInfoReceived.watch((activeTab) => {
  if (activeTab.id) activeTabIdUpdated(activeTab.id);

  if (activeTab.url) activeTabUrlUpdated(activeTab.url);
});
