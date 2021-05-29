import { loadOptions } from "../effects/loadOptions";
import { maximumAutoConnectionsPerSessionChanged } from "../events/maximumAutoConnectionsPerSessionChanged";

loadOptions.doneData.watch(({ maximumAutoConnectionsPerSession }) => {
  maximumAutoConnectionsPerSessionChanged(maximumAutoConnectionsPerSession);
});
