import { useNavigate } from "react-router-dom";
import styles from "./Enter.module.css";
import useSound from "use-sound";
import sound from "../../assets/AUDIO/AmbienttraidarFadein.mp3";
import pulseSound from "../../assets/AUDIO/hearbeat.mp3";
import { useSoundContext } from "../../context/SoundContext";
import { useCallback, useEffect, useRef } from "react";

import GradientText from "../../components/GradientText/GradientText";
import { motion } from "framer-motion";

const Enter = () => {
  const navigate = useNavigate();
  const { setIsAmbientPlaying, handleSoundComplete } = useSoundContext();
  const timeoutRef = useRef<number | null>(null);

  const [playSound] = useSound(sound, {
    volume: 0.2,
    loop: false,
    onend: handleSoundComplete,
  });

  const [playPulse, { stop: stopPulse }] = useSound(pulseSound, {
    volume: 0.3,
    loop: true,
  });

  const handleEnter = () => {
    playSound();
    setIsAmbientPlaying(true);
    navigate("/Home");
  };

  const handleMouseEnter = useCallback(() => {
    playPulse();

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start animation after 2 seconds
    timeoutRef.current = window.setTimeout(() => {
      const button = document.querySelector(
        `.${styles.homeContainerButton} button`
      );
      if (button) {
        button.classList.add(styles.pulseActive);
      }
    }, 2000);
  }, [playPulse]);

  const handleMouseLeave = useCallback(() => {
    stopPulse();

    // Clear the timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Remove the animation class
    const button = document.querySelector(
      `.${styles.homeContainerButton} button`
    );
    if (button) {
      button.classList.remove(styles.pulseActive);
    }
  }, [stopPulse]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPulse();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const button = document.querySelector(
        `.${styles.homeContainerButton} button`
      );
      if (button) {
        button.classList.remove(styles.pulseActive);
      }
    };
  }, [stopPulse]);

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
          className={styles.homeContainerButtonText}
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
