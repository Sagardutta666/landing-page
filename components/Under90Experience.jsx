'use client';

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import BrandLogo from "./BrandLogo";
import Under90Hero from "./Under90Hero"; // We might refactor this too
import { ChefHat, Timer, MapPin, Star, ArrowRight } from "lucide-react";

const KITCHEN_STORIES = [
  { id: 1, title: "The Sunday Roast", chef: "Chef Meera", image: "/under90_splashscreen.png", accent: "#8b5cf6", details: "Traditional spices passed down through three generations." },
  { id: 2, title: "Express Comfort", chef: "Chef Rahul", image: "/under90_homescreen.png", accent: "#f59e0b", details: "The perfect bowl of warmth for your busy afternoon." },
  { id: 3, title: "Modern Heritage", chef: "Chef Ananya", image: "/homescreen_under90.png", accent: "#10b981", details: "Traditional recipes meets modern nutritional science." }
];

import { Instagram, Twitter, Linkedin } from "lucide-react";

export default function Under90Experience() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Deep branching design: Not sections, but a "Fluid Flow"
  return (
    <div className="relative bg-[#F2F0EA]">
      {/* 1. SCROLL-DRIVEN EXPERIENCE PARENT */}
      <div ref={containerRef} className="relative h-[800vh]">
        {/* STICKY DYNAMIC CANVAS */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center pt-[2vh] md:pt-[4vh]">
          
          {/* Organic Background Elements (Warm Kitchen Hues) - Adjusted for Mobile Depth */}
          <motion.div 
            style={{ x: mouseX, y: mouseY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] md:w-[80vw] h-[140vw] md:h-[80vw] bg-orange-100/40 rounded-full blur-[80px] md:blur-[150px] pointer-events-none -z-10"
          />
          <motion.div 
            style={{ x: useTransform(mouseX, v => -v * 0.5), y: useTransform(mouseY, v => -v * 0.5) }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[60vw] h-[120vw] md:h-[60vw] bg-purple-200/20 rounded-full blur-[60px] md:blur-[120px] pointer-events-none -z-10"
          />

          {/* MESH TEXTURE OVERLAY */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe-light.png')]" />

          {/* THE "STORY ENGINE" */}
          <div className="relative h-full w-full flex items-center justify-center px-4 md:px-6">
            <SceneSwitcher progress={smoothProgress} />
          </div>

          {/* SIDE SCENE INDICATOR (Modern - Scaled for reach) */}
          <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-6 z-50">
             {['BORN', 'MADE', 'FAST', 'JOIN'].map((label, i) => {
               const isActive = (smoothProgress.get() * 4) >= i && (smoothProgress.get() * 4) < i + 1;
               return (
                 <div key={label} className="flex items-center justify-end gap-3 md:gap-4 group cursor-pointer">
                    <motion.span 
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : 20
                      }}
                      className="text-[8px] md:text-[10px] font-black tracking-widest text-black hidden md:block"
                    >
                      {label}
                    </motion.span>
                    <motion.div 
                      animate={{ 
                        width: isActive ? 24 : 6,
                        backgroundColor: isActive ? "#f97316" : "#e5e7eb"
                      }}
                      className="h-1 rounded-full"
                    />
                 </div>
               )
             })}
          </div>
        </div>
      </div>

      {/* 2. FOOTER SECTION (Outside Sticky Parent, in natural flow) */}
      <footer className="relative z-[100] py-16 md:py-24 bg-[#F2F0EA] border-t border-black/5 text-black">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 mb-16 md:mb-24">
              <div className="space-y-6 md:space-y-10 max-w-sm text-center md:text-left mx-auto md:mx-0 w-full">
                <BrandLogo className="text-3xl md:text-4xl text-black mx-auto md:mx-0" />
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mx-auto">
                  Crafting authentic home-kitchen experiences, delivered fresh to your neighborhood.
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  {[
                    { Icon: Instagram, href: "#" },
                    { Icon: Twitter, href: "#" },
                    { Icon: Linkedin, href: "#" }
                  ].map((social, idx) => (
                    <motion.a 
                      href={social.href} 
                      key={idx} 
                      whileHover={{ y: -5, scale: 1.1 }} 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border flex items-center justify-center transition-all border-black/10 hover:bg-black hover:text-white"
                    >
                      <social.Icon size={18} strokeWidth={2.5} />
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 md:gap-32 w-full md:w-auto text-center md:text-left">
                <div className="space-y-6 md:space-y-8">
                  <h4 className="font-black uppercase tracking-widest text-[10px] opacity-40">Explore</h4>
                  <ul className="space-y-3 md:space-y-4 font-bold text-sm md:text-lg">
                    <li><a href="#" className="hover:text-orange-600 transition-colors">Our Story</a></li>
                    <li><a href="#" className="hover:text-orange-600 transition-colors">Kitchens</a></li>
                  </ul>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <h4 className="font-black uppercase tracking-widest text-[10px] opacity-40">Privacy</h4>
                  <ul className="space-y-3 md:space-y-4 font-bold text-sm md:text-lg">
                    <li><a href="#" className="hover:text-orange-600 transition-colors">Policies</a></li>
                    <li><a href="#" className="hover:text-orange-600 transition-colors">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t border-black/5 mb-8 md:mb-12" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 text-center">
              <p>© 2026 daYummeals Group</p>
              <div className="flex items-center gap-2">
                <span>Made in India</span>
                <span className="text-base">🇮🇳</span>
              </div>
            </div>
          </div>
      </footer>
    </div>
  );
}
function SceneSwitcher({ progress }) {
  return (
    <div className="w-full h-full relative">
      <SceneHero progress={progress} />
      <SceneKitchen progress={progress} />
      <SceneTrack progress={progress} />
      <SceneCTA progress={progress} />
    </div>
  );
}

function SceneHero({ progress }) {
  const opacity = useTransform(progress, [0, 0.15, 0.22, 0.25], [1, 1, 0, 0]);
  const y = useTransform(progress, [0, 0.22, 0.25], [0, -100, -200]);
  const scale = useTransform(progress, [0, 0.22, 0.25], [1, 0.9, 0.8]);

  return (
    <motion.div 
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-6 gap-10 md:gap-20"
    >
      {/* Left: Clean Typography */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-orange-50 border border-orange-100"
        >
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Freshly Simmering</span>
        </motion.div>
 
        <h1 className="text-[12vw] md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] md:leading-[0.8] text-black">
          MOM&apos;S <br />
          <span className="text-orange-500 italic">MAGIC</span> <br />
          <span className="text-[4.5vw] md:text-4xl font-light tracking-normal text-gray-300">IN 90 MINS.</span>
        </h1>
 
        <p className="text-[10px] md:text-lg text-gray-400 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
          The warmth of a home kitchen, delivered at express speed. No factory prep, just pure love and local ingredients.
        </p>
      </div>
 
      {/* Right: "Living Kitchen" Image Animation */}
      <div className="w-full lg:w-1/2 relative mt-8 md:mt-12 lg:mt-0">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative aspect-square w-full max-w-[240px] md:max-w-xl mx-auto"
        >
          {/* Animated Cooking Elements */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 100, x: i * 50 }}
                  animate={{ 
                    opacity: [0, 0.5, 0], 
                    y: -200, 
                    x: i * 50 + Math.sin(i) * 20 
                  }}
                  transition={{ 
                    duration: 3 + i, 
                    repeat: Infinity, 
                    delay: i * 0.5,
                    ease: "linear"
                  }}
                  className="absolute bottom-20 left-1/4 w-8 h-20 bg-gradient-to-t from-orange-200/20 to-transparent blur-2xl"
                />
             ))}
          </div>
 
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-purple-50 rounded-[3rem] md:rounded-[4rem] -rotate-6 scale-95" />
          <div className="relative z-10 w-full h-full rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-4 md:border-8 border-white bg-white group">
            <img 
              src="/under90_bowl.png" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" 
              alt="Mom's Cooking" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent pointer-events-none" />
          </div>
 
          {/* Floating Ingredients */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-2 w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center p-2 z-20"
          >
             <span className="text-2xl md:text-4xl">🌿</span>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-4 -left-6 w-14 h-14 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center p-2 z-20"
          >
             <span className="text-2xl md:text-4xl">🧂</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SceneKitchen({ progress }) {
  const opacity = useTransform(progress, [0.18, 0.25, 0.45, 0.52], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.18, 0.25, 0.45, 0.52], [100, 0, 0, -100]);
  const scale = useTransform(progress, [0.18, 0.25, 0.45, 0.52], [0.9, 1, 1, 0.9]);

  const screenshots = [
    { src: "/under90_splashscreen.png", label: "Pure Heart" },
    { src: "/under90_homescreen.png", label: "Mom's Desk" },
    { src: "/homescreen_under90.png", label: "Local Flavor" },
    { src: "/under90_orderscreen (1).png", label: "Express Joy" }
  ];

  return (
    <motion.div 
      style={{ opacity, y, scale }}
      className="absolute inset-0 max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16"
    >
      {/* Left Content: The "Under 90" / "Mom's Touch" Message */}
      <div className="w-full lg:w-5/12 space-y-8 md:space-y-10 text-center lg:text-left">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4 justify-center lg:justify-start"
          >
            <div className="h-[1px] w-6 md:w-8 bg-orange-400" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-orange-600">Purely HomeMade</span>
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-none mb-4 md:mb-6">
            MADE BY <br />
            <span className="italic">MOM&apos;S HAND.</span>
          </h2>
          <p className="text-base md:text-xl text-gray-500 font-light leading-snug px-4 md:px-0">
            Authentic meals crafted by neighborhood moms, arriving at your doorstep in <span className="text-orange-600 font-bold underline decoration-2 underline-offset-4 font-serif italic">under 90 minutes.</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 items-center lg:items-start px-4 md:px-0">
           <div className="flex items-center gap-3 md:gap-4 bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm border border-orange-50 w-full md:w-fit">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                 <Timer size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="text-left">
                 <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">The Promise</p>
                 <p className="text-xs md:text-sm font-bold">Express: Under 90 Min</p>
              </div>
           </div>
           
           <div className="flex items-center gap-3 md:gap-4 bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm border border-purple-50 w-full md:w-fit">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                 <ChefHat size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="text-left">
                 <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">The Source</p>
                 <p className="text-xs md:text-sm font-bold">Local Home Kitchens</p>
              </div>
           </div>
        </div>
      </div>

      {/* Right Content: FANCY 4-CARD DECK */}
      <div className="w-full lg:w-7/12 relative h-[350px] md:h-[650px] flex items-center justify-center mt-12 lg:mt-0">
         <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
            {screenshots.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 100, rotate: 10 }}
                animate={{ 
                  opacity: 1, 
                  x: (i - 1.5) * (window.innerWidth < 768 ? 25 : 60), // Scaled horizontal stagger
                  y: Math.sin(i * 1.5) * (window.innerWidth < 768 ? 10 : 30), // Scaled S-curve
                  rotate: (i - 1.5) * (window.innerWidth < 768 ? 4 : 8), // Scaled Fan-out
                  zIndex: 10 + i,
                  scale: (window.innerWidth < 768 ? 0.8 : 0.9) + (i * 0.05)
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 0, 
                  y: -30,
                  zIndex: 50,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
                className="absolute w-[100px] md:w-[240px] aspect-[9/19] rounded-[1.2rem] md:rounded-[2rem] overflow-hidden border-2 md:border-8 border-white bg-white shadow-xl md:shadow-2xl transition-shadow hover:shadow-orange-200/50 group"
              >
                <img src={item.src} className="w-full h-full object-cover" alt={item.label} />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                   <p className="text-[10px] font-black text-white uppercase tracking-widest">{item.label}</p>
                </div>
              </motion.div>
            ))}
         </div>
         
         {/* Floating Badge */}
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="absolute -top-10 right-0 w-24 h-24 border border-dashed border-orange-200 rounded-full flex items-center justify-center p-2 hidden md:flex"
         >
            <div className="w-full h-full bg-orange-600 rounded-full flex items-center justify-center text-white text-[8px] font-black text-center uppercase tracking-tighter leading-none">
              90 MIN<br/>FAST
            </div>
         </motion.div>
      </div>
    </motion.div>
  );
}

function SceneTrack({ progress }) {
  const opacity = useTransform(progress, [0.45, 0.52, 0.73, 0.8], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.45, 0.52, 0.73, 0.8], [100, 0, 0, -100]);
  const scale = useTransform(progress, [0.45, 0.52, 0.73, 0.8], [0.9, 1, 1, 0.9]);

  return (
    <motion.div 
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-20 max-w-6xl mx-auto w-full px-6"
    >
       {/* SLEEK FRAMELESS APP UI */}
       <div className="relative w-full max-w-[220px] md:max-w-[320px] aspect-[9/19] group">
          {/* Ambient Glow */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -inset-10 bg-orange-400/20 blur-[60px] rounded-full z-0"
          />
          
          <motion.div 
            className="relative z-10 w-full h-full rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-8 border-white bg-white"
            whileHover={{ y: -10 }}
          >
             <img src="/under90_orderscreen (1).png" className="w-full h-full object-cover" alt="Tracking Screen" />
             
             {/* Interactive Shine */}
             <motion.div 
               animate={{ x: ["-100%", "200%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
             />
          </motion.div>

          {/* Modern Floating Badges (Replacing Status List) */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-1/4 -left-24 bg-white/95 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl border border-orange-50 z-20 w-56 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-black">!</div>
            <div>
               <p className="text-[8px] font-black uppercase text-orange-600 tracking-widest">Live Now</p>
               <p className="text-xs font-bold">Mom is packing...</p>
            </div>
          </motion.div>
       </div>

       <div className="text-center lg:text-left space-y-8">
          <h3 className="text-3xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] md:leading-[0.8] mb-6 md:mb-8">
            SPEED WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-purple-600">SOUL.</span>
          </h3>
          <p className="text-sm md:text-lg text-gray-500 max-w-xl font-light leading-relaxed">
            Witness the journey from a warm pan to your plate. Our riders pick up directly from home kitchens—no detours, no cold storage.
          </p>
          <div className="flex justify-center lg:justify-start">
             <div className="px-6 py-3 bg-black text-white rounded-full text-[10px] font-black tracking-widest uppercase">
                90 Min Express
             </div>
          </div>
       </div>
    </motion.div>
  );
}

function SceneCTA({ progress }) {
  const opacity = useTransform(progress, [0.73, 0.8, 0.95, 1], [0, 1, 1, 0.8]);
  const y = useTransform(progress, [0.73, 0.8, 1], [100, 0, 0]);
  const scale = useTransform(progress, [0.73, 0.8, 1], [0.8, 1, 1]);

  return (
    <motion.div 
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 md:space-y-12 px-6"
    >
       <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         className="w-24 h-24 md:w-40 md:h-40 border-2 border-dashed border-purple-200 rounded-full mx-auto flex items-center justify-center"
       >
         <ArrowRight className="text-purple-600 w-8 h-8 md:w-12 md:h-12" />
       </motion.div>
 
        <div className="space-y-3 md:space-y-6">
          <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-purple-600">The Final Step</h4>
          <h2 className="text-3xl md:text-[7vw] font-black tracking-tighter leading-none italic uppercase">
            Order <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Express.</span>
          </h2>
          <p className="text-xs md:text-xl text-gray-400 font-light max-w-lg mx-auto">
            Your neighborhood is cooking. Join the table now.
          </p>
        </div>
 
       <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 pt-6 md:pt-12 w-full max-w-xs md:max-w-none mx-auto">
          <button className="w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-black text-white rounded-2xl md:rounded-3xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-purple-600 transition-all shadow-xl">
            Explore Dishes
          </button>
          <button className="w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-white text-black border border-black/5 rounded-2xl md:rounded-3xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-gray-50 transition-all shadow-sm">
            Become a Chef
          </button>
       </div>
    </motion.div>
  );
}
