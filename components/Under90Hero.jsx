'use client'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Under90Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Mouse movement for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const bowlX = useTransform(springX, [-0.5, 0.5], ["-30px", "30px"]);
  const bowlY = useTransform(springY, [-0.5, 0.5], ["-30px", "30px"]);

  // Scroll animations
  const textY = useTransform(scrollY, [0, 500], [0, 200]);
  const bgOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale90 = useTransform(scrollY, [0, 500], [1, 1.5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#fafafa] overflow-hidden flex items-center justify-center">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
             backgroundSize: '40px 40px' 
           }} 
      />

      {/* Large "90" Backdrop */}
      <motion.div 
        style={{ scale: scale90, opacity: 0.05 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[60vw] font-black leading-none text-black tracking-tighter">90</span>
      </motion.div>

      {/* Floating Speed Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%", y: Math.random() * 100 + "%" }}
            animate={{ x: "200%" }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute h-[1px] w-[200px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-[1px]"
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Text Section */}
        <motion.div 
          style={{ y: textY }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center lg:items-start gap-4 mb-6"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-purple-500/20">
              Rush Hour Ready
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
              — Handcrafted with love in local homes
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl xl:text-9xl font-black text-black tracking-tighter leading-[0.85] mb-8"
          >
            MADE IN <br />
            <span className="text-purple-600">HOME</span> <br /> 
            <span className="relative">
              KITCHENS
              <motion.div 
                animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 h-2 bg-purple-600/30 rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-500 font-light max-w-xl mx-auto lg:mx-0 leading-tight mb-12"
          >
            Experience the warmth of <span className="text-black font-bold italic">freshly made home food</span>. Crafted with love by local home chefs and delivered in under 90 minutes.
          </motion.p>

        </motion.div>

        {/* 3D Bowl Showcase */}
        <motion.div 
          style={{ rotateX, rotateY, x: bowlX, y: bowlY }}
          className="w-full lg:w-1/2 relative flex justify-center perspective-[2000px]"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.5 }}
            className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
          >
            {/* Background Halo */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-[100px] rounded-full"
            />
            
            {/* Main Bowl Image */}
            <img 
              src="/under90_bowl.png" 
              alt="Gourmet Bowl" 
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_50px_80px_rgba(0,0,0,0.15)]"
            />

            {/* Floating Accents */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-white/80 backdrop-blur-xl rounded-2xl border border-black/5 shadow-2xl flex flex-col items-center justify-center p-4 z-20"
            >
              <span className="text-4xl">⏱️</span>
              <span className="text-[10px] font-black text-black mt-2">AVG. 35 MIN</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 w-40 h-16 bg-white/80 backdrop-blur-xl rounded-2xl border border-black/5 shadow-2xl flex items-center justify-center gap-3 p-4 z-20"
            >
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" />
                   </div>
                 ))}
              </div>
              <span className="text-[8px] font-black text-black/60 uppercase tracking-widest">4.9/5 Rating</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-6 h-10 rounded-full border-2 border-black/10 flex justify-center p-1">
           <motion.div 
             animate={{ y: [0, 12, 0] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="w-1.5 h-1.5 bg-purple-600 rounded-full"
           />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20">Explore Fresh</span>
      </motion.div>
    </div>
  );
}
