import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";

export function isOnSearchPage() {
  return location.href.includes(LinkedInUrl.PatternOfSearchPage);
}
