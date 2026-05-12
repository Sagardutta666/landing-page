'use client';

import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

export default function BrandLogo({ className = "", showIcon = true, showUnderline = true }) {
  const { theme } = useTheme();

  return (
    <div className={`inline-flex flex-row items-center font-archivo-black tracking-tighter cursor-pointer bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all whitespace-nowrap overflow-visible group ${className}`}>
      {/* Logo Image */}
      {showIcon && (
        <img 
          src="/app_logo.jpg" 
          alt="daYummeals Logo" 
          className="w-[1.2em] h-[1.2em] mr-2 rounded-lg"
        />
      )}

      {/* "da" */}
      <span className="text-black text-[1.1em] leading-none mb-[0.05em]">
        da
      </span>

      {/* "Yumm" - 4 letters colored #aa3fdd */}
      <span className="text-[#aa3fdd] text-[1.1em] leading-none relative">
        Yumm
        {showUnderline && (
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 bottom-0 h-[2px] bg-[#aa3fdd]/30 blur-[1px]"
          />
        )}
      </span>

      {/* "eals" */}
      <motion.span 
        className="text-black text-[1.1em] leading-none"
        whileHover={{ x: 2 }}
      >
        eals
      </motion.span>
    </div>
  );
}
