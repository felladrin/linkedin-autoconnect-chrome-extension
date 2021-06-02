import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";
import { myNetworkButtonClicked } from "../events/myNetworkButtonClicked";

myNetworkButtonClicked.watch(() =>
  chrome.tabs.create({ url: LinkedInUrl.MyNetworkPage })
);
