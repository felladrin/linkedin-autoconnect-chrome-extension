import { MessageId } from "../../shared/enums/MessageId";
import { guard } from "effector";
import { stopButtonClicked } from "../events/stopButtonClicked";
import { chromePortStore } from "../../shared/stores/chromePortStore";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";

guard({
  clock: stopButtonClicked,
  source: chromePortStore,
  filter: (chromePort): chromePort is chrome.runtime.Port => chromePort !== null,
}).watch((chromePort) => {
  postChromePortMessage({ message: { id: MessageId.StopAutoConnect }, port: chromePort });
});
