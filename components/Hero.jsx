'use client'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

import Under90Hero from "./Under90Hero";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  if (theme === 'light') {
    return <Under90Hero />;
  }

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    initial: { y: 30, opacity: 0, scale: 0.95 },
    animate: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden flex items-center justify-center transition-colors duration-700 bg-black`}>
      {/* Background Video */}
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover brightness-[0.4]`}
        src={isMobile ? "/homescreen_phone.mp4" : "/homescreen_video.mp4"}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Hero Content Overlay */}
      <motion.div 
        className="relative z-10 text-center px-4"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className={`px-6 py-2 rounded-full text-sm font-medium tracking-[0.2em] uppercase glass text-white`}>
            Taste the Future
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className={`text-4xl md:text-8xl font-black mb-4 md:mb-6 tracking-tighter leading-[0.9] text-white`}
        >
          Elevate Your <br /><span className="text-gradient">Dining Experience</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light text-gray-300`}
        >
          Discover curated meals that blend traditional flavors with modern nutrition.
        </motion.p>
      </motion.div>

      {/* Elegant Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className={`text-xs font-medium tracking-widest uppercase mb-2 text-white/50`}>Scroll</span>
        <div className={`w-[1px] h-12 bg-gradient-to-b from-current to-transparent text-white`} />
      </motion.div>
    </div>
  );
}