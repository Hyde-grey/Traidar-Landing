import { Routes, Route } from "react-router-dom";
import Enter from "./pages/Enter/Enter";
import Home from "./pages/Home/Home";
import ThankYou from "./pages/ThankYou/ThankYou";
import { SoundProvider } from "./context/SoundContext";
import "./App.css";

function App() {
  return (
    <SoundProvider>
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </SoundProvider>
  );
}

export default App;
