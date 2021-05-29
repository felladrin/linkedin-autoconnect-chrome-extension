import { restore } from "effector";
import { activeTabIdUpdated } from "../events/activeTabIdUpdated";

export const activeTabIdStore = restore(activeTabIdUpdated, 0);
