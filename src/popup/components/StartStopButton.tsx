import React from "react";
import { useStore } from "effector-react";
import Button from "@material-ui/core/Button";
import { stopButtonClicked, startButtonClicked } from "../events";
import {
  isOnSearchPeoplePageStore,
  isOnMyNetworkPageStore,
  isAutoConnectionRunningStore,
} from "../stores";

export function StartStopButton() {
  const isOnSearchPeoplePage = useStore(isOnSearchPeoplePageStore);
  const isOnMyNetworkPage = useStore(isOnMyNetworkPageStore);
  const isAutoConnectionRunning = useStore(isAutoConnectionRunningStore);

  if (!isOnSearchPeoplePage && !isOnMyNetworkPage) return null;

  return (
    <Button
      variant="contained"
      color={isAutoConnectionRunning ? "secondary" : "primary"}
      fullWidth
      onClick={() =>
        isAutoConnectionRunning ? stopButtonClicked() : startButtonClicked()
      }
    >
      {isAutoConnectionRunning ? "STOP" : "START"} CONNECTING
    </Button>
  );
}
