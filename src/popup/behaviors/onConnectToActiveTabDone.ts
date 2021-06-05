import { forward } from "effector";
import { chromePortConnected } from "../../shared/events/chromePortConnected";
import { connectToActiveTab } from "../effects/connectToActiveTab";

forward({
  from: connectToActiveTab.doneData,
  to: chromePortConnected,
});
