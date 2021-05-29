import { activeTabInfoReceived } from "../events/activeTabInfoReceived";
import { activeTabUrlUpdated } from "../events/activeTabUrlUpdated";
import { activeTabIdUpdated } from "../events/activeTabIdUpdated";

activeTabInfoReceived.watch((activeTab) => {
  if (activeTab.id) activeTabIdUpdated(activeTab.id);

  if (activeTab.url) activeTabUrlUpdated(activeTab.url);
});
