import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './index.css';

// Sun component
const Sun = () => {
  return (
    <mesh>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial emissive={new THREE.Color('yellow')} />
    </mesh>
  );
};

// Planet component
const Planet = ({ size, color, distance, speed }) => {
  const ref = React.useRef();
  const [angle, setAngle] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setAngle((prev) => prev + speed);
    }, 16);

    return () => clearInterval(id);
  }, [speed]);

  return (
    <mesh
      ref={ref}
      position={[distance * Math.cos(angle), 0, distance * Math.sin(angle)]}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Main Solar System Component
const SolarSystem = () => {
  return (
    <Canvas style={{ height: '100vh' }} camera={{ position: [0, 30, 30] }}>
      <ambientLight intensity={0.2} />
      <pointLight intensity={1} position={[0, 0, 0]} />
      <Sun />
      <Planet size={0.5} color="gray" distance={5} speed={0.02} /> {/* Mercury */}
      <Planet size={0.8} color="orange" distance={8} speed={0.015} /> {/* Venus */}
      <Planet size={1} color="blue" distance={11} speed={0.01} /> {/* Earth */}
      <Planet size={0.7} color="red" distance={14} speed={0.008} /> {/* Mars */}
      <OrbitControls />
    </Canvas>
  );
};
export default SolarSystem;
