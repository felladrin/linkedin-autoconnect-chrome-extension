import { copyStaticFilesToDist } from "./functions/copyStaticFilesToDist.js";
import { recreateDistFolder } from "./functions/recreateDistFolder.js";
import { executeVite } from "./functions/executeVite.js";

recreateDistFolder();
copyStaticFilesToDist();
executeVite({ mode: "development" });
