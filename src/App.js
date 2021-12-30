import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Box, Plane } from "drei";
import "./styles.css";

const Scene = () => {
  const boxRef = useRef();
  useFrame(() => {
    boxRef.current.rotation.y += 0.004;
    boxRef.current.rotation.x += 0.004;
    boxRef.current.rotation.z += 0.004;
  });
  // Set receiveShadow on any mesh that should be in shadow,
  // and castShadow on any mesh that should create a shadow.
  return (
    <group>
      <Box castShadow receiveShadow ref={boxRef} position={[0, 0.5, 0]}>
        <meshStandardMaterial attach="material" color="white" />
      </Box>
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        args={[1000, 1000]}
      >
        <meshStandardMaterial attach="material" color="white" />
      </Plane>
    </group>
  );
};

export default function App() {
  return (
    // shadowMap prop must be set to true on the Canvas. And
    // you must set castShadow to true on all lights casting shadows.
    <Canvas
      colorManagement
      shadowMap
      camera={{ position: [-3, 2, 5], fov: 90 }}
    >
      <fog attach="fog" args={["white", 0, 40]} />
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      {/* <pointLight
        castShadow
        intensity={0.2}
        args={[0xff0000, 1, 100]}
        position={[1, 1, 1]}
      />

      <spotLight
        castShadow
        intensity={1}
        args={["blue", 1, 100]}
        position={[-1, 1, 1]}
      /> */}
      <Scene />
    </Canvas>
  );
}
