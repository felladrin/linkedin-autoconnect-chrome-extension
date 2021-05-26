import { myNetworkPageLoaded } from "../events";
import { addPeopleFromMyNetworkPage } from "../functions/addPeopleFromMyNetworkPage";

myNetworkPageLoaded.watch(() => addPeopleFromMyNetworkPage());
