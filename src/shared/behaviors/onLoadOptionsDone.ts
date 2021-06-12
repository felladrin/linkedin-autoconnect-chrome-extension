import { sample } from "effector";
import { loadOptions } from "../effects/loadOptions";
import { maximumAutoConnectionsPerSessionChanged } from "../events/maximumAutoConnectionsPerSessionChanged";

sample({
  clock: loadOptions.doneData,
  fn: ({ maximumAutoConnectionsPerSession }) => maximumAutoConnectionsPerSession,
  target: maximumAutoConnectionsPerSessionChanged
});
