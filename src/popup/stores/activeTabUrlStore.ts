import { restore } from "effector";
import { activeTabUrlUpdated } from "../events/activeTabUrlUpdated";

export const activeTabUrlStore = restore(activeTabUrlUpdated, "");
