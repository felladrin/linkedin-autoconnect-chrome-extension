import { popupOpened } from "../events/popupOpened";
import { getActiveTab } from "../effects/getActiveTab";
import { combine, forward, sample } from "effector";
import { renderPopup } from "../effects/renderPopup";
import { loadOptions } from "../../shared/effects/loadOptions";
import { maximumAutoConnectionsPerSessionStore } from "../../shared/stores/maximumAutoConnectionsPerSessionStore";

forward({
  from: popupOpened,
  to: [renderPopup, getActiveTab],
});

sample({
  clock: popupOpened,
  source: combine({
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  target: loadOptions,
});
