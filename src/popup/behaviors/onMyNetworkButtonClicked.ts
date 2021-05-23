import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";
import { myNetworkButtonClicked } from "../events";

myNetworkButtonClicked.watch(() => {
  chrome.tabs.update({ url: LinkedInUrl.MyNetworkPage });
});
