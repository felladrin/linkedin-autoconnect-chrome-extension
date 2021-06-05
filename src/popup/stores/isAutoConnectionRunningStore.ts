import { restore } from "effector";
import { runningStateUpdated } from "../events/runningStateUpdated";

export const isAutoConnectionRunningStore = restore(runningStateUpdated, false);
