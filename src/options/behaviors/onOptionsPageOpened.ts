import { optionsPageOpened } from "../events/optionsPageOpened";
import React from "react";
import { render } from "react-dom";
import { OptionsPage } from "../components/OptionsPage";
import { combine, sample } from "effector";
import { maximumAutoConnectionsPerSessionStore } from "../stores/maximumAutoConnectionsPerSessionStore";
import { loadOptions } from "../../shared/effects/loadOptions";

optionsPageOpened.watch(() =>
  render(
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
