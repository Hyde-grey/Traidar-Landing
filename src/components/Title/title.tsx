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

      <h1 className={styles.title}>Optimise Trade Performance, with AI.</h1>
      <p className={styles.subText}>
        Built for traders who move with intent. Utilise AI to drive trade
        performance, analyse multi-asset markets, economic events and next level
        journaling.
      </p>
      <Newsletter setForceHoverState={setForceHoverState} />
    </motion.div>
  );
};

export default Title;
