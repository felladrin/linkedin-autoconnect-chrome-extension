import { startButton, classHidden, stopButton } from "../constants";

export function hideStartAndStopButtons() {
  startButton?.classList.add(classHidden);
  stopButton?.classList.add(classHidden);
}
