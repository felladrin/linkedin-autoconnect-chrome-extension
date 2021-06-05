import React from "react";
import { render } from "react-dom";
import { Popup } from "../components/Popup";
import { createEffect } from "effector";

export const renderPopup = createEffect(() => {
  render(React.createElement(Popup), document.body.appendChild(document.createElement("div")));
});
