import { sample } from "effector";
import { goToNextPage } from "../effects/goToNextPage";
import { nextAvailableConnectButtonNotFound } from "../events/nextAvailableConnectButtonFound";

sample({ clock: nextAvailableConnectButtonNotFound, target: goToNextPage });
