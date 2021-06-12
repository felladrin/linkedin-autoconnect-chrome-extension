import { optionsPageOpened } from "../events/optionsPageOpened";
import { combine, forward, sample } from "effector";
import { maximumAutoConnectionsPerSessionStore } from "../../shared/stores/maximumAutoConnectionsPerSessionStore";
import { loadOptions } from "../../shared/effects/loadOptions";
import { renderOptionsPage } from "../effects/renderOptionsPage";

forward({
  from: optionsPageOpened,
  to: renderOptionsPage,
});

sample({
  clock: optionsPageOpened,
  source: combine({
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  target: loadOptions,
});
