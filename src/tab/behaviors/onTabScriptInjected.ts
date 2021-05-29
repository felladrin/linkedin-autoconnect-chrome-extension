import { forward } from "effector";
import { tabScriptInjected } from "../events/tabScriptInjected";
import { startListeningToChromeMessages } from "../effects/startListeningToChromeMessages";
import { startOneSecondIntervalTicker } from "../effects/startOneSecondIntervalTicker";

forward({
  from: tabScriptInjected,
  to: startListeningToChromeMessages,
});

forward({
  from: tabScriptInjected,
  to: startOneSecondIntervalTicker,
});
