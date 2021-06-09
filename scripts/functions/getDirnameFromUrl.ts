import { dirname } from "path";
import { fileURLToPath } from "url";

export function getDirnameFromUrl(url: string | URL) {
  return dirname(fileURLToPath(url));
}
