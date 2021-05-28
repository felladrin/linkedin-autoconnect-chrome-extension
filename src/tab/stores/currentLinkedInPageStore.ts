import { createStore } from "effector";
import { LinkedInPage } from "../../shared/enums/LinkedInPage";
import { searchPageLoaded, myNetworkPageLoaded } from "../events/pageLoaded";

export const currentLinkedInPageStore = createStore(LinkedInPage.Unidentified)
  .on(searchPageLoaded, () => LinkedInPage.SearchPeople)
  .on(myNetworkPageLoaded, () => LinkedInPage.MyNetwork);
