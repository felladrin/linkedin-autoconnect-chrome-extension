import React from "react";
import ReactDOM from "react-dom";
import { activeTabInfoReceived, chromeTabUpdated } from "./events";
import { App } from "./components/App";
import "./behaviors/onActiveTabInfoReceived";
import "./behaviors/onAutoConnectionStatusRequested";
import "./behaviors/onChromeTabUpdated";
import "./behaviors/onMyNetworkButtonClicked";
import "./behaviors/onPageChanged";
import "./behaviors/onSearchPeopleButtonClicked";
import "./behaviors/onStartButtonClicked";
import "./behaviors/onStopButtonClicked";

chrome.tabs.query({ active: true }, ([activeTab]) =>
  activeTabInfoReceived(activeTab)
);

chrome.tabs.onUpdated.addListener((_, __, updatedTab) =>
  chromeTabUpdated(updatedTab)
);

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement("div"))
);
