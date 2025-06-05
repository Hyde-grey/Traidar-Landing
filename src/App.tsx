import { Routes, Route, useLocation } from "react-router-dom";
import Enter from "./pages/Enter/Enter";
import Home from "./pages/Home/Home";
import ThankYou from "./pages/ThankYou/ThankYou";
import { SoundProvider } from "./context/SoundContext";
import { AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <SoundProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Enter />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </AnimatePresence>
    </SoundProvider>
  );
}

export default App;
