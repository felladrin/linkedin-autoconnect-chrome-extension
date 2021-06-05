import { createEffect } from "effector";

export const delay = createEffect(
  (milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds))
);
