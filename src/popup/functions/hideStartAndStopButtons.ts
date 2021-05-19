import { state } from "../constants/state";

export function hideStartAndStopButtons() {
  state.startButton?.classList.add(state.classHidden);
  state.stopButton?.classList.add(state.classHidden);
}
