import { restore } from "effector";
import { maximumAutoConnectionsPerSessionChanged } from "../events/maximumAutoConnectionsPerSessionChanged";

export const maximumAutoConnectionsPerSessionStore = restore(maximumAutoConnectionsPerSessionChanged, "100");
