import { forward, sample } from "effector";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";
import { MessageId } from "../../shared/enums/MessageId";
import { chromePortConnected } from "../../shared/events/chromePortConnected";
import { startListeningToChromePortMessages } from "../../shared/effects/startListeningToChromePortMessages";
import { buttonClicksCountStore } from "../stores/buttonClicksCountStore";
import { isRunningStore } from "../stores/isRunningStore";

forward({ from: chromePortConnected, to: startListeningToChromePortMessages });

forward({
  from: chromePortConnected.map((port) => ({ message: { id: MessageId.ConnectionEstablished }, port })),
  to: postChromePortMessage,
});

sample({
  clock: chromePortConnected,
  source: isRunningStore,
  fn: (isRunning, port) => ({ message: { id: MessageId.RunningStateUpdated, content: isRunning }, port }),
  target: postChromePortMessage,
});

sample({
  clock: chromePortConnected,
  source: buttonClicksCountStore,
  fn: (buttonClicksCount, port) => ({
    message: { id: MessageId.ButtonClicksCountUpdated, content: buttonClicksCount },
    port,
  }),
  target: postChromePortMessage,
});
