import Logo from "./components/Logo/Logo";

import Orb from "./components/Motion/Orb/Orb";

import "./App.css";
import { useState } from "react";

function App() {
  const [forceHoverState, setForceHoverState] = useState(false);
  return (
    <div className="appContainer">
      <Logo
        forceHoverState={forceHoverState}
        setForceHoverState={setForceHoverState}
      />

      <div className="mainCanvas">
        <Orb forceHoverState={forceHoverState} />
      </div>
    </div>
  );
}

export default App;
