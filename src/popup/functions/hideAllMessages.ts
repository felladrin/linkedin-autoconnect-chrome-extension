import {
  searchPeopleMessage,
  classHidden,
  recommendedForYouMessage,
  selectOptionMessage,
} from "../constants";

export function hideAllMessages() {
  searchPeopleMessage?.classList.add(classHidden);
  recommendedForYouMessage?.classList.add(classHidden);
  selectOptionMessage?.classList.add(classHidden);
}
