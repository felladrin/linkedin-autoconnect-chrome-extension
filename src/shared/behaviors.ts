import { sample } from "effector";
import { loadOptions } from "./effects";
import { maximumAutoConnectionsPerSessionChanged } from "./events";

sample({
  clock: loadOptions.doneData,
  fn: ({ maximumAutoConnectionsPerSession }) => maximumAutoConnectionsPerSession,
  target: maximumAutoConnectionsPerSessionChanged,
});
