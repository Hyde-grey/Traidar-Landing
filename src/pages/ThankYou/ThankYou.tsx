import { Link } from "react-router-dom";
import styles from "./ThankYou.module.css";
import Logo from "../../assets/IMG/Traidar.svg";

export default function ThankYou() {
  return (
    <>
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
    </>
  );
}
