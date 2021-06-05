import { sample } from "effector";
import { MessageId } from "../../shared/enums/MessageId";
import { extensionMessageReceived } from "../../shared/events/extensionMessageReceived";
import { started } from "../events/started";
import { stopped } from "../events/stopped";

sample({
  clock: extensionMessageReceived[MessageId.StartAutoConnect],
  target: started,
});

sample({
  clock: extensionMessageReceived[MessageId.StopAutoConnect],
  target: stopped,
});
