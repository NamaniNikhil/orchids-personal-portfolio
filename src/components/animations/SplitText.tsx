"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function SplitText({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  as: Component = "span",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const chars = containerRef.current.querySelectorAll(".split-char");

    gsap.set(chars, { y: 100, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: "power4.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, stagger, duration]);

  const words = children.split(" ");

  return (
    <Component ref={(node) => { containerRef.current = node; }} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="split-char inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}
