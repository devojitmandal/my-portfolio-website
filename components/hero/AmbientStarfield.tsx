"use client";
import { useEffect, useRef } from "react";

export function AmbientStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number; dAlpha: number }[] = [];

    const init = () => {
      // Set canvas to exactly match the screen
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      
      // Calculate a healthy amount of stars based on screen size
      const numStars = Math.floor((canvas.width * canvas.height) / 8000); 
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 0.1, // Extremely slow horizontal drift
          vy: (Math.random() - 0.5) * 0.1, // Extremely slow vertical drift
          alpha: Math.random(),
          dAlpha: (Math.random() - 0.5) * 0.02, // Twinkle speed
        });
      }
    };

    const render = () => {
      // Wipe the screen clean every frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        // 1. Twinkle Math
        star.alpha += star.dAlpha;
        if (star.alpha <= 0.1 || star.alpha >= 1) star.dAlpha *= -1;

        // 2. Drift Math
        star.x += star.vx;
        star.y += star.vy;

        // 3. Infinite Wrap-around (if a star floats off screen, teleport it to the other side)
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // 4. Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });
      
      // Request the next frame (60fps loop)
      animationFrameId = requestAnimationFrame(render);
    };

    init();
    render();

    // Recalculate if the user resizes their browser window
    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // pointer-events-none ensures you can still click the buttons underneath the stars
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-60 pointer-events-none z-0" />;
}