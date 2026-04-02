'use client'
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header 
      className="fixed top-0 w-full h-[10vh] flex items-center justify-end px-6 md:px-12 z-[10000] pointer-events-none"
    >
      <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-[4px] border-b border-white/[0.05] pointer-events-none" />
      <div className="flex items-center gap-6 pointer-events-auto">
        {/* Animated Toggle */}
        <motion.div 
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex items-center gap-2 px-1.5 py-1.5 rounded-full cursor-pointer transition-all duration-700 shadow-xl ${theme === 'light' ? 'bg-[#F2F0EA] border border-black/5' : 'bg-[#111] border border-white/10'}`}
        >
          <div className="flex items-center gap-1">
             <div className={`px-4 py-2 rounded-full text-[9px] font-black tracking-widest transition-all duration-500 ${theme === 'light' ? 'bg-[#aa3fdd] text-[#F2F0EA] shadow-lg shadow-[#aa3fdd]/30' : 'text-white/30 hover:text-white'}`}>
                90MIN
             </div>
             <div className={`px-4 py-2 rounded-full text-[9px] font-black tracking-widest transition-all duration-500 ${theme === 'dark' ? 'bg-[#F2F0EA] text-[#1A1A1A] shadow-lg shadow-white/5' : 'text-black/30 hover:text-black'}`}>
                PRE
             </div>
          </div>
          
          {/* Animated Indicator */}
          <motion.div 
            layoutId="active-pill"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`absolute inset-0 z-[-1] rounded-full ${theme === 'light' ? 'bg-[#1A1A1A]/5' : 'bg-white/5'}`}
          />
        </motion.div>
      </div>

    </motion.header>
  );
}
