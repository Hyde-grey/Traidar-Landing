import Logo from "./components/Logo/Logo";

import Orb from "./components/Motion/Orb/Orb";

import "./App.css";

function App() {
  return (
    <div className="appContainer">
      <Logo />

      <div className="mainCanvas">
        <Orb />
      </div>
    </div>
  );
}

export default App;
