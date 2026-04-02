'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Splash({ theme, type = "90MIN" }) {
  const isLight = theme === 'light';
  const accent = "#aa3fdd";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%", 
        opacity: 0,
        pointerEvents: "none",
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
      }}
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden ${isLight ? 'bg-[#F2F0EA]' : 'bg-black'}`}
    >
      <div className="relative">
        {/* Background Radial Glow */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[60px] pointer-events-none opacity-20 ${isLight ? 'bg-purple-200' : 'bg-purple-900/40'}`} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-12 mb-16">
            <BrandLogo 
              showIcon={false} 
              showUnderline={false} 
              className="scale-[1.6] md:scale-[2.4] origin-center bg-white px-6 py-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)]" 
            />
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className={`text-[8px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em] whitespace-nowrap will-change-transform transform-gpu ${isLight ? 'text-gray-400/80' : 'text-white/40'}`}
            >
              Authenticity Starts Here!
            </motion.span>
          </div>

          {/* Progress Reveal Line */}
          <div className={`w-40 md:w-48 h-[1px] md:h-[2px] rounded-full relative overflow-hidden ${isLight ? 'bg-gray-200' : 'bg-white/10'}`}>
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#aa3fdd] to-transparent will-change-transform transform-gpu`}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5] }}
        transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}
        className={`fixed bottom-12 text-[9px] font-black uppercase tracking-[1em] ${isLight ? 'text-gray-400' : 'text-white/20'}`}
      >
        LOADING MOM'S MAGIC
      </motion.p>
    </motion.div>
  );
}
