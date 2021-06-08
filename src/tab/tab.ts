import { tabScriptInjected } from "./events/tabScriptInjected";
!import.meta.globEager("../shared/behaviors/*.ts");
!import.meta.globEager("./**/*.ts");

tabScriptInjected();
