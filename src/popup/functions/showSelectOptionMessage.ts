import { state } from "../constants/state";

export function showSelectOptionMessage() {
  state.selectOptionMessage?.classList.remove(state.classHidden);
}
