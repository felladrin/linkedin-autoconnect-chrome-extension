import { state } from "../constants/state";

export function showStartButtonAndHideStopButton() {
  state.startButton.classList.remove(state.classHidden);
  state.stopButton.classList.add(state.classHidden);
}
