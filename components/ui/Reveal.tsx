'use client';
import React, { useRef, useEffect } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  as?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  as = 'div',
  style,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--reveal-delay', delay + 'ms');

    if (document.documentElement.classList.contains('no-motion')) {
      el.classList.add('in');
      return;
    }

    // If already in viewport, reveal after delay (avoids IO miss on above-fold elements)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const t = setTimeout(() => el.classList.add('in'), delay);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return React.createElement(
    as,
    { ref, className: `reveal${className ? ' ' + className : ''}`, style },
    children
  );
}
