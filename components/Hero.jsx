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
    <div className={`relative w-full h-[100dvh] overflow-hidden flex items-center justify-center transition-colors duration-700 bg-black pt-[12vh] md:pt-[14vh]`}>
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
          <motion.div variants={itemVariants} className="mb-6">
            <span className="px-6 py-1 rounded-full text-[10px] font-black tracking-[0.3em] uppercase glass text-white border-purple-500/30">
              Tastier • Faster • Thinner
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-8xl lg:text-8xl font-black mb-6 tracking-tighter leading-[0.85] text-white uppercase italic"
          >
            THE ART OF <br /><span className="text-gradient">EATING WELL.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl max-w-2xl mx-auto lg:mx-0 mb-12 font-light text-white/50 leading-tight"
          >
            Discover curated home-cooked meals that blend traditional heritage with modern wellness.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
             <a 
               href="https://play.google.com/store/apps/details?id=com.dayummeals.androidapp"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block px-12 py-5 bg-[#aa3fdd] text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-sm hover:scale-105 transition-all shadow-2xl shadow-[#aa3fdd]/40 border border-white/10"
             >
               Order Now
             </a>
          </motion.div>
        </motion.div>
      </div>

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