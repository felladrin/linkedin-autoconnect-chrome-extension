import { goToNextPage } from "../effects/goToNextPage";
import { nextAvailableConnectButtonNotFound } from "../events/nextAvailableConnectButtonFound";

nextAvailableConnectButtonNotFound.watch(() => goToNextPage());
