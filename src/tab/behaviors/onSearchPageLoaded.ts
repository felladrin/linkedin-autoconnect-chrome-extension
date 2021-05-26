import { searchPageLoaded } from "../events";
import { addPeopleFromSearchPage } from "../functions/addPeopleFromSearchPage";

searchPageLoaded.watch(() => addPeopleFromSearchPage());
