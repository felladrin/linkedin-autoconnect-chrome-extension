import React from "react";
import { StartStopButton } from "./StartStopButton";
import { PageSelection } from "./PageSelection";
import { ExtensionTitle } from "./ExtensionTitle";
import { CurrentPageMessage } from "./CurrentPageMessage";

export function App() {
  return (
    <div style={{ width: "200px" }}>
      <ExtensionTitle />
      <CurrentPageMessage />
      <PageSelection />
      <StartStopButton />
    </div>
  );
}
