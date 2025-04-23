import Logo from "./components/Logo/Logo";
import Threads from "./components/Motion/Threads/Threads";
import { TraidarLogoModel } from "./components/Models/TraidarLogo";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import "./App.css";

function App() {
  return (
    <>
      <Logo />
      <div style={{ border: "1px solid red", width: "100%", height: "500px" }}>
        <Canvas>
          <TraidarLogoModel />
          <ScrollControls pages={1}>
          <Scroll html>
          <div className="threadsContainer">
        <Threads
          color={[54, 36, 47]}
          amplitude={2}
          distance={0.3}
          enableMouseInteraction={false}
        />
      </div>
      <div className="threadsContainer2">
        <Threads
          color={[54, 36, 47]}
          amplitude={2}
          distance={0.3}
          enableMouseInteraction={false}
        />
      </div>
          </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
      
    </>
  );
}

export default App;
