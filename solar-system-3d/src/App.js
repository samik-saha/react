import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas, useFrame} from '@react-three/fiber';
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

// Orbit component
const Orbit = ({ distance }) => {
  const points = [];
  const segments = 100;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
  }

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line>
      <primitive object={lineGeometry} />
      <lineBasicMaterial color="white" />
    </line>
  );
};

// Planet component
const Planet = ({ size, color, distance, speed }) => {
  const ref = React.useRef();
  let angle = 0;

  useFrame(() => {
    angle += speed;
    ref.current.position.x = distance * Math.cos(angle);
    ref.current.position.z = distance * Math.sin(angle);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Main Solar System Component
const SolarSystem = () => {
  return (
    <Canvas style={{ height: '100vh' }} camera={{ position: [0, 30, 30] }}>
      <ambientLight intensity={0.8} />
      <pointLight intensity={1} position={[0, 0, 0]} />
      <Sun />
      <Orbit distance={5} />
      <Planet size={0.5} color="gray" distance={5} speed={0.02} /> {/* Mercury */}
      <Orbit distance={8} />
      <Planet size={0.8} color="orange" distance={8} speed={0.015} /> {/* Venus */}
      <Orbit distance={11} />
      <Planet size={1} color="blue" distance={11} speed={0.01} /> {/* Earth */}
      <Orbit distance={14} />
      <Planet size={0.7} color="red" distance={14} speed={0.008} /> {/* Mars */}
      <OrbitControls />
    </Canvas>
  );
};
export default SolarSystem;
