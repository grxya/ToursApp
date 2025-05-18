'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function SakuraModel() {
  const { scene } = useGLTF('/models/tree_pink_fbx.glb')
  const modelRef = useRef<THREE.Object3D>(null!)

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003
    }
  })

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.material = new THREE.MeshStandardMaterial({
        color: '#FFC0CB', 
        roughness: 0.5,
        metalness: 0.1,
      })
    }
  })

  return (
    <primitive
  ref={modelRef}
  object={scene}
  scale={0.1}  
  position={[0, 0.2, 0]}  
/>
  )
}

export default function SakuraSimple() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 3], fov: 50 }} 
      style={{ height: '100vh', background: 'transparent' }}
      gl={{ alpha: true }}
    >
      <hemisphereLight args={['#ffffff', '#444444', 0.8]} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Suspense fallback={null}>
        <SakuraModel />
      </Suspense>
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.5} 
        scale={10}
        blur={2.5} 
      />
      <OrbitControls 
        enableZoom={false} 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}