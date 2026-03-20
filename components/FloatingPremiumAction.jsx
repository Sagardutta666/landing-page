'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { useState } from 'react';

export default function FloatingPremiumAction({ onClick, isOpen }) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const text = "KAL KA KYA PLAN HAI? • KAL KA KYA PLAN HAI? • ";

  return (
    <div className="fixed bottom-10 right-10 z-[1001]">
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
            width: isHovered ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 150) : (typeof window !== 'undefined' && window.innerWidth < 768 ? 48 : 60),
            height: (typeof window !== 'undefined' && window.innerWidth < 768 ? 48 : 60),
            borderRadius: isHovered ? "1.2rem" : "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`relative overflow-hidden shadow-xl flex items-center justify-center border backdrop-blur-xl ${theme === 'light' ? 'bg-[#F2F0EA]/90 border-[#814A20]/10' : 'bg-[#1A1A1A]/90 border-white/10'}`}
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
                className="absolute inset-0 flex items-center justify-center p-1"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible opacity-40">
                  <path id="badgePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className={`text-[10px] font-black tracking-[0.2em] ${theme === 'light' ? 'fill-black' : 'fill-white'}`}>
                    <textPath href="#badgePath">{text}</textPath>
                  </text>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Icon / Content State */}
          <div className="flex items-center gap-3 px-4 relative z-10">
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              className="text-2xl md:text-3xl"
            >
              {isOpen ? '✕' : (isHovered ? '🍱' : '🍱')}
            </motion.div>
            
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${theme === 'light' ? 'text-black' : 'text-white'}`}
                >
                  {isOpen ? 'Close' : 'Click Me'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Shimmer Effect */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-${theme === 'light' ? 'orange' : 'white'}-100/20 to-transparent skew-x-12`}
          />
        </motion.div>

        {/* Outer Glow */}
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.4 : 1.1,
            opacity: isHovered ? 0.4 : 0.2
          }}
          className={`absolute inset-0 rounded-full blur-2xl -z-10 transition-colors ${theme === 'light' ? 'bg-orange-400' : 'bg-purple-600'}`}
        />
      </motion.div>
    </div>
  );
}
