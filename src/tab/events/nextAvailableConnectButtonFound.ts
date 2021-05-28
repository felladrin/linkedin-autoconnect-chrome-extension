import { split } from "effector";
import { findNextAvailableConnectButton } from "../effects/findNextAvailableConnectButton";

export const {
  nextAvailableConnectButtonFound,
  nextAvailableConnectButtonNotFound,
} = split(findNextAvailableConnectButton.doneData, {
  nextAvailableConnectButtonFound: (button): button is HTMLButtonElement =>
    button !== null,
  nextAvailableConnectButtonNotFound: (button): button is null =>
    button === null,
});
