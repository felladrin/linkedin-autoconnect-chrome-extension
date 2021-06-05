import { createEffect } from "effector";
import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";

export const openSearchPeoplePage = createEffect(() => {
  chrome.tabs.create({ url: LinkedInUrl.SearchPeoplePage });
});
