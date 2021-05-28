import { createEffect } from "effector";

export const clickButton = createEffect((button: HTMLButtonElement) => {
  button.focus();
  button.click();
  button.setAttribute("disabled", "disabled");
});
