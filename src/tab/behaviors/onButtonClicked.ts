import randomInt from "random-int";
import { buttonClickRequested } from "../events/buttonClickRequested";
import { buttonClicked } from "../events/buttonClicked";
import { delay } from "../../shared/effects/delay";
import { dismissSendInviteDialog } from "../effects/dismissSendInviteDialog";
import { sample } from "effector";

sample({
  clock: buttonClicked,
  target: dismissSendInviteDialog,
});

buttonClicked.watch(async () => {
  await delay(randomInt(1500, 3000));
  buttonClickRequested();
});
