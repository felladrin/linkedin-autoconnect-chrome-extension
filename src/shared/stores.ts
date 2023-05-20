import { restore } from "effector";
import { chromePortConnected, maximumAutoConnectionsPerSessionChanged } from "./events";

export const chromePortStore = restore(chromePortConnected, null);

export const maximumAutoConnectionsPerSessionStore = restore(maximumAutoConnectionsPerSessionChanged, "100");
