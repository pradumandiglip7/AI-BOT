'use client'


import { ReactNode, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TimelineContentProps {
  children: ReactNode
  as?: any
  animationNum: number
  customVariants?: any
  className?: string
}

export function TimelineContent({
  children,
  as = 'div',
  animationNum,
  customVariants,
  className,
}: TimelineContentProps) {
  const Component = (motion as any)[as] as any;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      custom={animationNum}
      animate={inView ? 'visible' : 'hidden'}
      initial="hidden"
      variants={customVariants || {
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.03,
            duration: 0.12,
          },
        }),
        hidden: {
          opacity: 0,
          y: 20,
        },
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
