import { createEvent } from "effector";
import { ExtensionMessage } from "../../shared/enums/ExtensionMessage";

export const chromeMessageReceived =
  createEvent<{
    message: ExtensionMessage;
    sender: chrome.runtime.MessageSender;
    sendResponse: (response?: any) => void;
  }>();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
  chromeMessageReceived({ message, sender, sendResponse })
);
