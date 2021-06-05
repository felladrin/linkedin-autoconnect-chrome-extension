import { createEffect } from "effector";
import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";

export const openMyNetworkPage = createEffect(() => {
  chrome.tabs.create({ url: LinkedInUrl.MyNetworkPage });
});
