import React from "react";
import { useStore } from "effector-react";
import { Button } from "@chakra-ui/react";
import { stopButtonClicked } from "../events/stopButtonClicked";
import { startButtonClicked } from "../events/startButtonClicked";
import { isOnSearchPeoplePageStore } from "../stores/isOnSearchPeoplePageStore";
import { isOnMyNetworkPageStore } from "../stores/isOnMyNetworkPageStore";
import { isAutoConnectionRunningStore } from "../stores/isAutoConnectionRunningStore";

export function StartStopButton() {
  const isOnSearchPeoplePage = useStore(isOnSearchPeoplePageStore);
  const isOnMyNetworkPage = useStore(isOnMyNetworkPageStore);
  const isAutoConnectionRunning = useStore(isAutoConnectionRunningStore);

  if (!isOnSearchPeoplePage && !isOnMyNetworkPage) return null;

  return (
    <Button
      colorScheme={isAutoConnectionRunning ? "red" : "green"}
      onClick={() =>
        isAutoConnectionRunning ? stopButtonClicked() : startButtonClicked()
      }
      isFullWidth
    >
      {isAutoConnectionRunning ? "STOP" : "START"} CONNECTING
    </Button>
  );
}
