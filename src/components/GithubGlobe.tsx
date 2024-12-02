import { useEffect, useRef, memo } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';

interface Point {
  lat: number;
  lng: number;
  size: number;
  color: string;
  id: string;
}

interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

// Generate random points
const generatePoints = (count: number): Point[] => {
  return Array.from({ length: count }, (_, i) => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: 0.15,
    color: Math.random() > 0.8 ? '#00ff9d' : '#FFD700',
    id: `point-${i}`
  }));
};

// Generate random arcs between points
const generateArcs = (points: Point[]): Arc[] => {
  const arcs: Arc[] = [];
  points.forEach((point, i) => {
    if (Math.random() > 0.8) {
      const targetPoint = points[Math.floor(Math.random() * points.length)];
      arcs.push({
        startLat: point.lat,
        startLng: point.lng,
        endLat: targetPoint.lat,
        endLng: targetPoint.lng,
        color: '#00ff9d'
      });
    }
  });
  return arcs;
};

const POINTS_DATA = generatePoints(300);
const ARCS_DATA = generateArcs(POINTS_DATA);

const GithubGlobeComponent = () => {
  const globeEl = useRef<HTMLDivElement>(null);
  const globe = useRef<any>(null);

  useEffect(() => {
    if (!globeEl.current) return;

    // Initialize globe
    globe.current = Globe()(globeEl.current)
      .backgroundColor('#000000')
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .showAtmosphere(true)
      .atmosphereColor('#000000')
      .atmosphereAltitude(0.15)
      .pointsData(POINTS_DATA)
      .pointColor('color')
      .pointAltitude(0)
      .pointRadius('size')
      .pointsMerge(true)
      .arcsData(ARCS_DATA)
      .arcColor('color')
      .arcDashLength(() => Math.random() * 0.6)
      .arcDashGap(() => Math.random() * 0.4)
      .arcDashAnimateTime(() => Math.random() * 3000 + 1000)
      .arcStroke(0.3)
      .width(globeEl.current.clientWidth)
      .height(globeEl.current.clientHeight);

    // Custom globe material
    const globeMaterial = globe.current.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.bumpScale = 0.1;
    globeMaterial.color = new THREE.Color('#000000');
    globeMaterial.emissive = new THREE.Color('#000000');
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.1;
    globeMaterial.opacity = 0.9;
    globeMaterial.transparent = true;

    // Add rotation animation
    globe.current.controls().autoRotate = true;
    globe.current.controls().autoRotateSpeed = 0.5;
    globe.current.controls().enableZoom = false;
    globe.current.controls().enablePan = false;
    globe.current.controls().enableDamping = true;
    globe.current.controls().dampingFactor = 0.1;

    // Add bottom text overlay
    const textContainer = document.createElement('div');
    textContainer.style.position = 'absolute';
    textContainer.style.bottom = '2rem';
    textContainer.style.left = '2rem';
    textContainer.style.right = '2rem';
    textContainer.style.display = 'flex';
    textContainer.style.justifyContent = 'space-between';
    textContainer.style.alignItems = 'center';
    textContainer.style.color = 'white';
    textContainer.style.fontFamily = 'Space Grotesk, sans-serif';
    textContainer.style.fontSize = '1rem';
    textContainer.style.pointerEvents = 'none';
    textContainer.style.userSelect = 'none';
    textContainer.innerHTML = `
      <div style="display: flex; gap: 2rem;">
        <div>
          <div style="font-size: 8rem; font-weight: bold; letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.5rem;">AIMAN</div>
          <div style="opacity: 0.7;">YOU ARE NOW ENTERING</div>
        </div>
        <div style="opacity: 0.7; display: flex; align-items: flex-end;">
          TIME: 3 MNS<br/>
          SCROLL TO EXPLORE
        </div>
      </div>
      <div style="opacity: 0.7; text-align: right;">
        SOFTWARE ENGINEER<br/>
        BASED IN MODENA<br/>
        ITALY
      </div>
    `;
    globeEl.current.appendChild(textContainer);

    // Handle resize
    const handleResize = () => {
      if (globeEl.current) {
        globe.current
          .width(globeEl.current.clientWidth)
          .height(globeEl.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (globeEl.current && textContainer.parentNode === globeEl.current) {
        globeEl.current.removeChild(textContainer);
      }
      if (globe.current) {
        globe.current = undefined;
      }
    };
  }, []);

  return (
    <div
      ref={globeEl}
      style={{
        width: '100%',
        height: '100%',
        background: 'black',
        cursor: 'grab',
        position: 'relative'
      }}
    />
  );
};

export const GithubGlobe = memo(GithubGlobeComponent);
