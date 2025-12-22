"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  content: React.ReactNode;
}

interface ThreeDImageCarouselProps {
  slides: Slide[];
  autoPlayInterval?: number;
  enableDrag?: boolean;
}

export const ThreeDImageCarousel: React.FC<ThreeDImageCarouselProps> = ({
  slides,
  autoPlayInterval = 4000,
  enableDrag = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (autoPlayInterval > 0) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlayInterval, nextSlide]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!enableDrag) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!enableDrag || !isDragging) return;
    setIsDragging(false);
    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const getSlidePosition = (index: number) => {
    const diff = (index - currentIndex + slides.length) % slides.length;
    const normalizedDiff = diff > slides.length / 2 ? diff - slides.length : diff;
    return normalizedDiff;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence initial={false}>
          {slides.map((slide, index) => {
            const position = getSlidePosition(index);
            const isCenter = position === 0;
            const absPosition = Math.abs(position);

            return (
              <motion.div
                key={slide.id}
                className="absolute"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: position * 320,
                  z: -absPosition * 200,
                  scale: isCenter ? 1 : 0.88,
                  opacity: absPosition > 2 ? 0 : 1,
                  rotateY: position * -15,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
              >
                {slide.content}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-8 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
