import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAudioVisualize from "../../hooks/useAudioVisualize";
import styles from "./BreathingExercise.module.css";

interface BreathingExerciseProps {
  audioUrl: string;
  duration?: number; // Duration in milliseconds
  onComplete: () => void;
  onPulse?: () => void;
  onBreathingScaleChange?: (scale: number) => void;
}

export interface BreathingExerciseRef {
  startExercise: () => Promise<void>;
  stopExercise: () => void;
  isActive: boolean;
  unlockAudio: () => void;
}

const BreathingExercise = forwardRef<
  BreathingExerciseRef,
  BreathingExerciseProps
>(
  (
    { audioUrl, duration = 22000, onComplete, onPulse, onBreathingScaleChange },
    ref
  ) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [holdProgress, setHoldProgress] = useState<number>(0);
    const [breathingPhase, setBreathingPhase] = useState<
      "breathe" | "hold" | "release"
    >("breathe");

    const progressIntervalRef = useRef<number | null>(null);
    const breathingIntervalRef = useRef<number | null>(null);

    const PROGRESS_UPDATE_INTERVAL = 50;
    const BREATHING_PHASE_DURATION = 3500;

    // Audio visualization hook
    const { startVisualization, stopVisualization, unlock } = useAudioVisualize(
      {
        audioUrl,
        volume: 0.3,
        onPulse: onPulse,
        sensitivity: {
          volumeThreshold: 8,
          volumeChangeThreshold: 5,
          minInterval: 100,
          maxPulses: 500,
        },
      }
    );

    // Get breathing-based scale
    const getBreathingScale = useCallback(() => {
      if (!isActive) return 1;

      switch (breathingPhase) {
        case "breathe":
          return 3; // Scale up significantly during inhale
        case "hold":
          return 3; // Stay scaled during hold
        case "release":
          return 1; // Scale down during exhale
        default:
          return 1;
      }
    }, [isActive, breathingPhase]);

    // Update parent with breathing scale changes
    useEffect(() => {
      onBreathingScaleChange?.(getBreathingScale());
    }, [getBreathingScale, onBreathingScaleChange]);

    // Breathing cycle management
    const startBreathingCycle = useCallback(() => {
      setBreathingPhase("breathe");

      breathingIntervalRef.current = setInterval(() => {
        setBreathingPhase((prev) => {
          if (prev === "breathe") return "hold";
          if (prev === "hold") return "release";
          return "breathe";
        });
      }, BREATHING_PHASE_DURATION);
    }, []);

    const stopBreathingCycle = useCallback(() => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
        breathingIntervalRef.current = null;
      }
      setBreathingPhase("breathe");
    }, []);

    // Start the breathing exercise
    const startExercise = useCallback(async () => {
      if (isActive) return;

      setIsActive(true);
      setHoldProgress(0);

      // Start visualization
      await startVisualization();

      // Start breathing cycle
      startBreathingCycle();

      // Start progress tracking
      const startTime = Date.now();
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        setHoldProgress(progress);

        if (progress >= 100) {
          // Complete!
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          onComplete();
        }
      }, PROGRESS_UPDATE_INTERVAL);
    }, [
      isActive,
      startVisualization,
      startBreathingCycle,
      duration,
      onComplete,
    ]);

    // Stop the breathing exercise
    const stopExercise = useCallback(() => {
      if (!isActive) return;

      setIsActive(false);
      setHoldProgress(0);
      stopBreathingCycle();
      stopVisualization();

      // Clear timers
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }, [isActive, stopBreathingCycle, stopVisualization]);

    // Expose methods through ref
    useImperativeHandle(
      ref,
      () => ({
        startExercise,
        stopExercise,
        isActive,
        unlockAudio: unlock,
      }),
      [startExercise, stopExercise, isActive, unlock]
    );

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (progressIntervalRef.current)
          clearInterval(progressIntervalRef.current);
        if (breathingIntervalRef.current)
          clearInterval(breathingIntervalRef.current);
      };
    }, []);

    const getBreathingText = () => {
      if (!isActive) return "";

      switch (breathingPhase) {
        case "breathe":
          return "Loading experience...";
        case "hold":
          return "Loading experience...";
        case "release":
          return "Loading experience...";
        default:
          return "Loading experience...";
      }
    };

    return (
      <>
        {/* Progress Circle */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={styles.progressCircleContainer}
            >
              <svg width="300" height="300" className={styles.progressSvg}>
                <circle
                  cx="150"
                  cy="150"
                  r="140"
                  className={styles.progressCircleBackground}
                />
                <circle
                  cx="150"
                  cy="150"
                  r="140"
                  className={styles.progressCircleForeground}
                  strokeDasharray={`${2 * Math.PI * 140}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 140 * (1 - holdProgress / 100)
                  }`}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={styles.instructionsText}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={getBreathingText()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {getBreathingText()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Progress Percentage */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.progressPercentage}
            >
              {Math.round(holdProgress)}% •{" "}
              {Math.round((duration - (holdProgress / 100) * duration) / 1000)}s
              remaining
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

BreathingExercise.displayName = "BreathingExercise";

export { BreathingExercise, type BreathingExerciseProps };
export default BreathingExercise;
