import { createStore } from "effector";
import { buttonClicked } from "../events/buttonClicked";

export const buttonClicksCountStore = createStore(0).on(buttonClicked, (state) => state + 1);
