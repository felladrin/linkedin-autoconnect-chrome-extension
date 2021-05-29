import { createStore } from "effector";
import { saveOptionsResultMessageClosed } from "../events/saveOptionsResultMessageClosed";
import { saveOptionsResultMessageOpened } from "../events/saveOptionsResultMessageOpened";

export const isSaveOptionsResultMessageOpenStore = createStore(false)
  .on(saveOptionsResultMessageOpened, () => true)
  .on(saveOptionsResultMessageClosed, () => false);
