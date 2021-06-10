import { split } from "effector";
import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";
import { windowLocationUpdated } from "./windowLocationUpdated";

export const {
  searchPageLoaded,
  myNetworkPageLoaded,
  __: unidentifiedPageLoaded,
} = split(windowLocationUpdated, {
  searchPageLoaded: (windowLocation) => windowLocation.includes(LinkedInUrl.PatternOfSearchPage),
  myNetworkPageLoaded: (windowLocation) => windowLocation.includes(LinkedInUrl.PatternOfMyNetworkPage),
});
