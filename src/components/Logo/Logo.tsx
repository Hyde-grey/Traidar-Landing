import traidarLogo from "../../assets/IMG/Traidar_Logo_white.png";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <img
        className={(styles.white, styles.logo)}
        src={traidarLogo}
        alt="traidarLogo"
      />
      <p className={styles.logoText}>
        Tr<span className={styles.blue}>ai</span>dar
      </p>
    </div>
  );
};

export default Logo;
