import React from "react";
import { render } from "react-dom";
import { OptionsPage } from "../components/OptionsPage";
import { createEffect } from "effector";

export const renderOptionsPage = createEffect(() =>
  render(React.createElement(OptionsPage), document.body.appendChild(document.createElement("div")))
);
