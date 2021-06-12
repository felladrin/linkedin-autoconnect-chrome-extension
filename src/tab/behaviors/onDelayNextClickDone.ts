import { forward } from "effector";
import { delayNextClick } from "../effects/delayNextClick";
import { buttonClickRequested } from "../events/buttonClickRequested";

forward({ from: delayNextClick.doneData, to: buttonClickRequested });
