import React from "react";
import { useStore } from "effector-react";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import People from "@material-ui/icons/People";
import Search from "@material-ui/icons/Search";
import { searchPeopleButtonClicked, myNetworkButtonClicked } from "../events";
import { isOnSearchPeoplePageStore, isOnMyNetworkPageStore } from "../stores";

export function PageSelection() {
  const isOnSearchPeoplePage = useStore(isOnSearchPeoplePageStore);
  const isOnMyNetworkPage = useStore(isOnMyNetworkPageStore);

  if (isOnSearchPeoplePage || isOnMyNetworkPage) return null;

  return (
    <List>
      <ListItem button onClick={() => searchPeopleButtonClicked()}>
        <ListItemAvatar>
          <Avatar>
            <Search />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Search People" />
      </ListItem>
      <ListItem button onClick={() => myNetworkButtonClicked()}>
        <ListItemAvatar>
          <Avatar>
            <People />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="People You May Know" />
      </ListItem>
    </List>
  );
}
