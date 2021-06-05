import React from "react";
import { MdPeople, MdSearch } from "react-icons/md";
import { List, ListItem, Button } from "@chakra-ui/react";
import { openSearchPeoplePage } from "../effects/openSearchPeoplePage";
import { openMyNetworkPage } from "../effects/openMyNetworkPage";

export function PageSelection() {
  return (
    <List spacing={3}>
      <ListItem>
        <Button onClick={() => openMyNetworkPage()} leftIcon={<MdPeople />} isFullWidth>
          People You May Know
        </Button>
      </ListItem>
      <ListItem>
        <Button onClick={() => openSearchPeoplePage()} leftIcon={<MdSearch />} isFullWidth>
          Search People
        </Button>
      </ListItem>
    </List>
  );
}
