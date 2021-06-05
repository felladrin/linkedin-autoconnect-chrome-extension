import { restore } from "effector";
import { chromePortConnected } from "../events/chromePortConnected";

export const chromePortStore = restore(chromePortConnected, null);
