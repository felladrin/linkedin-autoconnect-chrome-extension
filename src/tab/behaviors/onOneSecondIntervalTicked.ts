import { guard } from "effector";
import { windowLocationUpdated } from "../events/windowLocationUpdated";
import { oneSecondIntervalTicked } from "../events/oneSecondIntervalTicked";
import { lastWindowLocationStore } from "../stores/lastWindowLocationStore";

guard({
  clock: oneSecondIntervalTicked,
  source: lastWindowLocationStore,
  filter: (lastWindowLocation) => window.location.href !== lastWindowLocation,
  target: windowLocationUpdated.prepend(() => window.location.href),
});
