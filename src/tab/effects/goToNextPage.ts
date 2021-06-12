import { createEffect } from "effector";
import { LinkedInCssSelector } from "../../shared/enums/LinkedInCssSelector";

export const goToNextPage = createEffect(() => {
  document.querySelector<HTMLButtonElement>(LinkedInCssSelector.NextPageButton)?.click();
});
