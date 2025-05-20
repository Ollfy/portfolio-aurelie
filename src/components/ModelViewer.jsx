import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { LangContext } from "../context/LangContext";
import modelViewerData from "../data/modelviewer.json";

// Modèle 3D
const Model = () => {
  const gltf = useGLTF("/models/girly.glb");

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = false;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} scale={0.8} position={[0, -0.3, 0]} />;
};
useGLTF.preload("/models/girly.glb");

// Suivi de la distance caméra pour afficher la flèche
const CameraWatcher = ({ setVisible, setZoomDone }) => {
  const { camera, controls } = useThree();
  const target = controls?.target ?? new THREE.Vector3(0, 0, 0);
  const MAX_DISTANCE = 4;

  useFrame(() => {
    const distance = camera.position.distanceTo(target);
    setVisible(distance > 3.8);
    setZoomDone(distance >= MAX_DISTANCE);

    const canvasElement = document.querySelector("#home canvas");

    if (distance >= MAX_DISTANCE) {
      controls.enabled = false;
      if (canvasElement) canvasElement.style.pointerEvents = "none";
    } else {
      controls.enabled = true;
      if (canvasElement) canvasElement.style.pointerEvents = "all";
    }
  });

  return null;
};

// Animation machine à écrire
const TypewriterText = ({ text, delay = 60 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <p className="text-lg sm:text-xl md:text-2xl text-center mt-0 font-mono font-semibold text-gray-800 dark:text-white">
      {displayed}
      <span className="animate-pulse">|</span>
    </p>
  );
};

const MobileCameraZoom = () => {
  const { camera, controls } = useThree();
  const targetPosition = new THREE.Vector3(3, 1, 4.5); // position éloignée

  useFrame(() => {
    const distance = camera.position.distanceTo(targetPosition);

    if (distance > 0.05) {
      camera.position.lerp(targetPosition, 0.01); // zoom progressif
      camera.updateProjectionMatrix();
    } else {
      if (controls) controls.enabled = false; // fige la vue une fois atteint
    }
  });

  return null;
};


// Composant principal
const ModelViewer = () => {
  const { lang } = useContext(LangContext);
  const t = modelViewerData[lang];

  const [showName, setShowName] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [zoomDone, setZoomDone] = useState(false); // 👉 contrôle flèche

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showName) {
      const timer = setTimeout(() => setShowText(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showName]);

  return (
    <div id="home" className="relative w-full h-screen bg-stone-200 dark:bg-zinc-700 overflow-hidden">
      {/* Canvas 3D */}
      <div className="w-[70%] mx-auto h-full pointer-events-none relative">
        <Canvas
          className="pointer-events-auto"
          camera={{ position: [1, 0.6, 1.2], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
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
            target={[0, 0.6, 0]}
            enableZoom={!isMobile}
            enableRotate={!isMobile}
            enablePan={false}
            minDistance={1.2}
            maxDistance={isMobile ? 7 : 4}
            makeDefault
            zoomSpeed={0.3}
          />
          {isMobile && <MobileCameraZoom />}
          <CameraWatcher setVisible={setShowName} setZoomDone={setZoomDone} />
        </Canvas>
      </div>

      {/* Texte + machine à écrire */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-start pt-32 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showName ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-porkys text-red-600 text-center">
          AURÉLIE NUNGE<span className="text-black dark:text-white">.</span>
        </h1>
        {showText && <TypewriterText text={t.typewriter} />}
      </motion.div>

      {/* ↓ Flèche visible uniquement quand zoom terminé */}
      {zoomDone && (
        <a
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById("about");
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }}
          href="#about"
          className="absolute bottom-[0rem] left-1/2 -translate-x-1/2 text-3xl text-red-700 animate-bounce z-10 cursor-pointer"
        >
          ↓
        </a>
      )}
    </div>
  );
};

export default ModelViewer;
