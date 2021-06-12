import { MessageId } from "../../shared/enums/MessageId";
import { startButtonClicked } from "../events/startButtonClicked";
import { guard, sample } from "effector";
import { chromePortStore } from "../../shared/stores/chromePortStore";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";
import { Message } from "../../shared/interfaces/Message";
import { ChromePortMessage } from "../../shared/interfaces/ChromePortMessage";

guard({
  clock: sample({
    clock: startButtonClicked,
    source: chromePortStore,
    fn: (chromePort) => ({
      message: { id: MessageId.StartAutoConnect } as Message,
      port: chromePort,
    }),
  }),
  filter: (payload): payload is ChromePortMessage => payload.port !== null,
  target: postChromePortMessage,
});
