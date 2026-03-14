"use client";

import BrandLogo from "@/components/BrandLogo";
import Dialogbox from "@/components/Dialogbox";
import Navbar from "@/components/Navbar";
import GrainOverlay from "@/components/GrainOverlay";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Logic: Hide at top (first 30vh), show ONLY when scrolling down, hide when scrolling up.
    if (latest > window.innerHeight * 0.3) {
      if (latest > lastScrollY.current + 10) {
        setShowFloatingButton(true); // scrolling down
      } else if (latest < lastScrollY.current - 10) {
        setShowFloatingButton(false); // scrolling up
      }
    } else {
      setShowFloatingButton(false); // at the top
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
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

            {/* SMOOTH FLOATING ACTION BUTTON */}
            <AnimatePresence>
              {showFloatingButton && (
                <motion.div 
                  initial={{ y: 150, opacity: 0, x: "-50%", scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, x: "-50%", scale: 1 }}
                  exit={{ y: 150, opacity: 0, x: "-50%", scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="fixed bottom-10 left-1/2 z-[100] w-max"
                >
                  <AnimatePresence mode="wait">
                    {openDialog ? (
                      <motion.button
                        key="close"
                        onClick={() => setOpenDialog(false)}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border transition-colors ${theme === 'light' ? 'bg-black text-white border-white/20' : 'bg-white text-black border-black/10'}`}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="text-2xl font-light">&times;</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        key="open"
                        onClick={() => setOpenDialog(true)}
                        className={`px-8 py-3 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px] flex items-center gap-3 transition-all relative overflow-hidden group ${theme === 'light' ? 'bg-white text-black border border-orange-100' : 'bg-white text-black'}`}
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Shimmer Effect for Light Theme */}
                        {theme === 'light' && (
                          <motion.div 
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-100/30 to-transparent skew-x-12"
                          />
                        )}
                        <span className="relative z-10">Kal ka kya plan hai?</span>
                        <motion.span 
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-lg relative z-10"
                        >
                           🍱
                        </motion.span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

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
