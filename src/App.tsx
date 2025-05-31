import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Logo from "./components/Logo/Logo";
import Title from "./components/Title/title";
import Orb from "./components/Motion/Orb/Orb";

import "./App.css";

function App() {
  const [forceHoverState, setForceHoverState] = useState(false);
  return (
    <AnimatePresence mode="wait">
      <div className="appContainer">
        <Logo />
        <Title setForceHoverState={setForceHoverState} />
      </div>
      <div className="mainCanvas">
        <Orb forceHoverState={forceHoverState} />
      </div>
    </AnimatePresence>
  );
}

export default App;
