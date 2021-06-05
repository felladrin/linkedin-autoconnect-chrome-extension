import { forward } from "effector";
import { chromePortConnected } from "../../shared/events/chromePortConnected";
import { startListeningToChromePortMessages } from "../../shared/effects/startListeningToChromePortMessages";

forward({
  from: chromePortConnected,
  to: startListeningToChromePortMessages,
});
