'use client'
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

import Under90Hero from "./Under90Hero";
import BrandLogo from "./BrandLogo";

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
 
  const words = ["WELL\u00A0", "RIGHT\u00A0", "AUTHENTIC\u00A0", "HOMECOOKED\u00A0"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
 
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center transition-colors duration-700 bg-black pt-4 md:pt-0">
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
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
        
        {/* Left: Typography */}
        <motion.div 
          className="w-full lg:w-10/12 text-center lg:text-left"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center lg:items-start gap-4 mb-3 md:mb-4"
          >
            <div className="flex flex-col items-center lg:items-start gap-2">
              <BrandLogo showIcon={false} showUnderline={false} className="scale-[1.1] md:scale-[1.4] origin-center lg:origin-left bg-white px-5 py-2 mb-2" />
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/50">Authenticity Starts Here!</span>
            </div>
          </motion.div>
 
          <motion.div variants={itemVariants} className="mb-4">
            <span className="px-5 py-2 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.15em] uppercase glass text-white border-white/10">
              Tastier • Healthy • Homely
            </span>
          </motion.div>
 
          <motion.h1 
            variants={itemVariants}
            className="flex flex-col items-center lg:items-start gap-3 md:gap-2 mb-6 md:mb-8"
          >
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tighter leading-none text-white italic">
              THE ART OF
            </span>
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-3 sm:gap-5">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black tracking-tighter leading-none text-white italic pl-2 pr-4">
                EATING
              </span>
              <div className="relative w-full sm:w-auto flex items-center justify-center sm:justify-start">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="text-gradient block text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-black italic tracking-tighter text-center sm:text-left leading-none pl-3 pr-6 sm:pl-4 sm:pr-8 pb-1"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.h1>
 
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl max-w-2xl mx-auto lg:mx-0 mb-8 md:mb-10 font-light text-white/50 leading-tight px-4 md:px-0"
          >
            Discover curated home-cooked meals that blend traditional heritage with modern wellness.
          </motion.p>
 
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
             <a 
               href="https://play.google.com/store/apps/details?id=com.dayummeals.androidapp"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block px-8 md:px-12 py-5 bg-[#aa3fdd] text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-sm hover:scale-105 transition-all shadow-2xl shadow-[#aa3fdd]/40 border border-white/10"
             >
               Order Now
             </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}