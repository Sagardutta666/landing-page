"use client";

import BrandLogo from "@/components/BrandLogo";
import Dialogbox from "@/components/Dialogbox";
import Navbar from "@/components/Navbar";
import GrainOverlay from "@/components/GrainOverlay";
import FloatingPremiumAction from "@/components/FloatingPremiumAction";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'light' ? 'bg-[#F2F0EA] text-[#1A1A1A]' : 'bg-black text-white'}`}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="preloader"
            className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-black z-[9999]"
            exit={{ 
              y: "-100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
          >
             <motion.div 
               initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
               animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="relative overflow-hidden"
             >
                <div className="text-4xl md:text-6xl">
                   <BrandLogo />
                </div>
                {/* Reveal line */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
             </motion.div>
             <motion.p
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: [0, 1, 0.5] }}
               transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}
               className="text-[10px] text-white/40 uppercase tracking-[1em] mt-8 font-black"
             >
                Loading Deliciousness
             </motion.p>
          </motion.div>
        ) : (
          <motion.div 
            key="main-layout"
            className="flex flex-col min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Navbar />
            <GrainOverlay />
            
            <main className="flex-1">
              {children}
            </main>

            {/* PREMIUM MORPHING INTERACTION (RIGHT SIDE) */}
            <FloatingPremiumAction 
              isOpen={openDialog} 
              onClick={() => setOpenDialog(!openDialog)} 
            />

            <AnimatePresence>
              {openDialog && (
                <Dialogbox open={openDialog} onClose={() => setOpenDialog(false)} />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeProvider>
  );
}
