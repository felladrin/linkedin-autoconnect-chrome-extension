import { forward } from "effector";
import { postChromePortMessage } from "../../shared/effects/postChromePortMessage";
import { MessageId } from "../../shared/enums/MessageId";
import { chromePortConnected } from "../../shared/events/chromePortConnected";
import { startListeningToChromePortMessages } from "../../shared/effects/startListeningToChromePortMessages";

forward({
  from: chromePortConnected,
  to: startListeningToChromePortMessages,
});

chromePortConnected.watch((port) => {
  postChromePortMessage({ message: { id: MessageId.ConnectionEstablished }, port });
});
