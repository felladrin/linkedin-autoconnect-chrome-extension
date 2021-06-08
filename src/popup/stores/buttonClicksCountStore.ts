import { restore } from "effector";
import { buttonClicksCountUpdated } from "../events/buttonClicksCountUpdated";

export const buttonClicksCountStore = restore(buttonClicksCountUpdated, 0);
