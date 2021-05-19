import { selectOptionMessage, classHidden } from "../constants";

export function showSelectOptionMessage() {
  selectOptionMessage?.classList.remove(classHidden);
}
