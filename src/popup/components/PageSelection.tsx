import React from "react";
import { useStore } from "effector-react";
import { Button, Typography } from "@material-ui/core";
import { searchPeopleButtonClicked, myNetworkButtonClicked } from "../events";
import { isOnSearchPeoplePageStore, isOnMyNetworkPageStore } from "../stores";

export function PageSelection() {
  const isOnSearchPeoplePage = useStore(isOnSearchPeoplePageStore);
  const isOnMyNetworkPage = useStore(isOnMyNetworkPageStore);

  if (isOnSearchPeoplePage || isOnMyNetworkPage) return null;

  return (
    <>
      <Typography component="p" variant="body2">
        Select one of the following LinkedIn Pages to open:
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => searchPeopleButtonClicked()}
      >
        Search People
      </Button>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => myNetworkButtonClicked()}
      >
        My Network
      </Button>
    </>
  );
}
