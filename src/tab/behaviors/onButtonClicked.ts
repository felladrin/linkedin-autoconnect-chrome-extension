import randomInt from "random-int";
import { buttonClickRequested } from "../events/buttonClickRequested";
import { buttonClicked } from "../events/buttonClicked";
import { delay } from "../functions/delay";

buttonClicked.watch(async () => {
  await delay(randomInt(1500, 3000));
  buttonClickRequested();
});
