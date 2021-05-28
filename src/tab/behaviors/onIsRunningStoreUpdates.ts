import { guard } from "effector";
import { buttonClickRequested } from "../events/buttonClickRequested";
import { isRunningStore } from "../stores/isRunningStore";

guard(isRunningStore.updates, {
  filter: (isRunning) => isRunning,
}).watch(() => buttonClickRequested());
