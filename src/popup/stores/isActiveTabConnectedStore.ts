import { createStore } from "effector";
import { activeTabConnected } from "../events/activeTabConnected";

export const isActiveTabConnectedStore = createStore(false).on(activeTabConnected, () => true);
