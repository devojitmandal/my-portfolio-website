"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { AlertTriangle } from "lucide-react";
import { useInView, motion } from "framer-motion";
import { AmbientStarfield } from "./hero/AmbientStarfield";
import { PassingStar } from "./hero/PassingStar";

type GameState = "READY" | "PLAYING" | "CRASHED";

// 5. Constant extracted outside the render cycle
const ASTEROID_COUNT = 40;

// --- 1. THE PHYSICS ENGINE ---
function GameScene({ gameState, setGameState, setScore }: any) {
  const shipRef = useRef<THREE.Group>(null);
  const asteroidMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const { scene } = useGLTF('/ufo.glb');
  useEffect(() => {
    scene.traverse((child) => {
      // Tell TypeScript to treat this generic child as a specific 3D Mesh
      const mesh = child as THREE.Mesh;
      
      if (mesh.isMesh) {
        // Tell TypeScript we are working with a standard material
        const material = mesh.material as THREE.MeshStandardMaterial;

        // 1. Strip away any baked-in image textures hiding our color
        material.map = null; 

        // 2. Apply the Rusty Iron base color
        material.color = new THREE.Color("#b7410e"); 

        // 3. Alter the physical material properties
        material.roughness = 0.65;
        material.metalness = 0.4;

        // 4. Force Three.js to recompile the material
        material.needsUpdate = true;
      }
    });
  }, [scene]);
  
  // 1 & 8. Ref-based state to solve stale closures in the 60fps loop
  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(0);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const asteroids = useRef(
    Array.from({ length: ASTEROID_COUNT }).map(() => ({ active: false, x: 0, y: 0, z: 1000, passed: false }))
  );

  const physics = useRef({
    y: 0,
    velocity: 0,
    gravity: -0.012, 
    jump: 0.25,      
    baseSpeed: 0.8,      
  });

  // 4 & 8. Unified Input Handling (Keyboard + Touch) registered ONCE
  useEffect(() => {
    const handleAction = (e?: Event) => {
      e?.preventDefault();
      const currentState = gameStateRef.current;

      if (currentState === "READY") {
        setGameState("PLAYING");
        scoreRef.current = 0;
        setScore(0);
      } else if (currentState === "PLAYING") {
        physics.current.velocity = physics.current.jump;
      } else if (currentState === "CRASHED" && (e?.type === "keydown" ? (e as KeyboardEvent).code === "KeyR" : true)) {
        // Restart sequence
        setGameState("READY");
        scoreRef.current = 0;
        setScore(0);
        physics.current.y = 0;
        physics.current.velocity = 0;
        asteroids.current.forEach(ast => { ast.active = false; ast.z = 1000; ast.passed = false; });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "KeyR") handleAction(e);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handleAction); // Touch support

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handleAction);
    };
  }, [setGameState, setScore]); // Empty dependency array for listeners, stable setters

  // THE 60FPS GAME LOOP
  useFrame((state) => {
    const currentState = gameStateRef.current;
    const p = physics.current;

    // 2. Manual Sine-wave hover (Replaces conflicting <Float> component)
    if (currentState === "READY" && shipRef.current) {
        // 1. Maintain the smooth hover animation
        shipRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
        
        // 2. FORCE the ship to perfectly straighten out, erasing the death spin!
        shipRef.current.rotation.x = 0;
        shipRef.current.rotation.y = 0;
        shipRef.current.rotation.z = 0;
      }

    if (currentState === "PLAYING") {
      // 6. Difficulty Scaling: Speed increases by 10% for every 10 points
      const currentSpeed = p.baseSpeed + (Math.floor(scoreRef.current / 10) * 0.08);
      
      // Ship Physics
      p.velocity += p.gravity;
      p.y += p.velocity;
      
      let crashedThisFrame = false;

      // Boundaries
      if (p.y < -12 || p.y > 12) crashedThisFrame = true;
      
      if (shipRef.current) {
        shipRef.current.position.y = p.y;
        shipRef.current.rotation.x = p.velocity * -1.5; 
      }

      // Spawner
      if (Math.random() < 0.05) {
        const inactiveIndex = asteroids.current.findIndex(a => !a.active);
        if (inactiveIndex !== -1) {
          asteroids.current[inactiveIndex] = { active: true, x: (Math.random() - 0.5) * 25, y: (Math.random() - 0.5) * 20, z: -100, passed: false };
        }
      }

      // Movement & Collision
      asteroids.current.forEach((ast, i) => {
        const mesh = asteroidMeshes.current[i];
        if (!mesh) return;

        if (ast.active) {
          ast.z += currentSpeed; 
          
          const dist = Math.hypot(ast.x, p.y - ast.y, ast.z);
          if (dist < 2.5) crashedThisFrame = true;

          // 3. Safe Scoring: Update ref first, sync to React state only on change
          if (ast.z > 0 && !ast.passed) {
            ast.passed = true;
            scoreRef.current += 1;
            setScore(scoreRef.current);
          }

          if (ast.z > 20) ast.active = false;

          mesh.position.set(ast.x, ast.y, ast.z);
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.02;
        } else {
          mesh.position.set(0, 0, 1000);
        }
      });
      
      // 1. Stale Closure protection: Set state once, safely
      if (crashedThisFrame) {
        setGameState("CRASHED");
      }
    }

    if (currentState === "CRASHED" && shipRef.current) {
      // Death Spin
      shipRef.current.rotation.y += 0.1;
      shipRef.current.rotation.z += 0.1;
      shipRef.current.position.y -= 0.1; 
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#14b8a6" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#f59e0b" />
      
      

      <group ref={shipRef} position={[0, 0, 0]}>
        <primitive 
          object={scene} 
          scale={1} // Change this if the ship is too big or small!
          rotation={[0, 0, 0]} // Change this if the ship faces the wrong way!
        />
      </group>

      {Array.from({ length: ASTEROID_COUNT }).map((_, i) => (
        <mesh key={i} ref={(el) => { asteroidMeshes.current[i] = el; }} position={[0, 0, 1000]}>
          <dodecahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#333" roughness={0.9} />
        </mesh>
      ))}
    </>
  );
}

// --- 2. THE UI, STATE MANAGER, & SCROLL TRIGGER ---
export function UfoGame3D() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(triggerRef, { once: false, margin: "0px" });
  
    const [gameState, setGameState] = useState<"IDLE" | "ARRIVING" | "READY" | "PLAYING" | "CRASHED" | "CLOSED">("IDLE");
    const [score, setScore] = useState(0);
  
    // 1. OVERSCROLL PRESSURE & RESET LISTENER
    useEffect(() => {
      if (!isInView && gameState === "CLOSED") {
        setGameState("IDLE");
        return;
      }
  
      if (isInView && gameState === "IDLE") {
        let scrollPressure = 0;
        let lastTouchY = 0;
  
        const handleWheel = (e: WheelEvent) => {
          if (e.deltaY > 0) { 
            scrollPressure += e.deltaY;
            if (scrollPressure > 300) setGameState("ARRIVING");
          }
        };
  
        const handleTouchStart = (e: TouchEvent) => {
          lastTouchY = e.touches[0].clientY;
        };
  
        const handleTouchMove = (e: TouchEvent) => {
          const currentY = e.touches[0].clientY;
          if (lastTouchY > currentY) { 
            scrollPressure += (lastTouchY - currentY);
            lastTouchY = currentY;
            if (scrollPressure > 150) setGameState("ARRIVING");
          }
        };
  
        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
  
        return () => {
          window.removeEventListener("wheel", handleWheel);
          window.removeEventListener("touchstart", handleTouchStart);
          window.removeEventListener("touchmove", handleTouchMove);
        };
      }
    }, [isInView, gameState]);
  
    // 2. THE BOOT TIMER
    useEffect(() => {
      if (gameState === "ARRIVING") {
        const timer = setTimeout(() => setGameState("READY"), 3500);
        return () => clearTimeout(timer);
      }
    }, [gameState]);
  
    // 3. Global Keyboard Listener for ESC
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setGameState("CLOSED");
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
  
    return (
      <>
        {/* THE STABLE SENSOR & HINT TEXT */}
        <div 
          ref={triggerRef} 
          className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center pb-6 pointer-events-none z-[50]"
        >
          {isInView && gameState === "IDLE" && (
            <div className="text-teal-500/50 font-mono text-[10px] md:text-xs tracking-[0.3em] animate-pulse drop-shadow-md">
              SYSTEM_OVERRIDE // SCROLL DOWN
            </div>
          )}
        </div>
  
        {/* THE GAME OVERLAY */}
      {gameState !== "IDLE" && gameState !== "CLOSED" && (
        // 1. Removed the solid background color from this parent wrapper
        <div className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center touch-none select-none animate-in fade-in duration-1000">
          
          {/* LAYER 1: The Deep Space Black Background */}
          <div className="absolute inset-0 w-full h-full bg-[#050505] z-0" />
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-80">
            <PassingStar />
          </div>

          {/* LAYER 2: Your Custom Passing Stars (opacity increased so you can actually see it!) */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-80">
            <AmbientStarfield />
          </div>
          

          <button
            onPointerDown={(e) => {
              e.stopPropagation(); 
              setGameState("CLOSED");
            }}
            className="absolute top-6 left-6 z-[100000] text-white/50 hover:text-white font-mono text-[11px] tracking-widest border border-white/10 px-4 py-2 rounded bg-white/5 transition-colors cursor-pointer"
          >
            [ESC] EXIT_SYSTEM
          </button>

          {/* LAYER 3: The 3D Canvas & Ship */}
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 z-20"
            style={{ opacity: gameState === "ARRIVING" ? 0 : 1 }}
          >
            <Canvas
              camera={{ position: [0, 5, 10], fov: 60 }}
              onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
            >
              <GameScene gameState={gameState} setGameState={setGameState} setScore={setScore} />
            </Canvas>
          </div>

          {/* --- HTML UI OVERLAYS (Layer 4) --- */}
          <div className="absolute bottom-6 left-6 z-30 font-mono text-[10px] text-teal-500/50 tracking-widest uppercase pointer-events-none">
            3D_RENDERING_ENGINE // R3F_ACTIVE
          </div>

          {(gameState === "PLAYING" || gameState === "CRASHED") && (
            <div className="absolute top-6 right-6 z-30 font-mono text-5xl font-bold text-teal-400 [text-shadow:0_0_15px_rgba(20,184,166,0.5)] pointer-events-none">
              {score.toString().padStart(4, "0")}
            </div>
          )}

          {/* THE NEW CINEMATIC BOOT SEQUENCE */}
          {gameState === "ARRIVING" && (
            <div className="absolute z-50 flex flex-col items-start justify-center w-full max-w-xl px-8 pointer-events-none">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.2, duration: 0.2 }} 
                className="text-teal-500/70 font-mono text-xs md:text-sm mb-2 tracking-wider"
              >
                {">"} ROOT_ACCESS_GRANTED
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.8, duration: 0.2 }} 
                className="text-teal-500/70 font-mono text-xs md:text-sm mb-2 tracking-wider"
              >
                {">"} BYPASSING_DOM_TREE... [OK]
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 1.5, duration: 0.2 }} 
                className="text-teal-500/70 font-mono text-xs md:text-sm mb-4 tracking-wider"
              >
                {">"} IGNITING_WEBGL_CONTEXT... [OK]
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 2.2 }} 
                className="text-teal-400 font-mono text-lg md:text-xl font-bold tracking-widest flex items-center drop-shadow-[0_0_8px_#14b8a6]"
              >
                <div className="w-3 h-5 bg-teal-400 mr-3 animate-pulse" />
                INITIALIZING_3D_ENVIRONMENT
              </motion.div>

            </div>
          )}

          {gameState === "READY" && (
            <div className="absolute z-50 text-center pointer-events-none animate-in zoom-in-95 duration-500">
              <div className="text-xl md:text-2xl font-bold text-teal-400 mb-2 font-mono drop-shadow-[0_0_10px_#14b8a6]">
                {">"} MANUAL_OVERRIDE_GRANTED
              </div>
              <div className="text-xs md:text-sm text-white/60 font-mono animate-pulse tracking-widest">
                TAP OR PRESS [SPACE] TO IGNITE THRUSTERS
              </div>
            </div>
          )}

          {gameState === "CRASHED" && (
            <div className="absolute z-50 inset-0 flex flex-col items-center justify-center bg-red-900/20 backdrop-blur-sm pointer-events-none">
              <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
              <div className="font-mono text-3xl md:text-4xl font-bold text-white tracking-widest mb-2 [text-shadow:0_0_20px_red]">SYSTEM_CRASH</div>
              <div className="font-mono text-sm text-white/80 tracking-widest">TAP OR PRESS [R] TO REBOOT</div>
            </div>
          )}

        </div>
      )}
      </>
    );
  }