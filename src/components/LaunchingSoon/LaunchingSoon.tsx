import { motion } from "framer-motion";

import styles from "./LaunchingSoon.module.css";
import GradientText from "../GradientText/GradientText";

const LaunchingSoon = () => {
  return (
    <div className={styles.launchingContainer}>
      <motion.div
        initial={{ boxShadow: "0 0 10px rgba(255,140,0,0.2)", opacity: 1 }}
        animate={{
          boxShadow: "0 0 30px rgba(255,140,0,0.8)",
          opacity: 1,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className={styles.launchingIndicator}
      ></motion.div>
      <GradientText
        colors={["#FF8C00", "#808080", "#FFFFFF", "#808080", "#FF8C00"]}
      >
        <p className={styles.launchingText}>Launching Soon</p>
      </GradientText>
    </div>
  );
};

export default LaunchingSoon;
