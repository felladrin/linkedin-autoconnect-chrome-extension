import React from "react";
import { useStore } from "effector-react";
import { Typography } from "@material-ui/core";
import { isOnSearchPeoplePageStore, isOnMyNetworkPageStore } from "../stores";

export function CurrentPageMessage() {
  const isOnSearchPeoplePage = useStore(isOnSearchPeoplePageStore);
  const isOnMyNetworkPage = useStore(isOnMyNetworkPageStore);

  if (!isOnSearchPeoplePage && !isOnMyNetworkPage) return null;

  return (
    <Typography component="p" variant="body2">
      You're on '{isOnSearchPeoplePage ? "Search People" : "My Network"}' page!
    </Typography>
  );
}
