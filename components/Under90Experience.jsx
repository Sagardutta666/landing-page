'use client';

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect, memo } from "react";
import BrandLogo from "./BrandLogo";
import { ChefHat, Timer, Heart, Sparkles, Star, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

// Simple Reveal Wrapper matching the "PRE" experience
function SectionWrapper({ children, className = "" }) {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  const yRaw = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const y = useSpring(yRaw, { stiffness: 40, damping: 18 });
  const opacity = useSpring(opacityRaw, { stiffness: 40, damping: 18 });

  return (
    <motion.section 
      style={{ y, opacity }}
      className={`relative min-h-[75vh] flex items-center justify-center py-20 px-4 md:py-32 my-10 md:my-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function Under90Experience() {
  const [isMobile, setIsMobile] = useState(false);
  const { openPolicy, openPartner, openContact, openChef, openOrderNow } = useTheme();

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 25);
      mouseY.set((clientY - innerHeight / 2) / 25);
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

  return (
    <div className="relative bg-[#F2F0EA] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="min-h-screen relative z-0 bg-[#F2F0EA]">
        <SceneHero isMobile={isMobile} mouseX={mouseX} mouseY={mouseY} openOrderNow={openOrderNow} />
      </section>

      {/* 2. KITCHEN SECTION */}
      <div className="relative z-10 bg-[#F2F0EA]">
        <SectionWrapper className="shadow-[-20px_0_50px_rgba(0,0,0,0.02)]">
          <SceneKitchen isMobile={isMobile} />
        </SectionWrapper>

        {/* 3. TRACKING SECTION */}
        <SectionWrapper>
          <SceneTrack isMobile={isMobile} />
        </SectionWrapper>

        {/* 4. CTA SECTION */}
        <SectionWrapper className="min-h-[60vh]">
          <SceneCTA onChefClick={openChef} isMobile={isMobile} />
        </SectionWrapper>

        {/* 5. FOOTER */}
        <footer className="w-full bg-white py-20 border-t border-purple-100 relative z-[100]">
            <div className="container mx-auto px-6 text-center">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-gray-400 italic">
                 <a href="#" onClick={(e) => handlePolicyOpen(e, "TERMS")} className="hover:text-[#aa3fdd] transition-colors">Terms & Conditions</a>
                 <a href="#" onClick={(e) => handlePolicyOpen(e, "PRIVACY")} className="hover:text-[#aa3fdd] transition-colors">Privacy Policy</a>
                 <a href="#" onClick={(e) => handlePolicyOpen(e, "ABOUT")} className="hover:text-[#aa3fdd] transition-colors">About Us</a>
                 <a href="#" onClick={(e) => { e.preventDefault(); openContact(); }} className="hover:text-[#aa3fdd] transition-colors">Contact Us</a>
                 <a href="#" onClick={(e) => { e.preventDefault(); openPartner(); }} className="hover:text-[#aa3fdd] transition-colors">Partner with us</a>
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
                     className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border flex items-center justify-center transition-all border-gray-100 bg-white shadow-sm hover:shadow-md text-gray-400 hover:text-[#aa3fdd] hover:border-purple-200"
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
      </div>

    </div>
  );
}

const SceneHero = memo(({ isMobile, mouseX, mouseY, openOrderNow }) => {
  const rotateX = useTransform(mouseY, (v) => -v * 0.3);
  const rotateY = useTransform(mouseX, (v) => v * 0.3);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-10 py-16 md:py-0 overflow-x-hidden">
      <div className={`max-w-6xl w-full grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-5 h-auto md:h-[80vh] ${isMobile ? '' : 'perspective-[2000px]'}`}>
        
        {/* 1. Main Title Card - Prominent (Left) */}
        <motion.div 
          initial={{ opacity: 0, y: isMobile ? 40 : 100, rotateX: isMobile ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ 
            type: "spring", 
            stiffness: 40, 
            damping: 18,
            delay: 0.4
          }}
          className="col-span-2 md:col-span-6 md:row-span-2 bg-[#FDFCF8] rounded-[2.5rem] p-6 md:p-12 flex flex-col justify-center gap-4 relative overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.06)] border border-white/60 group px-8 md:px-12 will-change-transform"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50/80 backdrop-blur-md border border-purple-100 w-fit relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#aa3fdd] animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#aa3fdd]">Freshly Simmering</span>
          </div>

          <h1 className="text-[12vw] md:text-[5.5rem] font-black tracking-tighter leading-[0.85] text-black relative z-10 flex flex-col items-start">
            <div className="overflow-hidden">
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="block"
              >
                MOM&apos;S
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="text-[#aa3fdd] italic selection:bg-purple-200 block"
              >
                MAGIC
              </motion.span>
            </div>
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[4vw] md:text-[1.8rem] font-light tracking-normal text-gray-400 uppercase mt-2 md:mt-4 block"
            >
              IN 90 MINS.
            </motion.span>
          </h1>

          <p className="text-xs md:text-lg text-gray-400 font-light max-w-sm leading-relaxed relative z-10">
            Authentic home kitchens, delivered at express speed. No factory prep, just pure love.
          </p>

          <div className="pt-2 md:pt-4 relative z-10">
              <button 
                onClick={openOrderNow}
                className="inline-block px-10 py-5 md:px-12 md:py-5.5 bg-[#aa3fdd] text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all shadow-2xl shadow-purple-200 active:scale-95"
              >
                Order Now
              </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: isMobile ? 40 : 100, rotateX: isMobile ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ 
            type: "spring", 
            stiffness: 40, 
            damping: 18,
            delay: 0.5
          }}
          style={{ 
            rotateX: rotateX, 
            rotateY: rotateY
          }}
          className="col-span-2 md:col-span-6 md:row-span-1 bg-[#F2F0EA] rounded-[2.5rem] relative overflow-hidden flex items-center justify-center group border border-purple-100/30 shadow-md aspect-video md:aspect-auto h-auto md:h-full lg:max-h-[38vh] will-change-transform"
        >
           <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent z-10" />
           <img 
             src="/moms_love.png" 
             className="w-full h-full object-contain bg-white transition-transform duration-1000 ease-out grayscale-[0.05] group-hover:grayscale-0" 
             alt="Moms Love" 
           />
           <div className="absolute bottom-4 left-4 z-20 text-black flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Heart of the house</span>
              <p className="text-base font-bold">Packed with affection.</p>
           </div>
           
           <motion.div 
             animate={{ scale: [1, 1.1, 1] }} 
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-[#aa3fdd] z-20"
           >
             <Heart size={20} fill="currentColor" />
           </motion.div>
        </motion.div>

        {/* 3. Small Mini card - Status */}
        <motion.div 
          initial={{ opacity: 0, y: isMobile ? 30 : 80, rotateX: isMobile ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ 
            type: "spring", 
            stiffness: 40, 
            damping: 18,
            delay: 0.6
          }}
          className="col-span-1 md:col-span-3 bg-[#FDFCF8] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 flex flex-col justify-between border border-white/60 shadow-sm relative overflow-hidden aspect-square md:aspect-auto h-[160px] md:h-full will-change-transform"
        >
          <div className="absolute top-0 left-0 w-20 h-20 bg-green-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-500 relative z-10 shadow-inner">
             <ChefHat size={18} />
          </div>
          <div className="relative z-10">
             <p className="text-[8px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1 md:mb-1.5">Live Status</p>
             <p className="text-sm md:text-xl font-bold leading-tight">Cooking <br/>Now</p>
          </div>
        </motion.div>

        {/* 4. Small Mini card - Speed */}
        <motion.div 
          initial={{ opacity: 0, y: isMobile ? 30 : 80, rotateX: isMobile ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ 
            type: "spring", 
            stiffness: 40, 
            damping: 18,
            delay: 0.7
          }}
          className="col-span-1 md:col-span-3 bg-[#aa3fdd] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 flex flex-col justify-between text-white shadow-lg md:shadow-2xl shadow-purple-200/50 relative overflow-hidden aspect-square md:aspect-auto h-[160px] md:h-full will-change-transform"
        >
          <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-white/20 flex items-center justify-center text-white relative z-10 backdrop-blur-sm">
             <Timer size={18} />
          </div>
          <div className="relative z-10">
             <p className="text-[8px] md:text-[10px] font-black uppercase text-white/50 tracking-widest mb-1 md:mb-1.5">Speed</p>
             <p className="text-sm md:text-xl font-bold leading-tight italic">90 Min <br/>Guarantee</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
});

const KITCHEN_SCREENSHOTS = [
  { src: "/under90_orderscreen (1).png", label: "Order Joy" },
  { src: "/under90_homescreen.png", label: "Mom's Desk" },
  { src: "/under90_splashscreen.png", label: "Pure Entry" },
  { src: "/homescreen_under90.png", label: "Local Flavor" },
];

const SceneKitchen = memo(({ isMobile }) => {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-16">
      <div className="w-full lg:w-5/12 space-y-6 text-center lg:text-left">
        <div>
          <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
            <div className="h-[1px] w-8 bg-purple-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-600">Purely HomeMade</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-none mb-4 uppercase italic">
            MADE BY <br />
            <span className="text-[#aa3fdd]">MOM&apos;S HAND.</span>
          </h2>
          <p className="text-sm md:text-xl text-gray-600 font-light leading-snug">
            Authentic meals crafted by neighborhood moms, arriving at your doorstep in <span className="text-[#aa3fdd] font-bold italic">under 90 minutes.</span>
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-purple-50 w-fit mx-auto lg:mx-0">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
             <Timer size={24} />
          </div>
          <div className="text-left">
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">The Promise</p>
             <p className="text-sm font-bold">Express: Under 90 Min</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-7/12 relative h-[350px] md:h-[700px] flex items-center justify-center mt-4 md:mt-0">
         <div className="relative w-full h-full flex items-center justify-center perspective-[3000px]">
            {KITCHEN_SCREENSHOTS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 0, y: 100, rotateX: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  x: (i - 1.5) * (isMobile ? 40 : 130),
                  y: Math.abs(i - 1.5) * (isMobile ? 15 : 40),
                  rotateY: (i - 1.5) * (isMobile ? -8 : -15),
                  z: Math.abs(i - 1.5) * -150,
                  rotateX: 0
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20, 
                  delay: i * 0.1 
                }}
                whileHover={{ 
                  y: -20,
                  scale: 1.1,
                  rotateY: 0,
                  z: 100
                }}
                viewport={{ once: false, margin: "-100px" }}
                className="absolute w-[160px] md:w-[280px] aspect-[9/19] rounded-[2.5rem] md:rounded-[3.2rem] overflow-hidden preserve-3d"
              >
                <img 
                  src={item.src} 
                  className="w-full h-full object-cover" 
                  alt={item.label} 
                />
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
});

const SceneTrack = memo(({ isMobile }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-20 max-w-6xl mx-auto w-full px-6">
       <div className="relative w-full max-w-[240px] md:max-w-[300px] aspect-[9/19]">
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
             <img src="/under90_orderscreen (1).png" className="w-full h-full object-cover" alt="Tracking Screen" />
             
             {/* Masking the address for privacy/design */}
             <div className="absolute top-[32%] bottom-0 left-0 right-0 bg-white z-10 p-5 flex flex-col items-center">
                <div className="w-full max-w-[210px] bg-purple-50 rounded-[2rem] p-5 flex flex-col items-center gap-3 border border-purple-100 shadow-sm">
                   <div className="flex items-center gap-2 text-purple-600">
                      <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Live Status</span>
                   </div>
                   <p className="text-sm font-bold text-gray-800">MOM IS PACKING...</p>
                   <div className="w-full h-1.5 bg-gray-200/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "10%" }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 15, repeat: Infinity }}
                        className="h-full bg-gradient-to-r from-purple-500 to-[#aa3fdd]"
                      />
                   </div>
                   <p className="text-[9px] text-gray-500 italic">Simmering with love since 15 mins</p>
                </div>
                
                <div className="mt-8 space-y-4 w-full px-6">
                   {[1, 2].map(i => (
                     <div key={i} className="h-4 bg-gray-50 rounded-full w-full flex items-center px-4">
                        <div className="h-1.5 w-1/2 bg-gray-100/50 rounded-full" />
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="absolute top-1/2 -left-12 lg:-left-24 bg-white/95 backdrop-blur-md p-4 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-purple-50 z-20 w-48 md:w-56 flex items-center gap-3 md:gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-[#aa3fdd] text-white flex items-center justify-center shadow-lg shadow-purple-200">
               <Timer size={20} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase text-[#aa3fdd] tracking-widest">Live Now</p>
               <p className="text-xs font-bold text-gray-800">Mom is packing...</p>
            </div>
          </motion.div>
       </div>

       <div className="text-center lg:text-left space-y-6">
          <h3 className="text-3xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">
            SPEED WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-[#aa3fdd]">SOUL.</span>
          </h3>
          <p className="text-sm md:text-lg text-gray-600 font-light max-w-xl leading-relaxed">
            Witness the journey from a warm pan to your plate. Our riders pick up directly from home kitchens—no detours.
          </p>
       </div>
    </div>
  );
});

const SceneCTA = memo(({ onChefClick }) => {
  return (
    <div className="text-center space-y-8 px-6">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-600">The Final Step</h4>
          <h2 className="text-5xl md:text-[8vw] font-black tracking-tighter leading-none italic uppercase">
            Order <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Express.</span>
          </h2>
          <p className="text-sm md:text-xl text-gray-600 font-light max-w-lg mx-auto">
            Your neighborhood is cooking. Join the table now.
          </p>
        </div>
 
        <button 
          onClick={onChefClick}
          className="px-10 py-5 md:px-12 md:py-6 bg-white text-black border border-black/5 rounded-[1.5rem] md:rounded-3xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#aa3fdd] hover:text-white transition-all shadow-sm hover:shadow-2xl hover:shadow-[#aa3fdd]/40"
        >
          Become a Chef
        </button>
    </div>
  );
});
