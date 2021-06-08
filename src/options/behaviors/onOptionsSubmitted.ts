import { combine, sample } from "effector";
import { saveOptions } from "../effects/saveOptions";
import { optionsSubmitted } from "../events/optionsSubmitted";
import { maximumAutoConnectionsPerSessionStore } from "../../shared/stores/maximumAutoConnectionsPerSessionStore";

sample({
  clock: optionsSubmitted,
  source: combine({
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  target: saveOptions,
});
