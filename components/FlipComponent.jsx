'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';

export default function FlipComponent() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { theme } = useTheme();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  function handleFlip() {
    if (isScanning || isFlipped) return;
    
    setIsScanning(true);
    
    // Trigger flip after a "scan" delay
    setTimeout(() => {
      setIsScanning(false);
      setIsFlipped(true);
    }, 1500);
  }

  return (
    <motion.div 
      className="relative w-[180px] h-[270px] md:w-[280px] md:h-[420px] cursor-pointer touch-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleFlip}
      style={{ perspective: 1500 }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        style={{
          rotateX,
          rotateY,
          rotateY: isFlipped ? 180 : rotateY
        }}
        transition={{ 
          rotateY: { duration: 1, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        {/* FRONT: QR CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 glass-dark">
          <Image
            src="/Flip1.png"
            alt="Front"
            fill
            className="object-cover brightness-75 transition-transform duration-700 hover:scale-110"
            draggable={false}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 flex flex-col justify-end p-8 md:p-12">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <h3 className="text-white text-xl md:text-4xl font-black italic tracking-tighter mb-1 md:mb-2 uppercase">SCAN CARD</h3>
                <div className="h-1 w-10 md:w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3 md:mb-4" />
                <p className="text-white/60 text-[8px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">Secret Recipes</p>
              </motion.div>
          </div>
          
          {/* Scanning Beam */}
          <motion.div 
            animate={{ 
              top: ["0%", "100%", "0%"],
              opacity: isScanning ? [0.4, 1, 0.4] : [0.1, 0.3, 0.1],
              height: isScanning ? "15%" : "2px"
            }}
            transition={{ 
              top: { duration: isScanning ? 0.8 : 3, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.5, repeat: Infinity },
              height: { duration: 0.3 }
            }}
            className="absolute left-0 right-0 bg-gradient-to-b from-transparent via-purple-500 to-transparent blur-md z-10 pointer-events-none"
          />
          
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-purple-600/20 backdrop-blur-[1px] z-20 flex items-center justify-center"
            >
              <motion.span 
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-white font-black text-[10px] md:text-sm uppercase tracking-[0.3em] bg-black/40 px-4 py-2 rounded-full"
              >
                Scanning...
              </motion.span>
            </motion.div>
          )}
        </div>

        {/* BACK: APP LINK / REWARD */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-white/10"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <Image src="/Flip2.png" alt="Back" fill className="object-cover opacity-40 blur-[2px]" draggable={false} />
          
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-black border-[2px] border-purple-500/30 rounded-[2rem] md:rounded-[4rem]" />
          
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-12 text-center z-10">
             <motion.div
               initial={{ scale: 0.5, opacity: 0 }}
               animate={isFlipped ? { scale: 1, opacity: 1 } : {}}
               transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
               className="mb-4"
             >
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                   <span className="text-3xl md:text-5xl">🎁</span>
                </div>
             </motion.div>
             
             <h3 className="text-white text-xl md:text-3xl font-black italic tracking-tighter mb-2 uppercase">REWARD UNLOCKED</h3>
             <p className="text-purple-300 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] mb-6">Gold Membership Active</p>
             
             <motion.button
               whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}
               whileTap={{ scale: 0.95 }}
               className="px-6 py-2 md:px-8 md:py-3 rounded-full font-black text-[9px] md:text-xs uppercase tracking-widest bg-white text-black transition-all"
             >
               Claim Reward
             </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-10 border border-white/5 rounded-full -z-10 pointer-events-none"
      />
    </motion.div>
  );
}
