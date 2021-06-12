import { createStandaloneToast } from "@chakra-ui/react";
import { createEffect } from "effector";

const optionsSavedToast = createStandaloneToast();

export const displayOptionsSavedToast = createEffect(() =>
  optionsSavedToast({
    position: "top",
    title: "Options saved!",
    status: "success",
    duration: 2000,
    isClosable: true,
  })
);
