import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface PillProps {
  orientation?: "horizontal" | "vertical";
  length?: number;
  radius?: number;
  color?: string;
  rotationSpeed?: number;
}

/**
 * A 3D pill (capsule) shape that can be oriented horizontally or vertically.
 */
export function Pill({
  orientation = "horizontal",
  length = 2,
  radius = 0.5,
  color = "#f38439",
  rotationSpeed = 0.2,
}: PillProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create capsule geometry
  const geometry = useMemo(() => {
    // CapsuleGeometry takes (radius, length, capSegments, radialSegments)
    return new THREE.CapsuleGeometry(radius, length, 16, 32);
  }, [radius, length]);

  // Basic glowing material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.6,
      metalness: 0.1,
      roughness: 0.4,
    });
  }, [color]);

  // Simple rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.5;
    }
  });

  // Set initial orientation
  const rotation: [number, number, number] =
    orientation === "vertical" ? [Math.PI / 2, 0, 0] : [0, 0, 0];

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      rotation={rotation}
    />
  );
}

/**
 * Canvas wrapper for Pill, with basic lighting.
 */
export function PillCanvas(props: PillProps) {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Pill {...props} />
    </Canvas>
  );
}
