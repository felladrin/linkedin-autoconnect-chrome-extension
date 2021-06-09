import { createWriteStream } from "fs";
import { resolve } from "path";
import archiver from "archiver";
import { distPath, packageRootPath } from "../constants/paths.js";

export function zipDistFolder() {
  const zipFilename = resolve(packageRootPath, "linkedin-autoconnect-chrome-extension.zip");
  const output = createWriteStream(zipFilename);
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(output);

  output.on("close", () => console.log(`${zipFilename} created successfully! (${archive.pointer()} Bytes)`));

  archive.directory(distPath, false);

  archive.finalize();
}
