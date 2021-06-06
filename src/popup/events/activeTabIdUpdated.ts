import { guard } from "effector";
import { activeTabInfoReceived } from "./activeTabInfoReceived";

export const activeTabIdUpdated = guard(activeTabInfoReceived, { filter: ({ id }) => id !== undefined }).map(
  ({ id }) => id as number
);
