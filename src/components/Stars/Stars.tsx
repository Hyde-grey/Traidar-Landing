import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import * as THREE from "three";

interface StarsProps {
  count?: number;
  radius?: number;
}

export function Stars({ count = 200, radius = 70 }: StarsProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const { camera } = useThree();

  // Create star texture with intense glow
  const starTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;

    // Create intense radial gradient with bright core
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 48);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.05, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.1, "rgba(255, 240, 200, 0.9)");
    gradient.addColorStop(0.3, "rgba(255, 200, 100, 0.5)");
    gradient.addColorStop(0.5, "rgba(255, 150, 50, 0.2)");
    gradient.addColorStop(0.7, "rgba(255, 100, 0, 0.05)");
    gradient.addColorStop(1, "rgba(255, 100, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    // Add diagonal light rays at 40 degree angles
    ctx.globalCompositeOperation = "screen";
    ctx.save();
    ctx.translate(64, 64);

    // First diagonal ray (40 degrees)
    ctx.rotate((40 * Math.PI) / 180);
    const ray1Gradient = ctx.createLinearGradient(-64, 0, 64, 0);
    ray1Gradient.addColorStop(0, "rgba(255, 200, 100, 0)");
    ray1Gradient.addColorStop(0.4, "rgba(255, 200, 100, 0.05)");
    ray1Gradient.addColorStop(0.5, "rgba(255, 220, 150, 0.2)");
    ray1Gradient.addColorStop(0.6, "rgba(255, 200, 100, 0.05)");
    ray1Gradient.addColorStop(1, "rgba(255, 200, 100, 0)");
    ctx.fillStyle = ray1Gradient;
    ctx.fillRect(-64, -2, 128, 4); // Thin ray

    // Second diagonal ray (perpendicular to first)
    ctx.rotate((90 * Math.PI) / 180);
    const ray2Gradient = ctx.createLinearGradient(-64, 0, 64, 0);
    ray2Gradient.addColorStop(0, "rgba(255, 200, 100, 0)");
    ray2Gradient.addColorStop(0.4, "rgba(255, 200, 100, 0.05)");
    ray2Gradient.addColorStop(0.5, "rgba(255, 220, 150, 0.2)");
    ray2Gradient.addColorStop(0.6, "rgba(255, 200, 100, 0.05)");
    ray2Gradient.addColorStop(1, "rgba(255, 200, 100, 0)");
    ctx.fillStyle = ray2Gradient;
    ctx.fillRect(-64, -2, 128, 4); // Thin ray

    // Additional smaller rays for sparkle effect
    ctx.rotate((45 * Math.PI) / 180);
    const ray3Gradient = ctx.createLinearGradient(-48, 0, 48, 0);
    ray3Gradient.addColorStop(0, "rgba(255, 230, 180, 0)");
    ray3Gradient.addColorStop(0.5, "rgba(255, 230, 180, 0.1)");
    ray3Gradient.addColorStop(1, "rgba(255, 230, 180, 0)");
    ctx.fillStyle = ray3Gradient;
    ctx.fillRect(-48, -1, 96, 2); // Very thin ray

    ctx.rotate((90 * Math.PI) / 180);
    ctx.fillStyle = ray3Gradient;
    ctx.fillRect(-48, -1, 96, 2); // Very thin ray

    ctx.restore();

    // Smear out the glow rim with a blur pass on non-mobile screens
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      ctx.filter = "blur(8px)";
      ctx.drawImage(canvas, 0, 0);
      // Reset filter for future draws
      ctx.filter = "none";
    }

    const texture = new THREE.CanvasTexture(canvas);
    // Use linear filtering for smoother interpolation
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Store original positions, colors, and animation data
  const { positions, sizes, colors, animationData } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const animationData = new Float32Array(count * 4);

    // Calculate field of view boundaries
    const fov = (camera as THREE.PerspectiveCamera).fov || 75;
    const aspect = window.innerWidth / window.innerHeight;
    const distance = 20;
    const vFOV = 2 * Math.tan((fov * Math.PI) / 180 / 2) * distance;
    const hFOV = vFOV * aspect;

    for (let i = 0; i < count; i++) {
      // Distribute stars asymmetrically with clustering
      const angle = Math.random() * Math.PI * 2;
      const radiusFromCenter =
        Math.pow(Math.random(), 0.7) * Math.min(hFOV, vFOV); // full FOV coverage

      // Add offset to prevent centering
      const offsetX = (Math.random() - 0.5) * hFOV * 0.3;
      const offsetY = (Math.random() - 0.5) * vFOV * 0.2;

      const rawX = Math.cos(angle) * radiusFromCenter + offsetX;
      const rawY = Math.sin(angle) * radiusFromCenter + offsetY;
      const depthMax = radius * 10;
      // 10% of stars spawn ultra-close
      const closeChance = 0.1;
      const isUltraClose = Math.random() < closeChance;
      const minDepth = isUltraClose ? 0.01 : 0.2;
      // Stars spawn between -minDepth (very close) and -(depthMax) units
      const z = -(Math.random() * (depthMax - minDepth) + minDepth);

      // Compensate for perspective: scale x,y to keep uniform screen spread
      const scale = Math.abs(z) / distance;
      const x = rawX * scale;
      const y = rawY * scale;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Size variation with mega, hero, and regular stars
      const rand = Math.random();
      const isMegaStar = rand < 0.1; // 10% mega stars
      const isHeroStar = rand < 0.3; // 30% hero stars
      const baseSize = isMegaStar
        ? Math.random() * 200 + 200 // Mega stars: 200-400
        : isHeroStar
        ? Math.random() * 100 + 100 // Hero stars: 100-200
        : Math.random() * 40 + 20; // Regular stars: 20-60
      sizes[i] = baseSize * 5; // increase size range by 5x

      // Base primary orange color (#f38439) with category intensity
      const baseR = 243 / 255,
        baseG = 132 / 255,
        baseB = 57 / 255;
      const intensity = isMegaStar ? 1.0 : isHeroStar ? 0.8 : 0.6;
      let r = baseR * intensity;
      let g = baseG * intensity;
      let b = baseB * intensity;
      // Slight random variation +/-10%
      const variation = Math.random() * 0.2 - 0.1;
      r = Math.min(Math.max(r * (1 + variation), 0), 1);
      g = Math.min(Math.max(g * (1 + variation), 0), 1);
      b = Math.min(Math.max(b * (1 + variation), 0), 1);
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;

      // Animation data with reduced range
      animationData[i * 4] = Math.random() * Math.PI * 2; // X offset
      animationData[i * 4 + 1] = Math.random() * Math.PI * 2; // Y offset
      animationData[i * 4 + 2] = Math.random() * Math.PI * 2; // Z offset
      animationData[i * 4 + 3] = Math.random() * 0.3 + 0.2; // Slower twinkle
    }

    return { positions, sizes, colors, animationData };
  }, [count, radius, camera]);

  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const sizeAttribute = pointsRef.current.geometry.attributes.size;

    // Quick fade in
    const fadeInDuration = 1.5;
    const fadeInProgress = Math.min(time / fadeInDuration, 1);
    materialRef.current.opacity = fadeInProgress;

    // Animate each star with very minimal movement
    for (let i = 0; i < count; i++) {
      const baseX = positions[i * 3];
      const baseY = positions[i * 3 + 1];
      const baseZ = positions[i * 3 + 2];

      const offsetX = animationData[i * 4];
      const offsetY = animationData[i * 4 + 1];
      const offsetZ = animationData[i * 4 + 2];
      const twinkleSpeed = animationData[i * 4 + 3];

      // Reduced motion by 80%
      positionAttribute.array[i * 3] =
        baseX + Math.sin(time * 0.004 + offsetX) * 0.002;
      positionAttribute.array[i * 3 + 1] =
        baseY + Math.cos(time * 0.006 + offsetY) * 0.002;
      positionAttribute.array[i * 3 + 2] =
        baseZ + Math.sin(time * 0.003 + offsetZ) * 0.001;

      // Gentle twinkling
      const baseSizeValue = sizes[i];
      const twinkle = Math.sin(time * twinkleSpeed + offsetX) * 0.2 + 1;
      sizeAttribute.array[i] = baseSizeValue * twinkle * fadeInProgress;
    }

    positionAttribute.needsUpdate = true;
    sizeAttribute.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <pointsMaterial
        ref={materialRef}
        map={starTexture}
        size={2}
        sizeAttenuation={true}
        transparent={true}
        opacity={0}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fog={false}
        attach="material"
      />
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
    </Points>
  );
}
