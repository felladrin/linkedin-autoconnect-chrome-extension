import { createStore } from "effector";
import { unidentifiedPageLoaded } from "../events/pageLoaded";
import { started } from "../events/started";
import { stopped } from "../events/stopped";

export const isRunningStore = createStore(false)
  .on(started, () => true)
  .reset([stopped, unidentifiedPageLoaded]);
