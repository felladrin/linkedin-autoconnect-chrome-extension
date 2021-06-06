import { MessageId } from "../../shared/enums/MessageId";
import { startButtonClicked } from "../events/startButtonClicked";
import { guard } from "effector";
import { chromePortStore } from "../../shared/stores/chromePortStore";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";

guard({
  clock: startButtonClicked,
  source: chromePortStore,
  filter: (chromePort): chromePort is chrome.runtime.Port => chromePort !== null,
}).watch((chromePort) => {
  postChromePortMessage({ message: { id: MessageId.StartAutoConnect }, port: chromePort });
});
