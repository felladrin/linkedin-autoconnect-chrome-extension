import { startButton, classHidden, stopButton } from "../constants";

export function showStartButtonAndHideStopButton() {
  startButton?.classList.remove(classHidden);
  stopButton?.classList.add(classHidden);
}
