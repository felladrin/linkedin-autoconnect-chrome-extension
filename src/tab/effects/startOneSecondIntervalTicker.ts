import { createEffect } from "effector";
import { oneSecondIntervalTicked } from "../events/oneSecondIntervalTicked";

export const startOneSecondIntervalTicker = createEffect(() =>
  setInterval(oneSecondIntervalTicked, 1000)
);
