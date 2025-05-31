import useSound from "use-sound";
import MailchimpForm from "../MailchimpForm/MailchimpForm";
import styles from "./Newsletter.module.css";

import TraidarStart from "../../assets/AUDIO/TraidarStart.mp3";
import { useEffect, useRef } from "react";

const Newsletter = ({
  setForceHoverState,
}: {
  setForceHoverState: (state: boolean) => void;
}) => {
  const [play] = useSound(TraidarStart);

  // Ref to manage manual hover override timeout
  const manualTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      // Ignore mouse movement while manual override is active
      if (manualTimeoutRef.current) return;
      const screenWidth = window.innerWidth;
      const threshold = screenWidth * 0.45; // Right 45% of screen

      if (e.clientX > threshold) {
        setForceHoverState(true);
      } else {
        setForceHoverState(false);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // Clear manual override timeout on unmount
      if (manualTimeoutRef.current) {
        clearTimeout(manualTimeoutRef.current);
      }
    };
  }, [setForceHoverState]);

  return (
    <div
      className={styles.soonContainer}
      onClick={() => {
        play();
        setForceHoverState(true);
        // Start manual override timeout
        if (manualTimeoutRef.current) {
          clearTimeout(manualTimeoutRef.current);
        }
        manualTimeoutRef.current = setTimeout(() => {
          setForceHoverState(false);
          manualTimeoutRef.current = null;
        }, 8000);
      }}
    >
      <MailchimpForm setForceHoverState={setForceHoverState} />
    </div>
  );
};

export default Newsletter;
