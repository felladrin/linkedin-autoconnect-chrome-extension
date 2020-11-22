import { state } from "../constants/state";

export function hideAllMessages() {
  state.searchPeopleMessage.classList.add(state.classHidden);
  state.recommendedForYouMessage.classList.add(state.classHidden);
  state.selectOptionMessage.classList.add(state.classHidden);
}
