import { guard, sample } from "effector";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";
import { MessageId } from "../../shared/enums/MessageId";
import { ChromePortMessage } from "../../shared/interfaces/ChromePortMessage";
import { Message } from "../../shared/interfaces/Message";
import { chromePortStore } from "../../shared/stores/chromePortStore";
import { buttonClicksCountStore } from "../stores/buttonClicksCountStore";

guard({
  clock: sample({
    clock: buttonClicksCountStore.updates,
    source: chromePortStore,
    fn: (chromePort, buttonClicksCount) => ({
      message: { id: MessageId.ButtonClicksCountUpdated, content: buttonClicksCount } as Message,
      port: chromePort,
    }),
  }),
  filter: (payload): payload is ChromePortMessage => payload.port !== null,
  target: postChromePortMessage,
});
