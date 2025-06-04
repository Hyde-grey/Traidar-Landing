import { useNavigate } from "react-router-dom";
import styles from "./ThankYou.module.css";
import Logo from "../../assets/IMG/Traidar.svg";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "../../components/Stars/Stars";
import { useSoundContext } from "../../context/SoundContext";
import useSound from "use-sound";
import sound from "../../assets/AUDIO/Ambienttraidar.mp3";

export default function ThankYou() {
  const navigate = useNavigate();
  const { setIsAmbientPlaying } = useSoundContext();
  const [playSound] = useSound(sound, {
    volume: 0.3,
    loop: false,
  });

  const handleGoBack = () => {
    navigate("/Home");
    playSound();
    setIsAmbientPlaying(true);
  };

  return (
    <>
      {/* Vignette overlay outside motion for immediate effect */}
      <div className={styles.vignetteOverlay} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.logoContainer}>
          <img src={Logo} alt="Traidar Logo" />
        </div>
        <div className={styles.container}>
          <p className={styles.subText}>You're on the list!</p>

          <h1 className={styles.title}>
            We look forward to
            <br className={styles.breakLg} />
            seeing you soon.
          </h1>

          <button className={styles.button} onClick={handleGoBack}>
            Go back home
          </button>
        </div>
        <Canvas
          id="canvas"
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -2,
          }}
        >
          <Stars />
        </Canvas>
      </motion.div>
    </>
  );
}
