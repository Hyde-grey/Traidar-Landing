import { useNavigate } from "react-router-dom";
import styles from "./Enter.module.css";
import useSound from "use-sound";
import sound from "../../assets/AUDIO/AmbienttraidarFadein.mp3";
import pulseSound from "../../assets/AUDIO/Hearbeat.mp3";
import { useSoundContext } from "../../context/SoundContext";
import { useCallback, useRef, useState } from "react";
import GradientText from "../../components/GradientText/GradientText";
import BreathingExercise, {
  type BreathingExerciseRef,
} from "../../components/BreathingExercise";
import { motion } from "framer-motion";

const Enter = () => {
  const navigate = useNavigate();
  const { setIsAmbientPlaying, handleSoundComplete } = useSoundContext();
  const [isPulseActive, setIsPulseActive] = useState<boolean>(false);
  const [breathingScale, setBreathingScale] = useState<number>(1);

  const breathingExerciseRef = useRef<BreathingExerciseRef>(null);

  const [playSound] = useSound(sound, {
    volume: 0.2,
    loop: false,
    onend: handleSoundComplete,
  });

  const handleEnter = useCallback(() => {
    playSound();
    setIsAmbientPlaying(true);
    navigate("/Home");
  }, [playSound, setIsAmbientPlaying, navigate]);

  const handlePulse = useCallback(() => {
    setIsPulseActive(false);
    requestAnimationFrame(() => {
      setIsPulseActive(true);
    });
  }, []);

  const handleBreathingScaleChange = useCallback((scale: number) => {
    setBreathingScale(scale);
  }, []);

  // Click handler triggers the animation and navigation flow
  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    breathingExerciseRef.current?.unlockAudio();
    breathingExerciseRef.current?.startExercise();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1 }}
        className={styles.homeContainerMotion}
      >
        {/* Breathing Exercise Component */}
        <BreathingExercise
          ref={breathingExerciseRef}
          audioUrl={pulseSound}
          duration={4000}
          onComplete={handleEnter}
          onPulse={handlePulse}
          onBreathingScaleChange={handleBreathingScaleChange}
        />

        {/* Enter Button - Fixed position, centered on viewport */}
        <div className={styles.enterWrapper}>
          <motion.button
            className={`${styles.homeContainerButtonText} ${
              styles.enterButton
            } ${isPulseActive ? styles.pulseActive : ""}`}
            onClick={handleClick}
            animate={{
              scale: breathingScale,
            }}
            transition={{
              scale: {
                duration: breathingScale !== 1 ? 2.5 : 0.2,
                ease: "easeInOut",
              },
            }}
          >
            <GradientText
              children="Enter"
              showBorder={false}
              animationSpeed={3}
              className={styles.homeContainerButtonText}
              colors={["#FF8C00", "#808080", "#FFFFFF", "#808080", "#FF8C00"]}
            />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Enter;
