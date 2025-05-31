import MailchimpForm from "../MailchimpForm/MailchimpForm";
import styles from "./Newsletter.module.css";

import { useEffect, useRef } from "react";

const Newsletter = ({
  setForceHoverState,
}: {
  setForceHoverState: (state: boolean) => void;
}) => {
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
    <div className={styles.soonContainer}>
      <MailchimpForm setForceHoverState={setForceHoverState} />
    </div>
  );
};

export default Newsletter;
