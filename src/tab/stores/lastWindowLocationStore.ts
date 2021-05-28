import { restore } from "effector";
import { windowLocationUpdated } from "../events/windowLocationUpdated";

export const lastWindowLocationStore = restore(windowLocationUpdated, "");
