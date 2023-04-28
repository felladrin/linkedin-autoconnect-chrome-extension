import { copyStaticFilesToDist } from "./functions/copyStaticFilesToDist.js";
import { recreateDistFolder } from "./functions/recreateDistFolder.js";
import { executeVite } from "./functions/executeVite.js";
import { updateVersionInManifest } from "./functions/updateVersionInManifest.js";

(async () => {
  recreateDistFolder();
  copyStaticFilesToDist();
  await updateVersionInManifest();
  await executeVite({ mode: "development" });
})();
