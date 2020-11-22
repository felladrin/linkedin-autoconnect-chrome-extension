import { state } from "../constants/state";

export function showStopButtonAndHideStartButton() {
  state.stopButton.classList.remove(state.classHidden);
  state.startButton.classList.add(state.classHidden);
}
