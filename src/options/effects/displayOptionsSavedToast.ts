import { createStandaloneToast } from "@chakra-ui/react";
import { createEffect } from "effector";

export const {ToastContainer, toast} = createStandaloneToast();

export const displayOptionsSavedToast = createEffect(() =>
toast({
    position: "top",
    title: "Options saved!",
    status: "success",
    duration: 2000,
    isClosable: true,
  })
);
