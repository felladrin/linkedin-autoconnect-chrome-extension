import shell from "shelljs";
import { resolve } from "path";
import { distPath, staticPath } from "../constants/paths.js";

export function copyStaticFilesToDist() {
  shell.cp("-r", resolve(staticPath, "*"), distPath);
}
