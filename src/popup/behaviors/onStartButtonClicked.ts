import { MessageId } from "../../shared/enums/MessageId";
import { startButtonClicked } from "../events/startButtonClicked";
import { guard } from "effector";
import { chromePortStore } from "../../shared/stores/chromePortStore";
import { isNull } from "is-what";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";

guard({
  clock: startButtonClicked,
  source: chromePortStore,
  filter: (chromePort): chromePort is chrome.runtime.Port => !isNull(chromePort),
}).watch((chromePort) => {
  postChromePortMessage({ message: { id: MessageId.StartAutoConnect }, port: chromePort });
});
