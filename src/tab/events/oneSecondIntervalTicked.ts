import { createEvent } from "effector";

export const oneSecondIntervalTicked = createEvent();

setInterval(oneSecondIntervalTicked, 1000);
