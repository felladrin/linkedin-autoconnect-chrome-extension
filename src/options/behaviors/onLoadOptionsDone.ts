import { loadOptions } from "../../shared/effects/loadOptions";
import { maximumAutoConnectionsPerSessionChanged } from "../events/maximumAutoConnectionsPerSessionChanged";

loadOptions.doneData.watch(({ maximumAutoConnectionsPerSession }) => {
  maximumAutoConnectionsPerSessionChanged(maximumAutoConnectionsPerSession);
});
