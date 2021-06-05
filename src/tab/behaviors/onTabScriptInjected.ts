import { forward } from "effector";
import { tabScriptInjected } from "../events/tabScriptInjected";
import { startListeningToChromePortConnections } from "../effects/startListeningToChromePortConnections";
import { startOneSecondIntervalTicker } from "../effects/startOneSecondIntervalTicker";

forward({
  from: tabScriptInjected,
  to: [startListeningToChromePortConnections, startOneSecondIntervalTicker],
});
