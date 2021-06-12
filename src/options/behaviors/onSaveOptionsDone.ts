import { saveOptions } from "../effects/saveOptions";
import { forward } from "effector";
import { displayOptionsSavedToast } from "../effects/displayOptionsSavedToast";

forward({
  from: saveOptions.doneData,
  to: displayOptionsSavedToast,
});
