'use client';

import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { useState, useEffect, useRef } from 'react';

export default function FloatingPremiumAction({ onClick, isOpen }) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Magnetic Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const mX = useSpring(mouseX, springConfig);
  const mY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || isOpen) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) * 0.15);
      mouseY.set((e.clientY - centerY) * 0.15);
    }
  };

  const SIZE = isMobile ? 70 : 84;

  return (
    <div 
      className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[99999]"
      ref={containerRef}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={() => { setIsHovered(false); mouseX.set(0); mouseY.set(0); }}
    >
      <motion.div
        style={!isMobile ? { x: mX, y: mY } : {}}
        animate={{ scale: (!isMobile && isHovered) ? (isOpen ? 1 : 1.15) : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onMouseEnter={() => setIsHovered(true)}
        onClick={onClick}
        className="relative cursor-pointer group select-none"
      >
        {/* Main Body - PERMANENT CIRCLE BENTO */}
        <motion.div
           style={{ 
             width: SIZE, 
             height: SIZE,
             borderRadius: "100%"
           }}
           className="relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#b44fff] via-[#912bb8] to-[#7c249e] border border-white/30 shadow-[0_25px_50px_-12px_rgba(145,43,184,0.5)] ring-4 ring-white/10 backdrop-blur-xl"
        >
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('https://res.cloudinary.com/dqr68965p/image/upload/v1689650000/noise_okf8vq.png')] pointer-events-none" />
          
          {/* Icon/Close Section */}
          <div className="flex items-center justify-center relative z-20">
             <AnimatePresence mode="wait">
               <motion.div
                 key={isOpen ? 'close' : 'open'}
                 initial={{ scale: 0, rotate: -45, opacity: 0 }}
                 animate={{ scale: 1, rotate: 0, opacity: 1 }}
                 exit={{ scale: 0, rotate: 45, opacity: 0 }}
                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
                 className="text-2xl md:text-3xl"
               >
                 {isOpen ? <span className="text-white">✕</span> : <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">🍱</span>}
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Orbit Loop - Visible ONLY when IDLE & NOT Mobile */}
          <AnimatePresence>
            {!isHovered && !isOpen && !isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-20%] flex items-center justify-center p-4"
                 >
                    <svg viewBox="0 0 100 100" className="w-[140%] h-[140%] drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                       <path id="orbitPath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                       <text className="fill-white text-[10px] font-black tracking-[0.25em] uppercase">
                          <textPath href="#orbitPath">PRE-ORDER • PRE-ORDER • </textPath>
                       </text>
                    </svg>
                 </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Outer Aura Glow - DISABLED ON MOBILE */}
        {!isMobile && (
          <motion.div 
            animate={{ 
              scale: isHovered ? 1.4 : 1.1,
              opacity: isHovered ? 0.8 : 0.4,
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#912bb8] to-[#ff4ff4] blur-[45px] -z-10"
          />
        )}
        
        {/* Subtle Ring Ping - DISABLED ON MOBILE */}
        {!isOpen && !isHovered && !isMobile && (
          <motion.div 
             animate={{ scale: [1, 2], opacity: [0.5, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-0 border-2 border-[#912bb8]/50 rounded-full -z-20"
          />
        )}
      </motion.div>
    </div>
  );
}
