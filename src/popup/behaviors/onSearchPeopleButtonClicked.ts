import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";
import { searchPeopleButtonClicked } from "../events";

searchPeopleButtonClicked.watch(() => {
  chrome.tabs.update({ url: LinkedInUrl.SearchPeoplePage });
});
