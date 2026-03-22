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
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden ${isLight ? 'bg-[#F2F0EA]' : 'bg-black'}`}
    >
      <div className="relative">
        {/* Background Radial Glow */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[100px] pointer-events-none opacity-20 ${isLight ? 'bg-purple-200' : 'bg-purple-900/40'}`} />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Logo Section */}
          <div className="text-4xl md:text-6xl mb-12">
            <BrandLogo />
          </div>

          {/* Type-Specific Loading Work */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              {type === "90MIN" ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className={`p-3 rounded-2xl border ${isLight ? 'bg-white border-purple-100 text-[#aa3fdd]' : 'bg-white/5 border-white/10 text-white'}`}
                >
                  <Timer size={24} />
                </motion.div>
              ) : (
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`p-3 rounded-2xl border ${isLight ? 'bg-white border-purple-100 text-[#aa3fdd]' : 'bg-pink-500/20 border-pink-500/30 text-pink-500'}`}
                >
                  <Zap size={24} />
                </motion.div>
              )}
              
              <div className="h-6 w-[1px] bg-gray-300/30 mx-2" />
              
              <span className={`text-[12px] font-black uppercase tracking-[0.5em] ${isLight ? 'text-gray-400' : 'text-white/40'}`}>
                {type === "90MIN" ? "Mom's Magic" : "Authentic Art"}
              </span>
            </div>

            {/* Progress Reveal Line */}
            <div className={`w-40 h-[2px] rounded-full relative overflow-hidden ${isLight ? 'bg-gray-200' : 'bg-white/10'}`}>
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#aa3fdd] to-transparent`}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className={`fixed bottom-12 text-[9px] font-black uppercase tracking-[1em] ${isLight ? 'text-gray-400' : 'text-white/20'}`}
      >
        Authenticity starts here
      </motion.p>
    </motion.div>
  );
}
