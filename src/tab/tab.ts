import { ExtensionMessage } from "../shared/enums/ExtensionMessage";
import { checkIfUrlHasChanged } from "./functions/checkIfUrlHasChanged";
import { state } from "./constants/state";

setInterval(checkIfUrlHasChanged, 1000);

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, _, sendResponse) => {
    switch (message) {
      case ExtensionMessage.IsAutoConnectAvailable:
        sendResponse(true);
        break;
      case ExtensionMessage.IsAutoConnectRunning:
        sendResponse(state.isAutoConnectRunning);
        break;
      case ExtensionMessage.StartAutoConnect:
        state.isAutoConnectRunning = true;
        sendResponse(state.isAutoConnectRunning);
        break;
      case ExtensionMessage.StopAutoConnect:
        state.isAutoConnectRunning = false;
        state.autoConnectLastLocation = "";
        sendResponse(state.isAutoConnectRunning);
        break;
    }
  }
);
