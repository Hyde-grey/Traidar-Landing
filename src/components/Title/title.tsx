import styles from "./title.module.css";

import LaunchingSoon from "../LaunchingSoon/LaunchingSoon";
import Newsletter from "../Newsletter/Newsletter";
import { motion } from "framer-motion";

// Variants for cascading animation
const TITLE_ANIMATE_DELAY = 8; // seconds: wrapper animation (7.5s) + wrapper duration (0.5s)
const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: TITLE_ANIMATE_DELAY,
      staggerChildren: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const Title = ({
  setForceHoverState,
}: {
  setForceHoverState: (state: boolean) => void;
}) => (
  <motion.div
    className={styles.mainTextContainer}
    variants={containerVariants}
    initial="hidden"
    animate="show"
    exit="exit"
  >
    <motion.div variants={itemVariants}>
      <LaunchingSoon />
    </motion.div>
    <motion.h1 variants={itemVariants} className={styles.title}>
      Optimise Trade Performance, with AI.
    </motion.h1>
    <motion.p variants={itemVariants} className={styles.subText}>
      Built for traders who move with intent. Utilise AI to drive trade
      performance, analyse multi-asset markets, economic events and next level
      journaling.
    </motion.p>
    <motion.div variants={itemVariants}>
      <Newsletter setForceHoverState={setForceHoverState} />
    </motion.div>
  </motion.div>
);

export default Title;
