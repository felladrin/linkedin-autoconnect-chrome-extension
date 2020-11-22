import { addPeopleFromRecommendedForYouPage } from "./addPeopleFromRecommendedForYouPage";
import { addPeopleFromSearchPage } from "./addPeopleFromSearchPage";
import { isOnRecommendedForYouPage } from "./isOnRecommendedForYouPage";
import { isOnSearchPage } from "./isOnSearchPage";
import { state } from "../constants/state";

export function checkIfUrlHasChanged() {
  if (
    !state.isAutoConnectRunning ||
    location.href === state.autoConnectLastLocation
  )
    return;

  state.autoConnectLastLocation = location.href;

  if (isOnSearchPage()) {
    addPeopleFromSearchPage();
  } else if (isOnRecommendedForYouPage()) {
    addPeopleFromRecommendedForYouPage();
  } else {
    state.isAutoConnectRunning = false;
  }
}
