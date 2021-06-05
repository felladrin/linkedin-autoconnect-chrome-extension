import { popupOpened } from "../events/popupOpened";
import { getActiveTab } from "../effects/getActiveTab";
import { forward } from "effector";
import { renderPopup } from "../effects/renderPopup";

forward({
  from: popupOpened,
  to: [renderPopup, getActiveTab],
});
