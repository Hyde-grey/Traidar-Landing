import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Logo from "./components/Logo/Logo";
import Title from "./components/Title/Title";
import Orb from "./components/Motion/Orb/Orb";

import "./App.css";

function App() {
  const [forceHoverState, setForceHoverState] = useState(false);
  return (
    <AnimatePresence mode="wait">
      <div className="appContainer">
        <Logo />
        <Title setForceHoverState={setForceHoverState} />

        <div className="mainCanvas">
          <Orb forceHoverState={forceHoverState} />
        </div>
      </div>
    </AnimatePresence>
  );
}

export default App;
