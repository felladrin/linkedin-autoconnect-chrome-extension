import { guard } from "effector";
import { isNumber } from "is-what";
import { activeTabInfoReceived } from "./activeTabInfoReceived";

export const activeTabIdUpdated = guard(activeTabInfoReceived, { filter: ({ id }) => isNumber(id) }).map(
  ({ id }) => id as number
);
