import { stopButton, classHidden, startButton } from "../constants";

export function showStopButtonAndHideStartButton() {
  stopButton?.classList.remove(classHidden);
  startButton?.classList.add(classHidden);
}
