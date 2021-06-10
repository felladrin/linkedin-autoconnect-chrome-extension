import { guard, sample } from "effector";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";
import { MessageId } from "../../shared/enums/MessageId";
import { ChromePortMessage } from "../../shared/interfaces/ChromePortMessage";
import { Message } from "../../shared/interfaces/Message";
import { chromePortStore } from "../../shared/stores/chromePortStore";
import { buttonClickRequested } from "../events/buttonClickRequested";
import { isRunningStore } from "../stores/isRunningStore";

guard({ clock: isRunningStore.updates, filter: (isRunning) => isRunning, target: buttonClickRequested });

guard({
  clock: sample({
    clock: isRunningStore.updates,
    source: chromePortStore,
    fn: (chromePort, isRunning) => ({
      message: { id: MessageId.RunningStateUpdated, content: isRunning } as Message,
      port: chromePort,
    }),
  }),
  filter: (payload): payload is ChromePortMessage => payload.port !== null,
  target: postChromePortMessage,
});
