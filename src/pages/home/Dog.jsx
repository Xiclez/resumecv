import { OrbitControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useIsMobile } from "../../hooks";

// Dynamically import all .glb files from the assets/3d directory
const models = import.meta.glob("../../assets/3d/*.glb");

const Dog = () => {
  const { isMobile } = useIsMobile();
  const [gltf, setGltf] = useState(null);
  const ref = useRef();

  useEffect(() => {
    // Get all the paths of the imported models
    const modelPaths = Object.keys(models);
    // Select a random model path
    const randomModelPath = modelPaths[Math.floor(Math.random() * modelPaths.length)];
    // Load the selected model
    models[randomModelPath]().then((module) => {
      const url = module.default;
      new GLTFLoader().load(url, (loadedGltf) => {
        setGltf(loadedGltf);
      });
    });
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  if (!gltf) {
    return null; // or a loading spinner
  }

  return (
    <>
      <spotLight position={[5, 10, 7.5]} />
      <spotLight position={[-3, 10, -7.5]} />
      <pointLight color={"#f00"} position={[0, 0.6, 0]} distance={1.5} />
      {!isMobile && <OrbitControls enableZoom={false} enablePan={false} />}
      <primitive object={gltf.scene} scale={isMobile ? 2 : 1.2} ref={ref} />
    </>
  );
};

export default Dog;
