'use client';

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect, memo } from "react";
import BrandLogo from "./BrandLogo";
import { ChefHat, Timer, Heart, Sparkles, Star, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

// Simple Reveal Wrapper matching the "PRE" experience
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.dayummeals.androidapp";

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
          <SceneCTA isMobile={isMobile} />
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
                 <a href="#" onClick={(e) => { e.preventDefault(); openChef(); }} className="hover:text-[#aa3fdd] transition-colors">Become a Chef</a>
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
          initial={{ opacity: 0, y: isMobile ? 20 : 100, rotateX: isMobile ? 0 : 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 40, 
            damping: 18,
            delay: isMobile ? 0.1 : 0.4
          }}
          className="col-span-2 md:col-span-6 md:row-span-2 bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-white/60 group px-8 md:px-14 will-change-transform transform-gpu isolate h-full"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col items-start gap-4 mb-4 md:mb-6 relative z-10 w-fit pt-6 md:pt-8">
            <div className="flex flex-col items-start gap-1">
              <BrandLogo showIcon={false} showUnderline={false} className="scale-[0.65] md:scale-[0.8] origin-left" />
              <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">Authenticity Starts Here!</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-purple-50/80 backdrop-blur-md border border-purple-100 w-fit relative z-10">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#aa3fdd] animate-pulse" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#aa3fdd]">Freshly Simmering</span>
          </div>

          <h1 className="text-[8vw] md:text-[4.2rem] font-black tracking-tighter leading-[0.9] text-black relative z-10 flex flex-col items-start">
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
              className="text-[3vw] md:text-[1.2rem] font-light tracking-normal text-gray-400 uppercase mt-1 md:mt-2 mb-6 md:mb-10 block"
            >
              IN UNDER 90 MINS.
            </motion.span>
          </h1>

          <p className="text-[10px] md:text-sm lg:text-base text-gray-400 font-light max-w-[280px] md:max-w-sm leading-relaxed relative z-10">
           Authentic home kitchens, delivering at express speed. No Factory prep, just pure love, taste and health.
          </p>

          <div className="pt-4 md:pt-6 pb-4 md:pb-6 relative z-10">
              <a 
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 md:px-12 md:py-4.5 bg-[#aa3fdd] text-white rounded-full font-black uppercase tracking-widest text-[9px] md:text-xs hover:scale-105 transition-all shadow-2xl shadow-purple-200 active:scale-95"
              >
                Order Now
              </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: isMobile ? 20 : 100, rotateX: isMobile ? 0 : 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 40, 
            damping: 18,
            delay: isMobile ? 0.15 : 0.5
          }}
          style={{ 
            rotateX: rotateX, 
            rotateY: rotateY
          }}
          className="col-span-2 md:col-span-6 md:row-span-1 bg-white rounded-[3.5rem] relative overflow-hidden flex items-center justify-center group border border-purple-100/30 shadow-xl shadow-black/5 aspect-video md:aspect-auto h-auto md:h-full lg:max-h-[48vh] will-change-transform isolate transform-gpu"
        >
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90" />
           <img 
             src="/moms_love_new.png" 
             className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 transform-gpu" 
             alt="Moms Love" 
           />
           <div className="absolute bottom-6 left-6 z-20 text-white flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Heart of the house</span>
              <p className="text-xl font-bold tracking-tight">Packed with affection.</p>
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
          initial={{ opacity: 0, y: isMobile ? 20 : 80, rotateX: isMobile ? 0 : 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 40, 
            damping: 18,
            delay: isMobile ? 0.2 : 0.6
          }}
          className="col-span-1 md:col-span-3 bg-white rounded-[2.5rem] p-4 md:p-6 flex flex-col justify-between border border-white/60 shadow-xl shadow-black/[0.03] relative overflow-hidden aspect-square md:aspect-auto h-[160px] md:h-full will-change-transform transform-gpu isolate"
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
          initial={{ opacity: 0, y: isMobile ? 20 : 80, rotateX: isMobile ? 0 : 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 40, 
            damping: 18,
            delay: isMobile ? 0.25 : 0.7
          }}
          className="col-span-1 md:col-span-3 bg-[#aa3fdd] rounded-[2.5rem] p-4 md:p-6 flex flex-col justify-between text-white shadow-lg md:shadow-2xl shadow-purple-200/50 relative overflow-hidden aspect-square md:aspect-auto h-[160px] md:h-full will-change-transform transform-gpu isolate"
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
  { src: "/dashboard_updated.png", label: "DASHBOARD" },
  { src: "/under90_homescreen.png", label: "UNDER90 PRODUCT PAGE" },   
  { src: "/under90_orderscreen (1).png", label: "UNDER90 ORDER DETAILS" }, 
];

const SceneKitchen = memo(({ isMobile }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const itemWidth = width * 0.7 + 24; // Width (70vw) + Gap (24px)
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      const itemWidth = width * 0.7 + 24;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

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

      <div className="w-full lg:w-7/12 relative min-h-[500px] md:min-h-[750px] flex items-center justify-center mt-12 lg:mt-0 px-4 md:px-0">
         {/* Desktop View: 3D Floating Stack */}
         <div className="hidden lg:block relative w-full h-full perspective-[2000px]">
            {KITCHEN_SCREENSHOTS.map((item, i) => {
              // Create a 3D Floating Stack
              const rotation = (i - 1.5) * 12;
              const xOffset = (i - 1.5) * 140;
              const yOffset = Math.abs(i - 1.5) * 30;
              const zOffset = Math.abs(i - 1.5) * -150;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 100, rotateY: 0 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: xOffset,
                    y: yOffset,
                    rotateY: rotation,
                    z: zOffset,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 70, 
                    damping: 20, 
                    delay: i * 0.1 
                  }}
                  whileHover={{ 
                    y: yOffset - 80,
                    scale: 1.15,
                    rotateY: 0,
                    z: 200,
                    zIndex: 100,
                    transition: { 
                      duration: 0.3, 
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] aspect-[9/19] rounded-[2.8rem] overflow-hidden group cursor-pointer transition-all duration-500 border-none outline-none"
                  style={{ 
                    zIndex: KITCHEN_SCREENSHOTS.length - i,
                  }}
                >
                  <img 
                    src={item.src} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={item.label} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-10 left-6 right-6 text-white translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                     <p className="text-[12px] font-black uppercase tracking-[0.3em] mb-1">{item.label}</p>
                     <p className="text-[8px] font-medium opacity-70 uppercase tracking-widest">Click to enlarge</p>
                  </div>
                </motion.div>
              );
            })}
         </div>

         {/* Mobile View: Staggered Depth Carousel */}
         <div className="lg:hidden w-full flex flex-col gap-10">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden flex items-center gap-6 px-[15vw] pb-12 snap-x snap-mandatory perspective-[1000px]"
            >
              {KITCHEN_SCREENSHOTS.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 w-[70vw] aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-transparent snap-center relative border-none outline-none"
                  initial={{ opacity: 0, rotateY: 15, scale: 0.9 }}
                  whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 50, damping: 15, delay: i * 0.1 }}
                  viewport={{ once: false, margin: "-10px" }}
                >
                  <img 
                    src={item.src} 
                    className="w-full h-full object-cover" 
                    alt={item.label} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                     <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Functional indicators */}
            <div className="flex justify-center gap-3 px-10">
               {KITCHEN_SCREENSHOTS.map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => scrollTo(i)}
                   className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? 'w-8 bg-[#aa3fdd]' : 'w-2 bg-purple-200'}`}
                   aria-label={`Go to slide ${i + 1}`}
                 />
               ))}
            </div>
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

const SceneCTA = memo(() => {
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
 
        <a 
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-5 md:px-12 md:py-6 bg-[#aa3fdd] text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all shadow-2xl shadow-purple-200 active:scale-95 px-12"
        >
          Order Now
        </a>
    </div>
  );
});
