'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    // Fallback: IntersectionObserver for Safari, Firefox, and Chrome (since overflow-x body conflicts with CSS view() timeline)
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const rect = entry.boundingClientRect;
          const isAbove = rect.top < 0;

          if (entry.isIntersecting) {
            el.classList.add("revealed");
            el.classList.remove("exited-top", "exited-bottom");
          } else {
            el.classList.remove("revealed");
            if (isAbove) {
              el.classList.add("exited-top");
              el.classList.remove("exited-bottom");
            } else {
              el.classList.add("exited-bottom");
              el.classList.remove("exited-top");
            }
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "-40px 0px -40px 0px", // Trigger slightly inside the viewport
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach((el) => {
        if (!(el as any)._isObserved) {
          (el as any)._isObserved = true;
          observer.observe(el);
        }
      });
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        delete (el as any)._isObserved;
      });
    };
  }, [pathname]);

  return null;
}
