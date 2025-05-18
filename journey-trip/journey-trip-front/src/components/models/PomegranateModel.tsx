'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const { scene } = useGLTF('/models/pomegranate.glb')
  const modelRef = useRef<THREE.Object3D>(null!)

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.material = new THREE.MeshStandardMaterial({
        color: '#8B0000',
        roughness: 0.4,
        metalness: 0.2,
      })
    }
  })

  return (
    <primitive
  ref={modelRef}
  object={scene}
  scale={0.02}
  position={[0, 0.2, 0]}
/>

  )
}

export default function PomegranateSimple() {
    return (
      <Canvas
        shadows
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        style={{ height: '100vh', background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <hemisphereLight args={['#ffffff', '#444444', 0.8]} />
        <directionalLight
          position={[3, 5, 2]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={5} blur={2.5} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    )
  }
  
