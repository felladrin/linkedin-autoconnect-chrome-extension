import { myNetworkPageLoaded } from "../events/pageLoaded";
import { buttonClickRequested } from "../events/buttonClickRequested";
import { guard } from "effector";
import { isRunningStore } from "../stores/isRunningStore";

guard({ clock: myNetworkPageLoaded, filter: isRunningStore, target: buttonClickRequested });
