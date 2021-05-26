import { combine, sample } from "effector";
import { windowLocationUpdated, oneSecondIntervalTicked } from "../events";
import { isRunningStore, lastWindowLocationStore } from "../stores";

sample({
  clock: oneSecondIntervalTicked,
  source: combine({
    isRunning: isRunningStore,
    lastWindowLocation: lastWindowLocationStore,
  }),
})
  .filter({
    fn: ({ isRunning, lastWindowLocation }) =>
      isRunning && window.location.href !== lastWindowLocation,
  })
  .watch(() => windowLocationUpdated(window.location.href));
