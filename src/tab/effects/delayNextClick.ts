import { attach } from "effector";
import { delay } from "../../shared/effects/delay";

export const delayNextClick = attach({ effect: delay });
