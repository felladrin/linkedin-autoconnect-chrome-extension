import { optionsPageOpened } from "./events/optionsPageOpened";

// @ts-ignore
const modules = import.meta.globEager("./**/*.ts");

optionsPageOpened();
