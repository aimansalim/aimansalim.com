import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, Color, SphereGeometry, MeshBasicMaterial } from 'three';
import { Text } from '@react-three/drei';

const GLOBE_RADIUS = 1;
const NUM_POINTS = 2000;
const POINT_SIZE = 0.015;
const TEXT_SIZE = 2;
const TEXT_COLOR = '#ffffff';
const POINT_COLORS = ['#00ff9d', '#ff0000', '#ffff00']; // green, red, yellow

export const TacticalGlobe = () => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const pointsRef = useRef<Group>(null);

  useEffect(() => {
    if (!pointsRef.current) return;

    // Clear existing points
    while (pointsRef.current.children.length) {
      pointsRef.current.remove(pointsRef.current.children[0]);
    }

    // Generate random points on sphere surface
    for (let i = 0; i < NUM_POINTS; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const radius = GLOBE_RADIUS * (0.98 + Math.random() * 0.04); // Slight variation in radius

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      const geometry = new SphereGeometry(POINT_SIZE);
      const material = new MeshBasicMaterial({
        color: new Color(POINT_COLORS[Math.floor(Math.random() * POINT_COLORS.length)])
      });
      const point = new Mesh(geometry, material);
      point.position.set(x, y, z);
      pointsRef.current.add(point);
    }
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Globe mesh */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.9}
          roughness={0.1}
          opacity={0.8}
          transparent
        />
      </mesh>

      {/* Points layer */}
      <group ref={pointsRef} />

      {/* Text overlay */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={TEXT_SIZE}
        color={TEXT_COLOR}
        anchorX="center"
        anchorY="middle"
        font="/fonts/SpaceGrotesk-Medium.ttf"
        material-toneMapped={false}
      >
        AIMAN
      </Text>

      {/* Status text */}
      <Text
        position={[2.5, 2, 0]}
        fontSize={0.15}
        color={TEXT_COLOR}
        anchorX="left"
        anchorY="top"
        font="/fonts/SpaceGrotesk-Medium.ttf"
        material-toneMapped={false}
      >
        YOU ARE NOW ENTERING
      </Text>

      <Text
        position={[2.5, 1.7, 0]}
        fontSize={0.15}
        color={TEXT_COLOR}
        anchorX="left"
        anchorY="top"
        font="/fonts/SpaceGrotesk-Medium.ttf"
        material-toneMapped={false}
      >
        TIME: 3 MNS
      </Text>

      <Text
        position={[2.5, 1.4, 0]}
        fontSize={0.15}
        color={TEXT_COLOR}
        anchorX="left"
        anchorY="top"
        font="/fonts/SpaceGrotesk-Medium.ttf"
        material-toneMapped={false}
      >
        SCROLL TO EXPLORE
      </Text>
    </group>
  );
};

export default TacticalGlobe;
