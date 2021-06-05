import React from "react";
import { useStore } from "effector-react";
import { Button } from "@chakra-ui/react";
import { stopButtonClicked } from "../events/stopButtonClicked";
import { startButtonClicked } from "../events/startButtonClicked";
import { isAutoConnectionRunningStore } from "../stores/isAutoConnectionRunningStore";

export function StartStopButton() {
  const isAutoConnectionRunning = useStore(isAutoConnectionRunningStore);

  return (
    <Button
      colorScheme={isAutoConnectionRunning ? "red" : "green"}
      onClick={() => (isAutoConnectionRunning ? stopButtonClicked() : startButtonClicked())}
      isFullWidth
    >
      {isAutoConnectionRunning ? "STOP" : "START"} CONNECTING
    </Button>
  );
}
