'use client';

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import BrandLogo from "./BrandLogo";
import ChefRegistrationDialog from "./ChefRegistrationDialog";
import { ChefHat, Timer, ArrowRight, Heart, Sparkles, Star, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function Under90Experience() {
  const [isChefDialogOpen, setIsChefDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const { theme, openPolicy, openPartner, openContact } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handlePolicyOpen = (e, type) => {
    e.preventDefault();
    openPolicy(type, "90MIN");
  };

  const handlePartnerOpen = (e) => {
    e.preventDefault();
    openPartner();
  };

  const handleContactOpen = (e) => {
    e.preventDefault();
    openContact();
  };

  return (
    <div className="relative bg-[#F2F0EA]">
      {/* 1. SCROLL-DRIVEN EXPERIENCE PARENT */}
      <div ref={containerRef} className="relative h-[500vh]">
        {/* STICKY DYNAMIC CANVAS */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
          
          {/* Organic Background Elements */}
          <motion.div 
            style={{ x: isMobile ? 0 : mouseX, y: isMobile ? 0 : mouseY }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none -z-10
              ${isMobile ? 'w-[100vw] h-[100vw] bg-purple-100/30 blur-[60px]' : 'w-[140vw] h-[140vw] bg-purple-100/40 blur-[150px]'}`}
          />

          {/* THE "STORY ENGINE" */}
          <div className="relative h-full w-full flex items-center justify-center">
            <SceneSwitcher 
              progress={smoothProgress} 
              mouseX={mouseX} 
              mouseY={mouseY} 
              onChefClick={() => setIsChefDialogOpen(true)}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>

      {/* 2. PREMIUM FOOTER */}
      <footer className="w-full bg-white py-20 border-t border-purple-100 relative z-[100]">
          <div className="container mx-auto px-6 text-center">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-gray-400 italic">
               <a 
                 href="#" 
                 onClick={(e) => handlePolicyOpen(e, "TERMS")}
                 className="hover:text-[#aa3fdd] transition-colors"
               >
                 Terms & Conditions
               </a>
               <a 
                 href="#" 
                 onClick={(e) => handlePolicyOpen(e, "PRIVACY")}
                 className="hover:text-[#aa3fdd] transition-colors"
               >
                 Privacy Policy
               </a>
               <a 
                 href="#" 
                 onClick={(e) => handlePolicyOpen(e, "ABOUT")}
                 className="hover:text-[#aa3fdd] transition-colors"
               >
                 About Us
               </a>
               <a 
                 href="#" 
                 onClick={handleContactOpen}
                 className="hover:text-[#aa3fdd] transition-colors"
               >
                 Contact Us
               </a>
               <a 
                 href="#" 
                 onClick={handlePartnerOpen}
                 className="hover:text-[#aa3fdd] transition-colors"
               >
                 Partner with us
               </a>
            </div>

            <div className="flex justify-center gap-6 mb-12">
               {[
                 { Icon: Instagram, href: "https://www.instagram.com/dayummeals/" },
                 { Icon: Twitter, href: "https://x.com/dayummeals" },
                 { Icon: Facebook, href: "https://m.facebook.com/61567845624373/" },
                 { Icon: Linkedin, href: "https://www.linkedin.com/in/dayummeals-authentic-homemade-meals-618ba53b8/" }
               ].map((social, idx) => (
                 <motion.a 
                   href={social.href} 
                   key={idx} 
                   target="_blank"
                   rel="noopener noreferrer"
                   whileHover={{ y: -5, scale: 1.1 }} 
                   className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl border flex items-center justify-center transition-all border-gray-100 bg-white shadow-sm hover:shadow-md text-gray-400 hover:text-[#aa3fdd] hover:border-purple-200`}
                 >
                   <social.Icon size={20} strokeWidth={2.5} />
                 </motion.a>
               ))}
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-black">
              <p>© 2026 Drowsy Owls LLP</p>
              <div className="flex items-center gap-2">
                <span>Made in India</span>
                <span className="text-base">🇮🇳</span>
              </div>
            </div>
          </div>
      </footer>

      <ChefRegistrationDialog isOpen={isChefDialogOpen} onClose={() => setIsChefDialogOpen(false)} />
    </div>
  );
}

function SceneSwitcher({ progress, mouseX, mouseY, onChefClick, isMobile }) {
  return (
    <div className="w-full h-full relative">
      <SceneHero progress={progress} mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />
      <SceneKitchen progress={progress} isMobile={isMobile} />
      <SceneTrack progress={progress} isMobile={isMobile} />
      <SceneCTA progress={progress} onChefClick={onChefClick} isMobile={isMobile} />
    </div>
  );
}

function SceneHero({ progress, mouseX, mouseY, isMobile }) {
  const opacity = useTransform(progress, [0, 0.15, 0.25, 0.3], [1, 1, 0, 0]);
  const y = useTransform(progress, [0, 0.25, 0.3], [0, -50, -100]);
  const scale = useTransform(progress, [0, 0.25, 0.3], [1, 0.95, 0.9]);
  const pointerEvents = useTransform(progress, p => p < 0.25 ? "auto" : "none");
  const transformedX = useTransform(mouseX, [-500, 500], [-30, 30]);
  const transformedY = useTransform(mouseY, [-500, 500], [-30, 30]);

  return (
    <motion.div 
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-6 gap-10 md:gap-20 will-change-[transform,opacity] z-10"
    >
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100"
        >
          <span className="w-2 h-2 rounded-full bg-[#aa3fdd] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#aa3fdd]">Freshly Simmering</span>
        </motion.div>
 
        <motion.h1 
          className="text-[12vw] md:text-8xl font-black tracking-tighter leading-[0.8] text-black"
        >
          MOM&apos;S <br />
          <span className="text-[#aa3fdd] italic relative">MAGIC</span> <br />
          <span className="text-[4vw] md:text-4xl font-light tracking-normal text-gray-600/40">IN 90 MINS.</span>
        </motion.h1>
 
        <p className="text-xs md:text-lg text-gray-600 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed md:leading-tight">
          The warmth of a home kitchen, delivered at express speed. No factory prep, just pure love and local ingredients.
        </p>
 
        <div className="flex justify-center lg:justify-start pt-6">
             <a 
               href="https://play.google.com/store/apps/details?id=com.dayummeals.androidapp"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block px-10 py-4 md:px-12 md:py-5 bg-[#aa3fdd] text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all shadow-xl hover:shadow-2xl hover:shadow-[#aa3fdd]/40 border border-white/10 relative z-[60]"
             >
               Order Now
             </a>
        </div>
      </div>
  
      <div className="w-full lg:w-1/2 relative flex items-center justify-center h-[350px] md:h-[500px]">
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-10 inset-y-10 border border-purple-200/50 rounded-full border-dashed"
          />
 
          <motion.div 
            style={{ 
              x: isMobile ? 0 : transformedX,
              y: isMobile ? 0 : transformedY
            }}
            className="relative z-20 w-56 h-56 md:w-80 md:h-80 will-change-transform"
          >
            <div className="absolute inset-0 bg-[#aa3fdd]/5 blur-[40px] md:blur-[60px] rounded-full" />
            <img 
              src="/under90_bowl.png" 
              className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(170,63,221,0.2)] md:drop-shadow-[0_40px_60px_rgba(170,63,221,0.2)]" 
              alt="Gourmet Bowl" 
            />
            
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl text-[#aa3fdd]"
            >
              <Heart size={isMobile ? 16 : 20} fill="currentColor" />
            </motion.div>
          </motion.div>

          {[
            { Icon: Sparkles, label: "Magic", angle: 0 },
            { Icon: Star, label: "Top Rated", angle: 90 },
            { Icon: Timer, label: "Express", angle: 180 },
            { Icon: ChefHat, label: "Authentic", angle: 270 }
          ].map((item, i) => {
            const radius = isMobile ? 140 : 220;
            return (
              <motion.div
                key={i}
                style={{
                  translateX: Math.cos((item.angle * Math.PI) / 180) * radius,
                  translateY: Math.sin((item.angle * Math.PI) / 180) * radius,
                }}
                className="absolute z-30 group cursor-pointer hidden md:flex"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-lg border border-purple-50 flex flex-col items-center gap-1 w-24 md:w-28 transition-all hover:bg-[#aa3fdd] hover:text-white"
                >
                  <item.Icon className="w-8 h-8 md:w-10 md:h-10 text-[#aa3fdd] group-hover:text-white" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">{item.label}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

function SceneKitchen({ progress, isMobile }) {
  const opacity = useTransform(progress, [0.25, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.25, 0.35, 0.5, 0.55], [100, 0, 0, -100]);
  const scale = useTransform(progress, [0.25, 0.35, 0.5, 0.55], [0.9, 1, 1, 0.9]);
  const pointerEvents = useTransform(progress, p => (p >= 0.25 && p < 0.55) ? "auto" : "none");

  const screenshots = [
    { src: "/under90_splashscreen.png", label: "Pure Heart" },
    { src: "/under90_homescreen.png", label: "Mom's Desk" },
    { src: "/homescreen_under90.png", label: "Local Flavor" },
    { src: "/under90_orderscreen (1).png", label: "Express Joy" }
  ];

  return (
    <motion.div 
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 z-0 will-change-[transform,opacity]"
    >
      <div className="w-full lg:w-5/12 space-y-6 md:space-y-10 text-center lg:text-left">
        <div>
          <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
            <div className="h-[1px] w-8 bg-purple-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-600">Purely HomeMade</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-none mb-4 md:mb-6 uppercase italic">
            MADE BY <br />
            <span className="text-[#aa3fdd]">MOM&apos;S HAND.</span>
          </h2>
          <p className="text-sm md:text-xl text-gray-600 font-light leading-snug">
            Authentic meals crafted by neighborhood moms, arriving at your doorstep in <span className="text-[#aa3fdd] font-bold italic">under 90 minutes.</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 items-center lg:items-start">
           <div className="flex items-center gap-3 md:gap-4 bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm border border-purple-50 w-full md:w-fit">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                 <Timer size={isMobile ? 20 : 24} />
              </div>
              <div className="text-left">
                 <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">The Promise</p>
                 <p className="text-xs md:text-sm font-bold">Express: Under 90 Min</p>
              </div>
           </div>
        </div>
      </div>

      <div className="w-full lg:w-7/12 relative h-[350px] md:h-[650px] flex items-center justify-center mt-8 lg:mt-0">
         <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
            {screenshots.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 100, rotate: 10 }}
                animate={{ 
                  opacity: 1, 
                  x: (i - 1.5) * (isMobile ? 35 : 60),
                  y: Math.sin(i * 1.5) * (isMobile ? 15 : 30),
                  rotate: (i - 1.5) * (isMobile ? 5 : 8),
                  zIndex: 10 + i,
                  scale: (isMobile ? 0.8 : 0.9) + (i * 0.05)
                }}
                whileHover={{ scale: 1.1, rotate: 0, y: -30, zIndex: 50 }}
                className="absolute w-[120px] md:w-[240px] aspect-[9/19] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-4 md:border-8 border-white bg-white shadow-2xl transition-shadow hover:shadow-purple-200/50 group"
              >
                <img src={item.src} className="w-full h-full object-cover" alt={item.label} />
              </motion.div>
            ))}
         </div>
      </div>
    </motion.div>
  );
}

function SceneTrack({ progress, isMobile }) {
  const opacity = useTransform(progress, [0.5, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.5, 0.6, 0.75, 0.8], [50, 0, 0, -50]);
  const pointerEvents = useTransform(progress, p => (p >= 0.5 && p < 0.8) ? "auto" : "none");

  return (
    <motion.div 
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-20 max-w-6xl mx-auto w-full px-6 z-0 will-change-[transform,opacity]"
    >
       <div className="relative w-full max-w-[240px] md:max-w-[320px] aspect-[9/19] group">
          <div className="absolute -inset-8 bg-purple-400/20 blur-[60px] md:blur-[80px] rounded-full z-0" />
          <div className="relative z-10 w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-white">
             <img src="/under90_orderscreen (1).png" className="w-full h-full object-cover" alt="Tracking Screen" />
          </div>

          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="absolute top-1/4 -left-12 md:-left-24 bg-white/95 backdrop-blur-md p-3 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-purple-50 z-20 w-40 md:w-56 flex items-center gap-3 md:gap-4 hidden sm:flex"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#aa3fdd] text-white flex items-center justify-center font-black text-xs">!</div>
            <div>
               <p className="text-[6px] md:text-[8px] font-black uppercase text-[#aa3fdd] tracking-widest">Live Now</p>
               <p className="text-[10px] md:text-xs font-bold">Mom is packing...</p>
            </div>
          </motion.div>
       </div>

       <div className="text-center lg:text-left space-y-6 md:space-y-8">
          <h3 className="text-3xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.8] mb-4 md:mb-8">
            SPEED WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-[#aa3fdd]">SOUL.</span>
          </h3>
          <p className="text-sm md:text-lg text-gray-600 font-light max-w-xl leading-relaxed">
            Witness the journey from a warm pan to your plate. Our riders pick up directly from home kitchens—no detours, no cold storage.
          </p>
       </div>
    </motion.div>
  );
}

function SceneCTA({ progress, onChefClick, isMobile }) {
  const opacity = useTransform(progress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 1]);
  const y = useTransform(progress, [0.75, 0.85, 1], [100, 0, 0]);
  const pointerEvents = useTransform(progress, p => p >= 0.75 ? "auto" : "none");

  return (
    <motion.div 
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 md:space-y-12 px-6 z-0 will-change-[transform,opacity]"
    >
        <div className="space-y-4 md:space-y-6">
          <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-purple-600">The Final Step</h4>
          <h2 className="text-5xl md:text-[8vw] font-black tracking-tighter leading-none italic uppercase">
            Order <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Express.</span>
          </h2>
          <p className="text-xs md:text-xl text-gray-600 font-light max-w-lg mx-auto">
            Your neighborhood is cooking. Join the table now.
          </p>
        </div>
 
        <div className="flex justify-center pt-8 md:pt-12 w-full max-w-xs md:max-w-none mx-auto">
          <button 
            onClick={onChefClick}
            className="w-full md:w-auto px-10 py-5 md:px-12 md:py-6 bg-white text-black border border-black/5 rounded-[1.5rem] md:rounded-3xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#aa3fdd] hover:text-white transition-all shadow-sm hover:shadow-2xl hover:shadow-[#aa3fdd]/40 relative z-50"
          >
            Become a Chef
          </button>
        </div>
    </motion.div>
  );
}
