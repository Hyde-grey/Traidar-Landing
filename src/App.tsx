import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import ThankYou from "./pages/ThankYou/ThankYou";
import Home from "./pages/Home/Home";

import "./App.css";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
