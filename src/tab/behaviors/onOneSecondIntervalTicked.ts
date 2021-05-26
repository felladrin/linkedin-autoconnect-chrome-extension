import { combine, sample } from "effector";
import {
  lastLocationUpdated,
  navigatedToAnUnexpectedPageWhileRunning,
  oneSecondIntervalTicked,
} from "../events";
import { addPeopleFromRecommendedForYouPage } from "../functions/addPeopleFromRecommendedForYouPage";
import { addPeopleFromSearchPage } from "../functions/addPeopleFromSearchPage";
import { isOnRecommendedForYouPage } from "../functions/isOnRecommendedForYouPage";
import { isOnSearchPage } from "../functions/isOnSearchPage";
import { isRunningStore, lastLocationStore } from "../stores";

sample({
  clock: oneSecondIntervalTicked,
  source: combine(isRunningStore, lastLocationStore),
})
  .filter({
    fn: ([isAutoConnectionRunning, lastLocation]) =>
      isAutoConnectionRunning && window.location.href !== lastLocation,
  })
  .watch(() => {
    lastLocationUpdated(window.location.href);

    if (isOnSearchPage()) {
      addPeopleFromSearchPage();
    } else if (isOnRecommendedForYouPage()) {
      addPeopleFromRecommendedForYouPage();
    } else {
      navigatedToAnUnexpectedPageWhileRunning();
    }
  });
