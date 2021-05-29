import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";
import { activeTabUrlStore } from "./activeTabUrlStore";

export const isOnSearchPeoplePageStore = activeTabUrlStore.map((url) =>
  url.includes(LinkedInUrl.PatternOfSearchPage)
);
