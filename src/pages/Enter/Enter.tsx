import { useNavigate } from "react-router-dom";
import styles from "./Enter.module.css";
import useSound from "use-sound";
import sound from "../../assets/AUDIO/AmbienttraidarFadein.mp3";
import pulseSound from "../../assets/AUDIO/Hearbeat.mp3";
import { useSoundContext } from "../../context/SoundContext";
import { useCallback, useState } from "react";
import useAudioVisualize from "../../hooks/useAudioVisualize";

import GradientText from "../../components/GradientText/GradientText";
import { motion } from "framer-motion";

const Enter = () => {
  const navigate = useNavigate();
  const { setIsAmbientPlaying, handleSoundComplete } = useSoundContext();
  const [isPulseActive, setIsPulseActive] = useState<boolean>(false);

  const [playSound] = useSound(sound, {
    volume: 0.2,
    loop: false,
    onend: handleSoundComplete,
  });

  // Audio visualization hook
  const { startVisualization, stopVisualization } = useAudioVisualize({
    audioUrl: pulseSound,
    volume: 0.3,
    onPulse: () => {
      // Trigger pulse animation
      setIsPulseActive(false);
      requestAnimationFrame(() => {
        setIsPulseActive(true);
      });
    },
    sensitivity: {
      volumeThreshold: 8,
      volumeChangeThreshold: 5,
      minInterval: 100,
      maxPulses: 100,
    },
  });

  const handleEnter = () => {
    playSound();
    setIsAmbientPlaying(true);
    navigate("/Home");
  };

  const handleMouseEnter = useCallback(async () => {
    await startVisualization();
  }, [startVisualization]);

  const handleMouseLeave = useCallback(() => {
    stopVisualization();
    setIsPulseActive(false);
  }, [stopVisualization]);

  return (
    <motion.div
      className={styles.homeContainer}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.homeContainerButton}>
        <button
          className={`${styles.homeContainerButtonText} ${
            isPulseActive ? styles.pulseActive : ""
          }`}
          onClick={handleEnter}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
  );
};

export default Enter;
