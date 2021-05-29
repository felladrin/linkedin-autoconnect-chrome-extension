import { sample } from "effector";
import { saveOptions } from "../effects/saveOptions";
import { saveOptionsResultMessageOpened } from "../events/saveOptionsResultMessageOpened";

sample({
  clock: saveOptions.done,
  target: saveOptionsResultMessageOpened,
});
