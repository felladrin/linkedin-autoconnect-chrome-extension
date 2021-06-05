import { createEffect } from "effector";
import { ChromePortMessage } from "../interfaces/ChromePortMessage";

export const postChromePortMessage = createEffect((chromePortMessage: ChromePortMessage) => {
  const { message, port } = chromePortMessage;
  port.postMessage(message);
});
