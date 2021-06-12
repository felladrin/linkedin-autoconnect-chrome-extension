import { MessageId } from "../../shared/enums/MessageId";
import { guard, sample } from "effector";
import { stopButtonClicked } from "../events/stopButtonClicked";
import { chromePortStore } from "../../shared/stores/chromePortStore";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";
import { Message } from "../../shared/interfaces/Message";
import { ChromePortMessage } from "../../shared/interfaces/ChromePortMessage";

guard({
  clock: sample({
    clock: stopButtonClicked,
    source: chromePortStore,
    fn: (chromePort) => ({
      message: { id: MessageId.StopAutoConnect } as Message,
      port: chromePort,
    }),
  }),
  filter: (payload): payload is ChromePortMessage => payload.port !== null,
  target: postChromePortMessage,
});
