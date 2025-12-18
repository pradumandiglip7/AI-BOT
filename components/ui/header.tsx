"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "AI Signals", href: "hero" },
    { label: "Features", href: "features" },
    { label: "How it Works", href: "how-it-works" },
    { label: "Technology", href: "technology" },
    { label: "Pricing", href: "pricing" },
    { label: "Learn More", href: "footer" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-secondary/95 backdrop-blur-lg border-b border-gray-800/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              AI Market Bot
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-white hover:bg-gray-800"
              onClick={() => window.location.href = '/login'}
            >
              Login
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/50"
              onClick={() => window.location.href = '/signup'}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors z-50 relative"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-secondary/98 backdrop-blur-lg border-b border-gray-800/50 relative z-40"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-left text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-lg transition-all duration-200 font-medium active:bg-gray-800/70 cursor-pointer"
              >
                {link.label}
              </motion.button>
            ))}
            <div className="pt-3 space-y-2 border-t border-gray-800">
              <Button
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => window.location.href = '/login'}
              >
                Login
              </Button>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/50 cursor-pointer"
                onClick={() => window.location.href = '/signup'}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
