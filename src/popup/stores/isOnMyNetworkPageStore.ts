import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";
import { activeTabUrlStore } from "./activeTabUrlStore";

export const isOnMyNetworkPageStore = activeTabUrlStore.map((url) =>
  url.includes(LinkedInUrl.PatternOfMyNetworkPage)
);
