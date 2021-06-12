import { copyStaticFilesToDist } from "./functions/copyStaticFilesToDist.js";
import { recreateDistFolder } from "./functions/recreateDistFolder.js";
import { zipDistFolder } from "./functions/zipDistFolder.js";
import { executeVite } from "./functions/executeVite.js";
import { updateVersionInManifest } from "./functions/updateVersionInManifest.js";

recreateDistFolder();
copyStaticFilesToDist();
await updateVersionInManifest();
await executeVite({ mode: "production" });
zipDistFolder();
