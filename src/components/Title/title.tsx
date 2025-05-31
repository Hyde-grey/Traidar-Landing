import styles from "./title.module.css";

import LaunchingSoon from "../LaunchingSoon/LaunchingSoon";
import Newsletter from "../Newsletter/Newsletter";
import { motion } from "framer-motion";

const Title = ({
  setForceHoverState,
}: {
  setForceHoverState: (state: boolean) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={styles.mainTextContainer}
    >
      <LaunchingSoon />

      <h1 className={styles.title}>Every trade sharper, with AI</h1>
      <p className={styles.subText}>
        Built for traders who move with intent. Traidar delivers instant AI
        insights that help you cut noise and act with clarity.
      </p>
      <Newsletter setForceHoverState={setForceHoverState} />
    </motion.div>
  );
};

export default Title;
