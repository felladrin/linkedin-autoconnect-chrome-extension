import React from "react";
import { useStore } from "effector-react";
import { MdPeople, MdSearch } from "react-icons/md";
import { List, ListItem, Button } from "@chakra-ui/react";
import { myNetworkButtonClicked } from "../events/myNetworkButtonClicked";
import { searchPeopleButtonClicked } from "../events/searchPeopleButtonClicked";
import { isOnSearchPeoplePageStore } from "../stores/isOnSearchPeoplePageStore";
import { isOnMyNetworkPageStore } from "../stores/isOnMyNetworkPageStore";

export function PageSelection() {
  const isOnSearchPeoplePage = useStore(isOnSearchPeoplePageStore);
  const isOnMyNetworkPage = useStore(isOnMyNetworkPageStore);

  if (isOnSearchPeoplePage || isOnMyNetworkPage) return null;

  return (
    <List spacing={3}>
      <ListItem>
        <Button
          onClick={() => myNetworkButtonClicked()}
          leftIcon={<MdPeople />}
          isFullWidth
        >
          People You May Know
        </Button>
      </ListItem>
      <ListItem>
        <Button
          onClick={() => searchPeopleButtonClicked()}
          leftIcon={<MdSearch />}
          isFullWidth
        >
          Search People
        </Button>
      </ListItem>
    </List>
  );
}
