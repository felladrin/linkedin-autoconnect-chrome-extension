import { clickButton } from "../effects/clickButton";
import { nextAvailableConnectButtonFound } from "../events/nextAvailableConnectButtonFound";
import { forward } from "effector";

forward({
  from: nextAvailableConnectButtonFound,
  to: clickButton,
});
