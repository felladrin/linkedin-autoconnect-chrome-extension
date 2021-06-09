import { resolve } from "path";
import { getDirnameFromUrl } from "../functions/getDirnameFromUrl.js";

export const packageRootPath = resolve(getDirnameFromUrl(import.meta.url), "..", "..");
export const distPath = resolve(packageRootPath, "dist");
export const staticPath = resolve(packageRootPath, "static");
export const srcPath = resolve(packageRootPath, "src");
