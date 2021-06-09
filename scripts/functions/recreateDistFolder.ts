import shell from "shelljs";
import { distPath } from "../constants/paths.js";

export function recreateDistFolder() {
  shell.rm("-rf", distPath);
  shell.mkdir(distPath);
}
