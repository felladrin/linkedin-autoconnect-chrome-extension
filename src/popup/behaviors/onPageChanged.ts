import { combine, guard } from "effector";
import { autoConnectionStatusRequested } from "../events";
import { isOnSearchPeoplePageStore, isOnMyNetworkPageStore } from "../stores";

guard(combine(isOnSearchPeoplePageStore, isOnMyNetworkPageStore), {
  filter: ([isOnSearchPage, isOnMyNetworkPage]) =>
    isOnSearchPage || isOnMyNetworkPage,
}).watch(() => autoConnectionStatusRequested());
