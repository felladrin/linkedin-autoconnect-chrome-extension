import { optionsPageOpened } from "../events/optionsPageOpened";
import React from "react";
import ReactDOM from "react-dom";
import { OptionsPage } from "../components/OptionsPage";
import { combine, sample } from "effector";
import { maximumAutoConnectionsPerSessionStore } from "../stores/maximumAutoConnectionsPerSessionStore";
import { loadOptions } from "../effects/loadOptions";

optionsPageOpened.watch(() =>
  ReactDOM.render(
    React.createElement(OptionsPage),
    document.body.appendChild(document.createElement("div"))
  )
);

sample({
  clock: optionsPageOpened,
  source: combine({
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  target: loadOptions,
});
