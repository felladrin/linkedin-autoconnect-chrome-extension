import React from "react";
import ReactDOM from "react-dom";
import { activeTabInfoReceived, chromeTabUpdated } from "./events";
import { App } from "./components/App";
import "./behaviors/*.ts";

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
