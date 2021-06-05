import { forward, sample } from "effector";
import { MessageId } from "../../shared/enums/MessageId";
import { extensionMessageReceived } from "../../shared/events/extensionMessageReceived";
import { activeTabConnected } from "../events/activeTabConnected";
import { runningStateUpdated } from "../events/runningStateUpdated";

sample({
  clock: extensionMessageReceived[MessageId.ConnectionEstablished],
  target: activeTabConnected,
});

forward({
  from: extensionMessageReceived[MessageId.RunningStateUpdated].map(({ message }) => message.content),
  to: runningStateUpdated,
});
