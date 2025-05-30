import styles from "./title.module.css";

import LaunchingSoon from "../LaunchingSoon/LaunchingSoon";
import Newsletter from "../Newsletter/Newsletter";

const Title = ({
  setForceHoverState,
}: {
  setForceHoverState: (state: boolean) => void;
}) => {
  return (
    <div className={styles.mainTextContainer}>
      <LaunchingSoon />

      <h1 className={styles.title}>Every trade sharper, with AI</h1>
      <p className={styles.subText}>
        Built for traders who move with intent. Traidar delivers instant AI
        insights that help you cut noise and act with clarity.
      </p>
      <Newsletter setForceHoverState={setForceHoverState} />
    </div>
  );
};

export default Title;
