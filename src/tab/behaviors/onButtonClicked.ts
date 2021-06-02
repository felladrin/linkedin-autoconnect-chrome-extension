import randomInt from "random-int";
import { buttonClickRequested } from "../events/buttonClickRequested";
import { buttonClicked } from "../events/buttonClicked";
import { delay } from "../../shared/functions/delay";
import { dismissSendInviteDialog } from "../functions/dismissSendInviteDialog";

buttonClicked.watch(async () => {
  dismissSendInviteDialog();
  await delay(randomInt(1500, 3000));
  buttonClickRequested();
});
