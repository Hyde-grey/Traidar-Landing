import { Link } from "react-router-dom";
import styles from "./ThankYou.module.css";
import Logo from "../../assets/IMG/Traidar.svg";
import { motion } from "framer-motion";

export default function ThankYou() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Traidar Logo" />
      </div>
      <div className={styles.container}>
        <p className={styles.subText}>You're on the list!</p>

        <h1 className={styles.title}>We look forward to seeing you soon.</h1>

        <Link className={styles.button} to="/">
          Go back home
        </Link>
      </div>
    </motion.div>
  );
}
