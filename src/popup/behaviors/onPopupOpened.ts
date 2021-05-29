import { popupOpened } from "../events/popupOpened";
import React from "react";
import ReactDOM from "react-dom";
import { Popup } from "../components/Popup";
import { activeTabInfoReceived } from "../events/activeTabInfoReceived";
import { chromeTabUpdated } from "../events/chromeTabUpdated";

popupOpened.watch(() => {
  chrome.tabs.query({ active: true }, ([activeTab]) =>
    activeTabInfoReceived(activeTab)
  );

  chrome.tabs.onUpdated.addListener((_, __, updatedTab) =>
    chromeTabUpdated(updatedTab)
  );

  ReactDOM.render(
    React.createElement(Popup),
    document.body.appendChild(document.createElement("div"))
  );
});
