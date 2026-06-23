'use client';

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: string;
};

export default function StatCounter({ value }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const numPart = parseInt(value, 10);
    const suffix = value.replace(String(numPart), "");

    if (isNaN(numPart)) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTime: number | null = null;
            const duration = 1200; // Animation duration in ms

            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease out quad formula: f(t) = t * (2 - t)
              const easeProgress = progress * (2 - progress);
              const currentVal = Math.floor(easeProgress * numPart);

              setDisplayValue(`${currentVal}${suffix}`);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(value);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [value]);

  return <span ref={elementRef}>{displayValue}</span>;
}
