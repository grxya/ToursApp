'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SakuraPetals = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const petalCount = 100;
    const petalGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(petalCount * 3);
    const sizes = new Float32Array(petalCount);
    const velocities = new Float32Array(petalCount);
    const angles = new Float32Array(petalCount);

    for (let i = 0; i < petalCount; i++) {
      positions[i * 3] = Math.random() * 20 - 10;
      positions[i * 3 + 1] = Math.random() * 10 + 5;
      positions[i * 3 + 2] = Math.random() * 5 - 10;
      sizes[i] = Math.random() * 0.1 + 0.05;
      velocities[i] = Math.random() * 0.02 + 0.01;
      angles[i] = Math.random() * Math.PI * 2;
    }

    petalGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    petalGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const petalMaterial = new THREE.PointsMaterial({
      color: 0xffb6c1,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const petalSystem = new THREE.Points(petalGeometry, petalMaterial);
    scene.add(petalSystem);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      for (let i = 0; i < petalCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] -= velocities[i];
        positions[i3] += Math.sin(angles[i]) * 0.01;
        angles[i] += 0.01;

        if (positions[i3 + 1] < -5) {
          positions[i3 + 1] = Math.random() * 5 + 10;
          positions[i3] = Math.random() * 20 - 10;
        }
      }

      petalGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
};

export default SakuraPetals;
