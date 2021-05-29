import { createStore } from "effector";
import { autoConnectionStopped } from "../events/autoConnectionStopped";
import { autoConnectionStarted } from "../events/autoConnectionStarted";

export const isAutoConnectionRunningStore = createStore(false)
  .on(autoConnectionStarted, () => true)
  .reset(autoConnectionStopped);
