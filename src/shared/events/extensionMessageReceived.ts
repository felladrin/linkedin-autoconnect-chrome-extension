import { MessageId } from "../enums/MessageId";
import { split } from "effector";
import { chromePortMessageReceived } from "./chromePortMessageReceived";

export const extensionMessageReceived = split(chromePortMessageReceived, {
  [MessageId.ConnectionEstablished]: ({ message }) => message.id === MessageId.ConnectionEstablished,
  [MessageId.RunningStateUpdated]: ({ message }) => message.id === MessageId.RunningStateUpdated,
  [MessageId.StartAutoConnect]: ({ message }) => message.id === MessageId.StartAutoConnect,
  [MessageId.StopAutoConnect]: ({ message }) => message.id === MessageId.StopAutoConnect,
});
