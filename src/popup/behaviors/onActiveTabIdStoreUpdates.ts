import { forward } from "effector";
import { activeTabIdStore } from "../stores/activeTabIdStore";
import { connectToActiveTab } from "../effects/connectToActiveTab";

forward({
  from: activeTabIdStore.updates,
  to: connectToActiveTab,
});
