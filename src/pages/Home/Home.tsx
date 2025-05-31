import Logo from "../../components/Logo/Logo";
import Title from "../../components/Title/title";
import Orb from "../../components/Motion/Orb/Orb";
import { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [forceHoverState, setForceHoverState] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="appContainer">
        <Logo />
        <Title setForceHoverState={setForceHoverState} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 6, delay: 0.5 }}
        className="mainCanvas"
      >
        <Orb
          rotateOnHover={true}
          forceHoverState={forceHoverState}
          hoverIntensity={0.2}
        />
      </motion.div>
    </motion.div>
  );
};

export default Home;
