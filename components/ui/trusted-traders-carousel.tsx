"use client";

import React from "react";
import { ThreeDImageCarousel } from "./three-d-image-carousel";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  profit: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Day Trader",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    rating: 5,
    profit: "+142% YTD",
    message: "The AI signals are incredibly accurate. I've been trading for 8 years, and this is the first tool that consistently delivers alpha. The risk management features alone are worth the subscription.",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Crypto Investor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
    profit: "+89% YTD",
    message: "Finally, a bot that understands crypto volatility. The LSTM predictions caught the last three major reversals before they happened. My portfolio has never been more stable.",
  },
  {
    id: 3,
    name: "Marcus Reynolds",
    role: "Financial Analyst",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 5,
    profit: "+67% YTD",
    message: "As someone who analyzes market data all day, I'm impressed by the sophistication of the models. The signal-to-noise ratio is exceptional, and the win rate speaks for itself.",
  },
  {
    id: 4,
    name: "Daniel Kovac",
    role: "Quant Trader",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    profit: "+173% YTD",
    message: "I've backtested dozens of signal providers. This one's different. The machine learning adapts to regime changes faster than any algo I've built myself. Genuinely cutting-edge.",
  },
  {
    id: 5,
    name: "Priya Malhotra",
    role: "Swing Trader",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    profit: "+94% YTD",
    message: "Perfect for my swing trading style. The 4-hour signals are precise, and I love that I can customize risk levels. My strike rate has improved by 40% since joining.",
  },
  {
    id: 6,
    name: "Luis Fernández",
    role: "Forex Trader",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    rating: 5,
    profit: "+121% YTD",
    message: "The forex pairs coverage is unmatched. GBP/USD and EUR/JPY signals have been especially profitable. The stop-loss recommendations saved me during the last Fed announcement.",
  },
  {
    id: 7,
    name: "Ethan Brooks",
    role: "Portfolio Manager",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
    rating: 5,
    profit: "+58% YTD",
    message: "I manage a $12M portfolio, and this is now part of my core strategy. The institutional-grade analytics and transparency give me confidence to allocate serious capital.",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; isCenter: boolean }> = ({
  testimonial,
  isCenter,
}) => {
  return (
    <motion.div
      className={`
        relative w-80 h-96 rounded-2xl p-6 
        bg-gradient-to-br from-gray-900/90 to-gray-800/80
        backdrop-blur-xl border border-gray-700/50
        shadow-2xl transition-all duration-300
        ${isCenter ? "shadow-[0_0_40px_rgba(45,104,255,0.3)]" : "shadow-[0_0_20px_rgba(45,104,255,0.1)]"}
      `}
      whileHover={
        isCenter
          ? {
              scale: 1.02,
              boxShadow: "0 0 50px rgba(45,104,255,0.4)",
            }
          : {}
      }
      aria-label={`Testimonial from ${testimonial.name}, ${testimonial.role}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
      
      <div className="relative h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ duration: 0.2 }}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 border border-accent/40"
            whileHover={{ boxShadow: "0 0 20px rgba(0,209,143,0.4)" }}
          >
            <TrendingUp className="w-3 h-3 text-accent" />
            <span className="text-xs font-bold text-accent">{testimonial.profit}</span>
          </motion.div>
        </div>

        <div className="flex-1 mb-4">
          <p className="text-sm leading-relaxed text-gray-100">
            "{testimonial.message}"
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-700/50">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-md" />
            <img
              src={testimonial.avatar}
              alt={`${testimonial.name} avatar`}
              className="relative w-12 h-12 rounded-full object-cover border-2 border-primary/50"
            />
          </div>
          <div>
            <h4 className="font-semibold text-white">
              {testimonial.name}
            </h4>
            <p className="text-xs text-gray-400">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TrustedTradersCarousel: React.FC = () => {
  const [centerIndex, setCenterIndex] = React.useState(0);

  const slides = testimonials.map((testimonial, index) => ({
    id: testimonial.id,
    content: (
      <TestimonialCard
        testimonial={testimonial}
        isCenter={index === centerIndex}
      />
    ),
  }));

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <span className="text-sm font-semibold text-primary">TRUSTED BY SERIOUS TRADERS</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Real Results from Real Traders
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of professional traders who trust our AI-powered signals to maximize their profits
          </p>
        </motion.div>

        <div className="h-[500px] md:h-[550px]">
          <ThreeDImageCarousel
            slides={slides}
            autoPlayInterval={5000}
            enableDrag={true}
          />
        </div>
      </div>
    </section>
  );
};
