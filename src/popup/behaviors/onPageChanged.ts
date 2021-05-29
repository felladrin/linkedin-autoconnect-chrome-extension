import { combine, guard } from "effector";
import { autoConnectionStatusRequested } from "../events/autoConnectionStatusRequested";
import { isOnSearchPeoplePageStore } from "../stores/isOnSearchPeoplePageStore";
import { isOnMyNetworkPageStore } from "../stores/isOnMyNetworkPageStore";

guard(combine(isOnSearchPeoplePageStore, isOnMyNetworkPageStore), {
  filter: ([isOnSearchPage, isOnMyNetworkPage]) =>
    isOnSearchPage || isOnMyNetworkPage,
}).watch(() => autoConnectionStatusRequested());
