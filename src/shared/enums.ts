export enum LinkedInCssSelector {
  NextPageButton = "button.artdeco-pagination__button--next",
  ConnectButtonFromMyNetworkPage = "div.discover-entity-type-card__bottom-container button.ember-view:enabled:not(.artdeco-button--muted):not(.artdeco-button--full)",
  ConnectButtonFromSearchPage = "li.reusable-search__result-container div.entity-result__actions > div > button.ember-view:enabled:not(.artdeco-button--muted)",
  SendButtonFromSendInviteModal = "div.send-invite button.artdeco-button--primary",
}

export enum LinkedInPage {
  Unidentified,
  SearchPeople,
  MyNetwork,
}

export enum LinkedInUrl {
  SearchPeoplePage = "https://www.linkedin.com/search/results/people/",
  MyNetworkPage = "https://www.linkedin.com/mynetwork/",
  PatternOfSearchPage = "linkedin.com/search/results/people",
  PatternOfMyNetworkPage = "linkedin.com/mynetwork",
}

export enum MessageId {
  ConnectionEstablished,
  RunningStateUpdated,
  ButtonClicksCountUpdated,
  StartAutoConnect,
  StopAutoConnect,
}
