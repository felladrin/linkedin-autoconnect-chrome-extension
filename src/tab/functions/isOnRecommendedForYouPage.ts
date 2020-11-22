import { LinkedInUrl } from "../../shared/enums/LinkedInUrl";

export function isOnRecommendedForYouPage() {
  return location.href.includes(LinkedInUrl.PatternOfMyNetworkPage);
}
