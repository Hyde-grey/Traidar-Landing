import traidarLogo from "../../assets/IMG/Traidar.svg";
import styles from "./Logo.module.css";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className={styles.logoContainer}
        onClick={() => navigate("/")}
      >
        <img className={styles.logo} src={traidarLogo} alt="traidarLogo" />

        <p className={styles.logoText}>Traidar</p>
      </motion.div>
    </>
  );
};

export default Logo;
