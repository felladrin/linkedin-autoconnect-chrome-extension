import { popupOpened } from "./events/popupOpened";

// @ts-ignore
const modules = import.meta.globEager("./**/*.ts");

popupOpened();
