'use client'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/ThemeContext";

export default function Under90Hero() {
  const { openOrderNow } = useTheme();
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="text-6xl md:text-8xl xl:text-9xl font-black text-black tracking-tighter leading-[0.85] mb-8 flex flex-col items-center lg:items-start"
          >
            <div className="overflow-hidden">
               <motion.span 
                 initial={{ y: "100%" }}
                 whileInView={{ y: 0 }}
                 viewport={{ once: false }}
                 transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
                 className="block"
               >
                 MADE IN
               </motion.span>
            </div>
            <div className="overflow-hidden">
               <motion.span 
                 initial={{ y: "100%" }}
                 whileInView={{ y: 0 }}
                 viewport={{ once: false }}
                 transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.5 }}
                 className="text-purple-600 block"
               >
                 HOME
               </motion.span>
            </div>
            <div className="overflow-hidden">
               <span className="relative block">
                 <motion.span
                   initial={{ y: "100%" }}
                   whileInView={{ y: 0 }}
                   viewport={{ once: false }}
                   transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.6 }}
                   className="block"
                 >
                   KITCHENS
                 </motion.span>
                 <motion.div 
                   animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -bottom-2 h-2 bg-purple-600/30 rounded-full"
                 />
               </span>
            </div>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-500 font-light max-w-xl mx-auto lg:mx-0 leading-tight mb-8"
          >
            Experience the warmth of <span className="text-black font-bold italic">freshly made home food</span>. Crafted with love by local home chefs and delivered in under 90 minutes.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center lg:justify-start"
          >
            <button 
              onClick={openOrderNow}
              className="px-10 py-5 bg-purple-600 text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all shadow-2xl shadow-purple-500/40 border border-white/10"
            >
              Order Now
            </button>
          </motion.div>
        </motion.div>

        {/* 3D Showcase (Replacing Bowl with Layered Stack) */}
        <motion.div 
          className="w-full lg:w-1/2 relative flex justify-center perspective-[2000px]"
        >
          <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">
             {[
               { src: "/under90_product screen.png", rotate: -10, x: -30 },
               { src: "/under90_orderstatus screen.png", rotate: 0, x: 0 },
               { src: "/dashboard_updated_new.png", rotate: 10, x: 30 }
             ].map((img, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, x: 100, rotate: 20 }}
                 animate={{ opacity: 1, x: img.x, rotate: img.rotate }}
                 transition={{ delay: 1 + i * 0.2, type: "spring", stiffness: 60 }}
                 className="absolute inset-10 border-4 border-white shadow-2xl bg-white"
               >
                 <img src={img.src} className="w-full h-full object-contain" alt="app" />
               </motion.div>
             ))}

             {/* Floating Badge */}
             <motion.div
               initial={{ scale: 0, rotate: -45 }}
               whileInView={{ scale: 1, rotate: 0 }}
               viewport={{ once: false }}
               animate={{ y: [0, -10, 0] }}
               transition={{ 
                 initial: { type: "spring", stiffness: 200, damping: 15 },
                 animate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
               }}
               className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest text-center px-4 shadow-2xl shadow-purple-500/30"
             >
                Order Express
             </motion.div>
          </div>
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
