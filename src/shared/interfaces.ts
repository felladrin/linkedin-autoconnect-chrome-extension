import { MessageId } from "./enums";

export interface Message {
  id: MessageId;
  content?: any;
}

export interface ChromePortMessage {
  message: Message;
  port: chrome.runtime.Port;
}
