import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type BackgroundStyle = 'constellation' | 'data-matrix' | 'geometric' | 'minimal' | 'off';

interface ThreeBackgroundProps {
  theme: 'dark' | 'light';
  style?: BackgroundStyle;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  theme,
  style = 'constellation',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || style === 'off') {
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 18, 75);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const isDark = theme === 'dark';
    const primaryLineColor = isDark ? 0xffffff : 0x0a0a0c;
    const secondaryLineColor = isDark ? 0x888890 : 0x52525b;
    const subtleLineColor = isDark ? 0x3f3f46 : 0xd4d4d8;

    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];

    // Update callbacks for each frame
    const frameUpdaters: ((time: number) => void)[] = [];

    if (style === 'constellation') {
      // 1. 3D Flowing Parametric Wave Lines (Ribbon Horizon) + Connected 3D Line Network
      const numLines = 36;
      const pointsPerLine = 90;
      const waveGroup = new THREE.Group();
      waveGroup.position.set(0, -14, -10);
      waveGroup.rotation.x = -0.25;
      scene.add(waveGroup);

      const lineGeometries: THREE.BufferGeometry[] = [];

      for (let i = 0; i < numLines; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(pointsPerLine * 3);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        disposableGeometries.push(geometry);
        lineGeometries.push(geometry);

        const distFromCenter = Math.abs(i - numLines / 2) / (numLines / 2);
        const material = new THREE.LineBasicMaterial({
          color: i % 4 === 0 ? primaryLineColor : secondaryLineColor,
          transparent: true,
          opacity: isDark
            ? (1 - distFromCenter * 0.65) * (i % 4 === 0 ? 0.55 : 0.24)
            : (1 - distFromCenter * 0.65) * (i % 4 === 0 ? 0.45 : 0.2),
        });
        disposableMaterials.push(material);

        const line = new THREE.Line(geometry, material);
        waveGroup.add(line);
      }

      // Cross-lines for 3D wireframe mesh depth
      const crossLinesCount = 18;
      const crossGeometries: THREE.BufferGeometry[] = [];
      for (let j = 0; j < crossLinesCount; j++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(numLines * 3);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        disposableGeometries.push(geometry);
        crossGeometries.push(geometry);

        const material = new THREE.LineBasicMaterial({
          color: subtleLineColor,
          transparent: true,
          opacity: isDark ? 0.16 : 0.14,
        });
        disposableMaterials.push(material);

        const line = new THREE.Line(geometry, material);
        waveGroup.add(line);
      }

      // 2. Upper 3D Geodesic Wireframe Sculpture (Pure 3D Lines)
      const icoGeo = new THREE.IcosahedronGeometry(22, 2);
      const wireframeGeo = new THREE.WireframeGeometry(icoGeo);
      disposableGeometries.push(icoGeo, wireframeGeo);

      const wireframeMat = new THREE.LineBasicMaterial({
        color: primaryLineColor,
        transparent: true,
        opacity: isDark ? 0.14 : 0.12,
      });
      disposableMaterials.push(wireframeMat);

      const wireframeSphere = new THREE.LineSegments(wireframeGeo, wireframeMat);
      wireframeSphere.position.set(0, 12, -35);
      scene.add(wireframeSphere);

      // Outer orbital line rings
      const ringGeo1 = new THREE.EdgesGeometry(new THREE.TorusGeometry(32, 0.15, 8, 96));
      const ringMat1 = new THREE.LineBasicMaterial({
        color: primaryLineColor,
        transparent: true,
        opacity: isDark ? 0.22 : 0.18,
      });
      disposableGeometries.push(ringGeo1);
      disposableMaterials.push(ringMat1);
      const ring1 = new THREE.LineSegments(ringGeo1, ringMat1);
      ring1.position.set(0, 12, -35);
      ring1.rotation.x = Math.PI / 3;
      scene.add(ring1);

      const ringGeo2 = new THREE.EdgesGeometry(new THREE.TorusGeometry(38, 0.1, 8, 96));
      const ringMat2 = new THREE.LineBasicMaterial({
        color: secondaryLineColor,
        transparent: true,
        opacity: isDark ? 0.14 : 0.12,
      });
      disposableGeometries.push(ringGeo2);
      disposableMaterials.push(ringMat2);
      const ring2 = new THREE.LineSegments(ringGeo2, ringMat2);
      ring2.position.set(0, 12, -35);
      ring2.rotation.y = Math.PI / 4;
      ring2.rotation.x = -Math.PI / 4;
      scene.add(ring2);

      frameUpdaters.push((t: number) => {
        const spreadX = 190;
        const spreadZ = 95;

        // Update longitudinal 3D wave lines
        for (let i = 0; i < numLines; i++) {
          const posAttr = lineGeometries[i].getAttribute('position') as THREE.BufferAttribute;
          const arr = posAttr.array as Float32Array;
          const z = (i / (numLines - 1) - 0.5) * spreadZ;

          for (let p = 0; p < pointsPerLine; p++) {
            const x = (p / (pointsPerLine - 1) - 0.5) * spreadX;
            const y =
              Math.sin(x * 0.045 + t * 0.9 + i * 0.18) * 5.5 +
              Math.cos(z * 0.06 - t * 0.65) * 4.0 +
              Math.sin((x + z) * 0.025 + t * 0.4) * 3.0;

            arr[p * 3] = x;
            arr[p * 3 + 1] = y;
            arr[p * 3 + 2] = z;
          }
          posAttr.needsUpdate = true;
        }

        // Update transversal cross-lines
        for (let j = 0; j < crossLinesCount; j++) {
          const posAttr = crossGeometries[j].getAttribute('position') as THREE.BufferAttribute;
          const arr = posAttr.array as Float32Array;
          const pIndex = Math.floor((j / (crossLinesCount - 1)) * (pointsPerLine - 1));
          const x = (pIndex / (pointsPerLine - 1) - 0.5) * spreadX;

          for (let i = 0; i < numLines; i++) {
            const z = (i / (numLines - 1) - 0.5) * spreadZ;
            const y =
              Math.sin(x * 0.045 + t * 0.9 + i * 0.18) * 5.5 +
              Math.cos(z * 0.06 - t * 0.65) * 4.0 +
              Math.sin((x + z) * 0.025 + t * 0.4) * 3.0;

            arr[i * 3] = x;
            arr[i * 3 + 1] = y;
            arr[i * 3 + 2] = z;
          }
          posAttr.needsUpdate = true;
        }

        wireframeSphere.rotation.y = t * 0.12;
        wireframeSphere.rotation.x = t * 0.07;
        ring1.rotation.z = t * 0.15;
        ring2.rotation.z = -t * 0.1;
      });
    } else if (style === 'data-matrix') {
      // 3D Perspective Architectural Line Grid Tunnel
      const gridGroup = new THREE.Group();
      scene.add(gridGroup);

      const linesCount = 48;
      const segments = 60;
      const lineGeos: THREE.BufferGeometry[] = [];

      for (let i = 0; i < linesCount; i++) {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(segments * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        disposableGeometries.push(geo);
        lineGeos.push(geo);

        const mat = new THREE.LineBasicMaterial({
          color: i % 3 === 0 ? primaryLineColor : secondaryLineColor,
          transparent: true,
          opacity: isDark ? 0.32 : 0.25,
        });
        disposableMaterials.push(mat);

        const line = new THREE.Line(geo, mat);
        gridGroup.add(line);
      }

      frameUpdaters.push((t: number) => {
        for (let i = 0; i < linesCount; i++) {
          const posAttr = lineGeos[i].getAttribute('position') as THREE.BufferAttribute;
          const arr = posAttr.array as Float32Array;
          const angle = (i / linesCount) * Math.PI * 2;
          const baseRadius = 28 + Math.sin(angle * 4 + t * 0.5) * 6;

          for (let s = 0; s < segments; s++) {
            const z = (s / segments) * 140 - 90;
            const twist = z * 0.015 + t * 0.3;
            const r = baseRadius + Math.sin(z * 0.08 + t * 1.2) * 3.5;

            arr[s * 3] = Math.cos(angle + twist) * r;
            arr[s * 3 + 1] = Math.sin(angle + twist) * r;
            arr[s * 3 + 2] = z;
          }
          posAttr.needsUpdate = true;
        }
      });
    } else if (style === 'geometric') {
      // Pure 3D Line Polyhedra & Concentric Wireframes
      const group = new THREE.Group();
      group.position.set(0, 5, -15);
      scene.add(group);

      const shapes = [
        new THREE.IcosahedronGeometry(26, 1),
        new THREE.OctahedronGeometry(18, 1),
        new THREE.DodecahedronGeometry(12, 0),
        new THREE.TorusKnotGeometry(20, 2.5, 96, 12),
      ];

      const meshes: THREE.LineSegments[] = [];
      shapes.forEach((shape, idx) => {
        const wire = new THREE.WireframeGeometry(shape);
        disposableGeometries.push(shape, wire);

        const mat = new THREE.LineBasicMaterial({
          color: idx % 2 === 0 ? primaryLineColor : secondaryLineColor,
          transparent: true,
          opacity: isDark ? 0.22 - idx * 0.03 : 0.18 - idx * 0.02,
        });
        disposableMaterials.push(mat);

        const seg = new THREE.LineSegments(wire, mat);
        group.add(seg);
        meshes.push(seg);
      });

      frameUpdaters.push((t: number) => {
        meshes.forEach((m, idx) => {
          const dir = idx % 2 === 0 ? 1 : -1;
          m.rotation.x = t * 0.14 * dir + idx;
          m.rotation.y = t * 0.18 * dir;
          m.rotation.z = t * 0.08;
        });
      });
    } else if (style === 'minimal') {
      // Minimal 3D Horizon Contour Lines
      const numLines = 16;
      const pts = 80;
      const lineGeos: THREE.BufferGeometry[] = [];

      for (let i = 0; i < numLines; i++) {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(pts * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        disposableGeometries.push(geo);
        lineGeos.push(geo);

        const mat = new THREE.LineBasicMaterial({
          color: primaryLineColor,
          transparent: true,
          opacity: isDark ? 0.25 : 0.2,
        });
        disposableMaterials.push(mat);

        const line = new THREE.Line(geo, mat);
        scene.add(line);
      }

      frameUpdaters.push((t: number) => {
        for (let i = 0; i < numLines; i++) {
          const posAttr = lineGeos[i].getAttribute('position') as THREE.BufferAttribute;
          const arr = posAttr.array as Float32Array;
          const yOffset = (i - numLines / 2) * 3.2;

          for (let p = 0; p < pts; p++) {
            const x = (p / (pts - 1) - 0.5) * 180;
            const y = yOffset + Math.sin(x * 0.04 + t * 0.6 + i * 0.3) * 4;
            const z = -20 - i * 2;
            arr[p * 3] = x;
            arr[p * 3 + 1] = y;
            arr[p * 3 + 2] = z;
          }
          posAttr.needsUpdate = true;
        }
      });
    }

    const startTime = performance.now();

    const animate = (now: number) => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedSeconds = (now - startTime) * 0.001;

      frameUpdaters.forEach((fn) => fn(elapsedSeconds));

      renderer.render(scene, camera);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      disposableGeometries.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, style]);

  if (style === 'off') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
