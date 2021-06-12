import randomInt from "random-int";
import { buttonClicked } from "../events/buttonClicked";
import { dismissSendInviteDialog } from "../effects/dismissSendInviteDialog";
import { sample } from "effector";
import { delayNextClick } from "../effects/delayNextClick";

sample({ clock: buttonClicked, target: dismissSendInviteDialog });

sample({
  clock: buttonClicked,
  fn: () => randomInt(1500, 3000),
  target: delayNextClick,
});
