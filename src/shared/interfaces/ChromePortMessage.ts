import { Message } from "./Message";

export interface ChromePortMessage {
  message: Message;
  port: chrome.runtime.Port;
}
