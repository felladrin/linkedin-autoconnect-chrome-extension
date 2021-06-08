import { guard, sample } from "effector";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";
import { MessageId } from "../../shared/enums/MessageId";
import { chromePortStore } from "../../shared/stores/chromePortStore";
import { buttonClicksCountStore } from "../stores/buttonClicksCountStore";

guard(
  sample({
    clock: buttonClicksCountStore.updates,
    source: chromePortStore,
    fn: (chromePort, buttonClicksCount) => ({ chromePort, buttonClicksCount }),
  }),
  {
    filter: (payload): payload is { chromePort: chrome.runtime.Port; buttonClicksCount: number } =>
      payload.chromePort !== null,
  }
).watch(({ chromePort, buttonClicksCount }) => {
  postChromePortMessage({
    message: { id: MessageId.ButtonClicksCountUpdated, content: buttonClicksCount },
    port: chromePort,
  });
});
