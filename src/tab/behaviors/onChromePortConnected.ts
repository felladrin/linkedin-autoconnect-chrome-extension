import { combine, forward, sample } from "effector";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";
import { MessageId } from "../../shared/enums/MessageId";
import { chromePortConnected } from "../../shared/events/chromePortConnected";
import { startListeningToChromePortMessages } from "../../shared/effects/startListeningToChromePortMessages";
import { buttonClicksCountStore } from "../stores/buttonClicksCountStore";
import { isRunningStore } from "../stores/isRunningStore";

forward({
  from: chromePortConnected,
  to: startListeningToChromePortMessages,
});

sample({
  clock: chromePortConnected,
  source: combine({ isRunning: isRunningStore, buttonClicksCount: buttonClicksCountStore }),
  fn: ({ isRunning, buttonClicksCount }, port) => ({ isRunning, buttonClicksCount, port }),
}).watch(({ isRunning, buttonClicksCount, port }) => {
  postChromePortMessage({ message: { id: MessageId.ConnectionEstablished }, port });
  postChromePortMessage({ message: { id: MessageId.RunningStateUpdated, content: isRunning }, port });
  postChromePortMessage({ message: { id: MessageId.ButtonClicksCountUpdated, content: buttonClicksCount }, port });
});
