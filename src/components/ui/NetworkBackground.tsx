'use client';

import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(c: CanvasRenderingContext2D, isDark: boolean) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = isDark ? "rgba(222, 185, 146, 0.45)" : "rgba(133, 96, 81, 0.45)";
        c.fill();
      }
    }

    class Pulse {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      progress: number;
      speed: number;
      targetParticleIndex: number;

      constructor(startX: number, startY: number, endX: number, endY: number, targetParticleIndex: number) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.progress = 0;
        this.speed = Math.random() * 0.02 + 0.015;
        this.targetParticleIndex = targetParticleIndex;
      }

      update() {
        this.progress += this.speed;
      }

      draw(c: CanvasRenderingContext2D, isDark: boolean) {
        const x = this.startX + (this.endX - this.startX) * this.progress;
        const y = this.startY + (this.endY - this.startY) * this.progress;

        const pulseColor = isDark ? "rgba(245, 158, 11, 0.95)" : "rgba(217, 119, 6, 0.95)";
        
        c.save();
        c.shadowBlur = 10;
        c.shadowColor = pulseColor;
        
        c.beginPath();
        c.arc(x, y, 4, 0, Math.PI * 2);
        c.fillStyle = pulseColor;
        c.fill();

        c.beginPath();
        c.arc(x, y, 1.8, 0, Math.PI * 2);
        c.fillStyle = "rgba(255, 255, 255, 0.95)";
        c.fill();

        c.restore();
      }
    }

    const maxParticles = Math.min(Math.floor((width * height) / 14000), 90);
    const particles: Particle[] = [];
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    let activePulses: Pulse[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const drawConnectionsAndSpawns = (isDark: boolean) => {
      if (!ctx) return;
      
      const connectionLimit = 115;
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const neighbors: number[] = [];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionLimit) {
            neighbors.push(j);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const alpha = (1 - dist / connectionLimit) * (isDark ? 0.16 : 0.22);
            ctx.strokeStyle = isDark ? `rgba(222, 185, 146, ${alpha})` : `rgba(133, 96, 81, ${alpha})`;
            ctx.lineWidth = isDark ? 0.8 : 0.9;
            ctx.stroke();
          }
        }

        if (neighbors.length > 0 && Math.random() < 0.0012) {
          const targetIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
          const p2 = particles[targetIndex];
          activePulses.push(new Pulse(p1.x, p1.y, p2.x, p2.y, targetIndex));
        }

        if (mouseX > 0 && mouseY > 0) {
          const dx = p1.x - mouseX;
          const dy = p1.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            
            const alpha = (1 - dist / 135) * (isDark ? 0.25 : 0.35);
            ctx.strokeStyle = isDark ? `rgba(222, 185, 146, ${alpha})` : `rgba(133, 96, 81, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();

            const force = (135 - dist) / 135;
            p1.x += (dx / dist) * force * 0.7;
            p1.y += (dy / dist) * force * 0.7;

            if (Math.random() < 0.006 && activePulses.length < 35) {
              const nearbyNeighbors = neighbors.filter(idx => {
                const np = particles[idx];
                const ndx = np.x - p1.x;
                const ndy = np.y - p1.y;
                return Math.sqrt(ndx * ndx + ndy * ndy) < connectionLimit;
              });
              if (nearbyNeighbors.length > 0) {
                const targetIndex = nearbyNeighbors[Math.floor(Math.random() * nearbyNeighbors.length)];
                const targetNode = particles[targetIndex];
                activePulses.push(new Pulse(p1.x, p1.y, targetNode.x, targetNode.y, targetIndex));
              }
            }
          }
        }
      }
    };

    const updateAndDrawPulses = (isDark: boolean) => {
      if (!ctx) return;
      
      const connectionLimit = 115;
      const nextPulses: Pulse[] = [];

      for (let i = 0; i < activePulses.length; i++) {
        const pulse = activePulses[i];
        pulse.update();

        if (pulse.progress < 1) {
          pulse.draw(ctx, isDark);
          nextPulses.push(pulse);
        } else {
          if (Math.random() < 0.55 && nextPulses.length < 35) {
            const targetNode = particles[pulse.targetParticleIndex];
            if (targetNode) {
              const targetNeighbors: number[] = [];
              for (let j = 0; j < particles.length; j++) {
                if (j === pulse.targetParticleIndex) continue;
                const p2 = particles[j];
                const dx = targetNode.x - p2.x;
                const dy = targetNode.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < connectionLimit) {
                  targetNeighbors.push(j);
                }
              }

              if (targetNeighbors.length > 0) {
                const nextTargetIdx = targetNeighbors[Math.floor(Math.random() * targetNeighbors.length)];
                const nextTarget = particles[nextTargetIdx];
                nextPulses.push(new Pulse(targetNode.x, targetNode.y, nextTarget.x, nextTarget.y, nextTargetIdx));
              }
            }
          }
        }
      }
      activePulses = nextPulses;
    };

    const animate = () => {
      if (!ctx) return;
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        particles.forEach((p) => {
          p.update();
          p.draw(ctx, isDark);
        });

        drawConnectionsAndSpawns(isDark);
        updateAndDrawPulses(isDark);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
