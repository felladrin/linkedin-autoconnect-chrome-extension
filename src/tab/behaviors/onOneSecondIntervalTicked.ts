import { guard, sample } from "effector";
import { windowLocationUpdated } from "../events/windowLocationUpdated";
import { oneSecondIntervalTicked } from "../events/oneSecondIntervalTicked";
import { lastWindowLocationStore } from "../stores/lastWindowLocationStore";

guard(
  sample({
    clock: oneSecondIntervalTicked,
    source: lastWindowLocationStore,
  }),
  {
    filter: (lastWindowLocation) => window.location.href !== lastWindowLocation,
  }
).watch(() => windowLocationUpdated(window.location.href));
