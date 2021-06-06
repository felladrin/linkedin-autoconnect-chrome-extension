import { guard, sample } from "effector";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";
import { MessageId } from "../../shared/enums/MessageId";
import { chromePortStore } from "../../shared/stores/chromePortStore";
import { buttonClickRequested } from "../events/buttonClickRequested";
import { isRunningStore } from "../stores/isRunningStore";

sample({
  clock: guard(isRunningStore.updates, { filter: (isRunning) => isRunning }),
  target: buttonClickRequested,
});

guard(
  sample({
    clock: isRunningStore.updates,
    source: chromePortStore,
    fn: (chromePort, isRunning) => ({ chromePort, isRunning }),
  }),
  {
    filter: (payload): payload is { chromePort: chrome.runtime.Port; isRunning: boolean } =>
      payload.chromePort !== null,
  }
).watch(({ chromePort, isRunning }) => {
  postChromePortMessage({ message: { id: MessageId.RunningStateUpdated, content: isRunning }, port: chromePort });
});
