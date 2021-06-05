import { createEffect } from "effector";
import { LinkedInSelector } from "../enums/LinkedInSelector";

export const goToNextPage = createEffect(() => {
  document.querySelector<HTMLButtonElement>(LinkedInSelector.NextButton)?.click();
});
