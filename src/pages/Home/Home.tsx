import Logo from "../../components/Logo/Logo";
import Title from "../../components/Title/title";
import Orb from "../../components/Motion/Orb/Orb";
import { useState } from "react";
import { motion } from "framer-motion";
import { TraidarLaptop } from "../../components/Models/TraidarLaptop";
import { Canvas } from "@react-three/fiber";
import { Float, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import styles from "./Home.module.css";
const Home = () => {
  const [forceHoverState, setForceHoverState] = useState(false);
  return (
    <motion.div
      className={styles.homeWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 400 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 400 }}
        transition={{ duration: 0.5, delay: 7.5 }}
        className="appContainer"
      >
        <Logo />
        <Title setForceHoverState={setForceHoverState} />
      </motion.div>
      {/* Dark overlay between title and rest of page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 7.5 }}
        className={styles.pageOverlay}
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 6,
          delay: 7,
          ease: "easeInOut",
          scale: { duration: 2, delay: 8 },
        }}
        className="mainCanvas"
      >
        <Orb
          rotateOnHover={true}
          forceHoverState={forceHoverState}
          hoverIntensity={0.2}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1, delay: 1 }}
        className={styles.canvasContainer}
      >
        <Canvas
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        >
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={5}
            maxDistance={15}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            zoomSpeed={0.5}
            panSpeed={0.5}
          />
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
          {/* Ambient and fill lights */}
          <ambientLight intensity={0.2} />
          <hemisphereLight args={["#ffffff", "#000000", 0.3]} />
          {/* Orange rim/back light from right side */}
          <directionalLight
            color="#f38439"
            position={[5, 1, -5]}
            intensity={15}
          />
          {/* White key light for front illumination */}
          <directionalLight
            color="#ffffff"
            position={[-5, 2, 5]}
            intensity={10}
          />
          <Float rotationIntensity={0} floatIntensity={1.5}>
            <TraidarLaptop />
          </Float>
        </Canvas>
      </motion.div>
    </motion.div>
  );
};

export default Home;
