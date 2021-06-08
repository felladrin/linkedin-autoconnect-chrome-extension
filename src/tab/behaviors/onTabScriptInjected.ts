import { combine, forward, sample } from "effector";
import { tabScriptInjected } from "../events/tabScriptInjected";
import { startListeningToChromePortConnections } from "../effects/startListeningToChromePortConnections";
import { startOneSecondIntervalTicker } from "../effects/startOneSecondIntervalTicker";
import { loadOptions } from "../../shared/effects/loadOptions";
import { maximumAutoConnectionsPerSessionStore } from "../../shared/stores/maximumAutoConnectionsPerSessionStore";

forward({
  from: tabScriptInjected,
  to: [startListeningToChromePortConnections, startOneSecondIntervalTicker],
});

sample({
  clock: tabScriptInjected,
  source: combine({
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  target: loadOptions,
});
