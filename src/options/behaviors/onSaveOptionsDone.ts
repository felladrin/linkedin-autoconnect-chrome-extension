import { saveOptions } from "../effects/saveOptions";
import { optionsSavedToast } from "../constants/optionsSavedToast";

saveOptions.done.watch(() =>
  optionsSavedToast({
    position: "top",
    title: "Options saved!",
    status: "success",
    duration: 2000,
    isClosable: true,
  })
);
