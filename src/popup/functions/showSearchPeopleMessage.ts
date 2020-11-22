import { state } from "../constants/state";

export function showSearchPeopleMessage() {
  state.searchPeopleMessage.classList.remove(state.classHidden);
}
