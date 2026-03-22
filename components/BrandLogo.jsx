'use client';

import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

export default function BrandLogo({ className = "" }) {
  const { theme } = useTheme();

  return (
    <div className={`inline-flex flex-row items-baseline font-black italic tracking-tighter cursor-pointer group bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all whitespace-nowrap overflow-visible ${className}`}>
      {/* "da" */}
      <span className="text-black text-[1em] leading-none">
        da
      </span>

      {/* "Yumm" - 4 letters colored #aa3fdd */}
      <span className="text-[#aa3fdd] text-[1.1em] leading-none relative">
        Yumm
        <motion.div 
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 bottom-0 h-[2px] bg-[#aa3fdd]/30 blur-[1px]"
        />
      </span>

      {/* "eals" */}
      <motion.span 
        className="text-black text-[1em] leading-none"
        whileHover={{ x: 2 }}
      >
        eals
      </motion.span>
    </div>
  );
}
