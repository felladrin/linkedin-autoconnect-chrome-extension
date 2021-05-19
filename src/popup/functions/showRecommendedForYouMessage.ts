import { recommendedForYouMessage, classHidden } from "../constants";

export function showRecommendedForYouMessage() {
  recommendedForYouMessage?.classList.remove(classHidden);
}
