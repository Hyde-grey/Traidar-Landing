import MailchimpForm from "../MailchimpForm/MailchimpForm";
import styles from "./Newsletter.module.css";

import { useEffect, useRef, useState } from "react";

const Newsletter = ({
  setForceHoverState,
}: {
  setForceHoverState: (state: boolean) => void;
}) => {
  const [ignoreMouse, setIgnoreMouse] = useState(false);

  // Ref to manage manual hover override timeout
  const manualTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (ignoreMouse) return;
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
  }, [ignoreMouse, setForceHoverState]);

  return (
    <div className={styles.soonContainer}>
      <MailchimpForm
        setForceHoverState={(val) => {
          setForceHoverState(val);
          // whenever Form submits, disable mouse‐override for 8s
          setIgnoreMouse(true);
          setTimeout(() => setIgnoreMouse(false), 8000);
        }}
      />
    </div>
  );
};

export default Newsletter;
