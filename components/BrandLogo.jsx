'use client';

import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

export default function BrandLogo({ className = "" }) {
  const { theme } = useTheme();

  return (
    <div className={`inline-flex items-center justify-center gap-0 font-black italic tracking-tighter cursor-pointer group bg-[#F2F0EA] px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap flex-nowrap ${className}`}>
      {/* "da" */}
      <span className="text-black text-[0.9em]">
        da
      </span>

      {/* "Yum" - Now Colored #aa3fdd without border */}
      <div className="relative">
        {/* Floating Shine Path - Internal only */}
        <motion.div 
          className="absolute inset-0 z-[1] overflow-hidden rounded-full pointer-events-none"
        >
          <motion.div
            animate={{ 
              x: ["-100%", "100%"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-[#aa3fdd]/10 to-transparent skew-x-12"
          />
        </motion.div>

        {/* The Text "Yum" - Colored #aa3fdd */}
        <span className="relative z-10 text-[0.95em]" style={{ color: "#aa3fdd" }}>
          Yum
        </span>
      </div>

      {/* "meals" */}
      <motion.span 
        className="text-black text-[0.9em]"
        whileHover={{ x: 2 }}
      >
        meals
      </motion.span>
    </div>
  );
}
