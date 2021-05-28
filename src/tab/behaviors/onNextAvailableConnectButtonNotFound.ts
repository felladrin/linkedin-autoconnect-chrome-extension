import { goToNextPage } from "../functions/goToNextPage";
import { nextAvailableConnectButtonNotFound } from "../events/nextAvailableConnectButtonFound";

nextAvailableConnectButtonNotFound.watch(() => goToNextPage());
