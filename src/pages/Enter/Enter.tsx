import { useNavigate } from "react-router-dom";
import styles from "./Enter.module.css";
import useSound from "use-sound";
import sound from "../../assets/AUDIO/Ambienttraidar.mp3";
import { useSoundContext } from "../../context/SoundContext";

import GradientText from "../../components/GradientText/GradientText";
import { AnimatePresence, motion } from "framer-motion";

const Enter = () => {
  const navigate = useNavigate();
  const { setIsAmbientPlaying, handleSoundComplete } = useSoundContext();
  const [playSound] = useSound(sound, {
    volume: 0.3,
    loop: false,
    onend: handleSoundComplete,
  });

  const handleEnter = () => {
    playSound();
    setIsAmbientPlaying(true);
    navigate("/Home");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.homeContainer}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.homeContainerButton}>
          <button
            className={styles.homeContainerButtonText}
            onClick={handleEnter}
          >
            <GradientText
              children="Enter"
              showBorder={false}
              animationSpeed={3}
              className={styles.homeContainerButtonText}
              colors={["#FF8C00", "#808080", "#FFFFFF", "#808080", "#FF8C00"]}
            />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Enter;
