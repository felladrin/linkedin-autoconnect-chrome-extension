import { copyStaticFilesToDist } from "./functions/copyStaticFilesToDist.js";
import { recreateDistFolder } from "./functions/recreateDistFolder.js";
import { executeVite } from "./functions/executeVite.js";

(async () => {
  recreateDistFolder();
  copyStaticFilesToDist();
  await executeVite({ watch: {}, mode: "development" });
})();
