export enum LinkedInSelector {
  SendNowButton = "div.send-invite > div.artdeco-modal__actionbar > button.artdeco-button--primary:enabled",
  CancelButton = "div.send-invite > button.artdeco-modal__dismiss",
  NextButton = "button.artdeco-pagination__button--next",
  ConnectButtonsFromRecommendedPage = "div.discover-entity-type-card__bottom-container button.ember-view:enabled",
  ConnectButtonsFromSearchPage = "li.reusable-search__result-container button.ember-view:enabled:not([data-control-id])",
}
