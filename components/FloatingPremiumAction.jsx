'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { useState, useEffect } from 'react';

export default function FloatingPremiumAction({ onClick, isOpen }) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const text = "KAL KA KYA PLAN HAI? • KAL KA KYA PLAN HAI? • ";

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[99999]">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className="relative cursor-pointer group"
      >
        {/* Main Expanding Container */}
        <motion.div
          animate={{
            width: isHovered ? (isMobile ? 120 : 160) : (isMobile ? 52 : 64),
            height: (isMobile ? 52 : 64),
            borderRadius: isHovered ? "1.5rem" : "50%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`relative overflow-hidden shadow-2xl flex items-center justify-center border border-white/20 bg-[#aa3fdd] text-white backdrop-blur-xl`}
        >
          {/* Rotating Ring (Only visible when NOT hovered) */}
          <AnimatePresence>
            {!isHovered && !isOpen && (
              <motion.div
                key="rotating-ring"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg viewBox="0 0 100 100" className="w-[110%] h-[110%] overflow-visible opacity-40">
                  <path id="badgePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                  <text className="text-[10px] font-black tracking-[0.28em] fill-white/80">
                    <textPath href="#badgePath" startOffset="0%">{text}</textPath>
                  </text>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Icon / Content State */}
          <div className={`flex items-center justify-center gap-2 relative z-10 w-full h-full ${isHovered ? 'px-4' : ''}`}>
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              className="text-2xl md:text-3xl flex items-center justify-center h-full"
            >
              {isOpen ? '✕' : '🍱'}
            </motion.div>
            
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] whitespace-nowrap text-white"
                >
                  {isOpen ? 'Close' : 'Plan?'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Shimmer Effect */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-${theme === 'light' ? 'purple' : 'white'}-100/20 to-transparent skew-x-12`}
          />
        </motion.div>

        {/* Outer Glow */}
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.4 : 1.1,
            opacity: isHovered ? 0.4 : 0.2
          }}
          className={`absolute inset-0 rounded-full blur-2xl -z-10 transition-colors ${theme === 'light' ? 'bg-[#aa3fdd]/30' : 'bg-purple-600'}`}
        />
      </motion.div>
    </div>
  );
}
