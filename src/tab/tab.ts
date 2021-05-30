import { tabScriptInjected } from "./events/tabScriptInjected";

// @ts-ignore
const modules = import.meta.globEager("./**/*.ts");

tabScriptInjected();
