import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'; // ✅ Pour accéder à THREE.PCFSoftShadowMap

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/models/girly.glb'); // ✅ Modèle GLB
  return <primitive object={gltf.scene} />;
};

const SimpleModelViewer = () => {
  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [1, 1, 1.2], fov: 70}}
        shadows
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={3}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Model />
          <ContactShadows
            position={[0, -0.3, 0]}
            opacity={0.5}
            scale={10}
            blur={1.5}
            far={5}
          />
          <OrbitControls
            target={[0, 0.7, 0]}
            enableZoom={true}
            zoomSpeed={0.3}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SimpleModelViewer;
