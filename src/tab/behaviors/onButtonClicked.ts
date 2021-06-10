import randomInt from "random-int";
import { buttonClickRequested } from "../events/buttonClickRequested";
import { buttonClicked } from "../events/buttonClicked";
import { delay } from "../../shared/effects/delay";
import { dismissSendInviteDialog } from "../effects/dismissSendInviteDialog";
import { attach, forward, sample } from "effector";

sample({ clock: buttonClicked, target: dismissSendInviteDialog });

forward({
  from: buttonClicked.map(() => randomInt(1500, 3000)),
  to: (() => {
    const delayNextClick = attach({ effect: delay });
    forward({ from: delayNextClick.doneData, to: buttonClickRequested });
    return delayNextClick;
  })(),
});
