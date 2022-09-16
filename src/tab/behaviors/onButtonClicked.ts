import randomInt from "random-int";
import { buttonClicked } from "../events/buttonClicked";
import { confirmSendInviteDialog } from "../effects/dismissSendInviteDialog";
import { combine, guard, sample } from "effector";
import { delayNextClick } from "../effects/delayNextClick";
import { stopped } from "../events/stopped";
import { buttonClicksCountStore } from "../stores/buttonClicksCountStore";
import { maximumAutoConnectionsPerSessionStore } from "../../shared/stores/maximumAutoConnectionsPerSessionStore";

sample({ clock: buttonClicked, target: confirmSendInviteDialog });

sample({
  clock: buttonClicked,
  fn: () => randomInt(1500, 3000),
  target: delayNextClick,
});

guard({
  clock: buttonClicked,
  source: combine({
    buttonClicksCount: buttonClicksCountStore,
    maximumAutoConnectionsPerSession: maximumAutoConnectionsPerSessionStore,
  }),
  filter: ({ buttonClicksCount, maximumAutoConnectionsPerSession }) =>
    buttonClicksCount >= Number(maximumAutoConnectionsPerSession),
  target: stopped,
});
