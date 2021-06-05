import { createEvent } from "effector";
import { ChromePortMessage } from "../interfaces/ChromePortMessage";

export const chromePortMessageReceived = createEvent<ChromePortMessage>();
