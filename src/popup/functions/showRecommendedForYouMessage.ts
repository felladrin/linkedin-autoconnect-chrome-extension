import { state } from "../constants/state";

export function showRecommendedForYouMessage() {
  state.recommendedForYouMessage.classList.remove(state.classHidden);
}
