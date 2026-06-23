'use client';

import { useEffect, useState, useRef } from "react";

type TextScrambleProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  duration?: number;
};

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export default function TextScramble({
  text,
  className,
  as: Component = "span",
  duration = 250,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const targetLength = text.length;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          
          // Eased character reveal based on horizontal position
          const threshold = progress * (1.2) - (index / targetLength) * 0.2;
          
          if (progress >= 1 || threshold > 0.8) {
            return char;
          }
          
          // Random character noise
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, duration]);

  return <Component className={className}>{displayText}</Component>;
}
