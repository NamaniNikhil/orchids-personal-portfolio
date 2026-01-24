"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  once?: boolean;
  start?: string;
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  duration = 1,
  y = 60,
  x = 0,
  scale = 1,
  once = true,
  start = "top 85%",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    gsap.set(ref.current, { opacity: 0, y, x, scale });

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      onEnter: () => {
        if (once && hasAnimated.current) return;
        hasAnimated.current = true;
        
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => {
        if (!once && hasAnimated.current) {
          hasAnimated.current = false;
          gsap.to(ref.current, {
            opacity: 0,
            y,
            x,
            scale,
            duration: duration * 0.5,
            ease: "power3.in",
          });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, duration, y, x, scale, once, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
