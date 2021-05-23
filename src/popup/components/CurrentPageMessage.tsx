import React from "react";
import { useStore } from "effector-react";
import { Typography } from "@material-ui/core";
import { isOnSearchPeoplePageStore, isOnMyNetworkPageStore } from "../stores";

export function CurrentPageMessage() {
  const isOnSearchPeoplePage = useStore(isOnSearchPeoplePageStore);
  const isOnMyNetworkPage = useStore(isOnMyNetworkPageStore);

  return (
    <>
      <Typography component="p" variant="body2" hidden={!isOnSearchPeoplePage}>
        You're on 'Search People' page!
      </Typography>
      <Typography component="p" variant="body2" hidden={!isOnMyNetworkPage}>
        You're on 'My Network' page!
      </Typography>
    </>
  );
}
