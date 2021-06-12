import { distPath, packageRootPath } from "../constants/paths.js";
import { resolve } from "path";
import { readFile, writeFile } from "fs/promises";

export async function updateVersionInManifest() {
  const manifestJsonPath = resolve(distPath, "manifest.json");
  const packageJsonPath = resolve(packageRootPath, "package.json");

  const manifestJsonContent = JSON.parse(await readFile(manifestJsonPath, { encoding: "utf-8" }));
  const packageJsonContent = JSON.parse(await readFile(packageJsonPath, { encoding: "utf-8" }));

  manifestJsonContent.version = packageJsonContent.version;

  await writeFile(manifestJsonPath, JSON.stringify(manifestJsonContent, null, 2));
}
