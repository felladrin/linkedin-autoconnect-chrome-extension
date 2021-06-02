import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";
import { searchPeopleButtonClicked } from "../events/searchPeopleButtonClicked";

searchPeopleButtonClicked.watch(() =>
  chrome.tabs.create({ url: LinkedInUrl.SearchPeoplePage })
);
