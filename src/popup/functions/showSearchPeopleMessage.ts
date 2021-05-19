import { searchPeopleMessage, classHidden } from "../constants";

export function showSearchPeopleMessage() {
  searchPeopleMessage?.classList.remove(classHidden);
}
