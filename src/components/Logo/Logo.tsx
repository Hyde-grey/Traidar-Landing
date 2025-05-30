import traidarLogo from "../../assets/IMG/Traidar_Logo_orange.png";
import styles from "./Logo.module.css";
import GradientText from "../GradientText/gradientText";
import useSound from "use-sound";
import TraidarStart from "../../assets/AUDIO/TraidarStart.mp3";
import { AnimatePresence, motion } from "framer-motion";

const Logo = () => {
  const [play] = useSound(TraidarStart);
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className={styles.textContainer}
        >
          <div className={styles.logoContainer}>
            <img
              className={(styles.white, styles.logo)}
              src={traidarLogo}
              alt="traidarLogo"
            />
            <p className={styles.logoText}>Traidar</p>
          </div>
          <p className={styles.subText}>Every trade sharper with AI</p>
          <div className={styles.soonContainer} onClick={() => play()}>
            <GradientText
              colors={[
                "var(--color-primary)",
                "var(--color-light-1)",
                "var(--color-primary)",
                "var(--color-light-2)",
                "var(--color-primary)",
              ]}
              animationSpeed={3}
              showBorder={true}
              className={styles.soon}
            >
              Launching Soon...
            </GradientText>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Logo;
