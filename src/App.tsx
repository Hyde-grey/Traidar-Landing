import Logo from "./components/Logo/Logo";
import Threads from "./components/Motion/Threads/Threads";
import { TraidarLogoModel } from "./components/Models/TraidarLogo";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import "./App.css";

function App() {
  return (
    <>
      <Logo />
      <div className="threadsContainer">
        <Threads
          color={[255, 255, 255]}
          amplitude={1}
          distance={0.3}
          enableMouseInteraction={false}
        />
      </div>
      <div className="threadsContainer2">
        <Threads
          color={[255, 255, 255]}
          amplitude={1}
          distance={0.7}
          enableMouseInteraction={false}
        />
      </div>
      <div className="mainCanvas">
        <Canvas>
          <Float>
            <TraidarLogoModel />
          </Float>
        </Canvas>
      </div>
      {/* <div className="mainText">
        <h1>Coming Soon ...</h1>
      </div> */}
    </>
  );
}

export default App;
