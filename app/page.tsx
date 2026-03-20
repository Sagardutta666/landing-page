'use client';

import BrandLogo from "@/components/BrandLogo";
import FreshStory from "@/components/FreshStory";
import FlipComponent from "@/components/FlipComponent";
import HeroSection from "@/components/Hero";
import ShowcaseSection from "@/components/Showcase";
import DynamicPromise from "@/components/DynamicPromise";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { useEffect } from "react";
import { Instagram, Twitter, Linkedin, Github } from "lucide-react";

function SectionWrapper({ 
  children, 
  className = "", 
  isOverlapping = false 
}: { 
  children: React.ReactNode; 
  className?: string; 
  isOverlapping?: boolean;
}) {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  // Enhanced reveal: Fade in/scale up when entering, fade out/scale down when leaving
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  return (
    <motion.section 
      style={{ y, opacity, scale }}
      className={`relative z-20 ${className} ${isOverlapping ? '-mt-24 md:-mt-40' : ''}`}
    >
      {children}
    </motion.section>
  );
}

import Under90Experience from "@/components/Under90Experience";

export default function Home() {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01
  });

  // NAVIGATION FIX: Reset scroll to top on theme/mode change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [theme]);

  // BRANCH 1: THE FLUID UNDER 90 EXPERIENCE (LIGHT)
  if (theme === 'light') {
    return <Under90Experience />;
  }

  // BRANCH 2: THE CLASSIC PRE-ORDER EXPERIENCE (DARK)
  return (
    <div className={`transition-colors duration-1000 bg-black min-h-screen overflow-x-hidden selection:bg-purple-500 selection:text-white`}>
      {/* GLOBAL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 z-[200] origin-left"
        style={{ scaleX }}
      />

      <div className="relative">
        {/* 1. HERO: PINNED BASE LAYER */}
        <section className="h-screen sticky top-0 z-0">
          <HeroSection />
        </section>

        {/* 2. SHOWCASE (EXPERIENCES): SLIDES UP ONLY ON SCROLL */}
        <SectionWrapper isOverlapping={false} className="shadow-[0_-50px_100px_rgba(0,0,0,0.8)] pb-24 md:pb-40">
          <ShowcaseSection />
        </SectionWrapper>

        {/* 3. SCAN & REVEAL: CENTERED EXPERIENCE */}
        <SectionWrapper isOverlapping={true} className={`min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 bg-[#0a0a0a] shadow-[0_-50px_150px_rgba(0,0,0,0.1)] z-30 pb-20`}>
           <div className={`absolute inset-0 bg-mesh opacity-40 pointer-events-none`} />
           
             <motion.div 
               animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.1, 0.2, 0.1] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"
             />

           <div className="w-full h-full relative z-10 flex flex-col items-center justify-center py-12 md:py-20">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 }
                  }
                }}
                className="text-center flex flex-col items-center"
              >
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <h2 className={`text-3xl md:text-5xl lg:text-5xl font-black italic tracking-tighter leading-none mb-3 uppercase text-white`}>
                    SCAN & <span className="text-gradient">REVEAL</span>
                  </h2>
                  <div className={`w-16 h-1 mx-auto rounded-full mb-6 bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_20px_purple]`} />
                </motion.div>

                <motion.p 
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className={`text-base md:text-2xl font-light max-w-sm md:max-w-xl mx-auto leading-tight mb-8 md:mb-16 text-gray-400`}
                >
                   Unlock daily recipes through our holographic membership card.
                </motion.p>
                
                <motion.div 
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                  className="flex justify-center w-full"
                >
                  <FlipComponent />
                </motion.div>
              </motion.div>
           </div>
        </SectionWrapper>


        {/* 4. OUR LEGACY: FRESH CHAPTER-BASED STORY */}
        <section className="relative z-40 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          <FreshStory />
        </section>

        {/* 5. FOOTER */}
        <footer className={`relative z-50 py-24 transition-colors duration-1000 bg-black text-white`}>
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
              <div className="space-y-10 max-w-sm text-center md:text-left">
                <BrandLogo className="text-3xl md:text-4xl" />
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
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all border-white/10 hover:bg-white hover:text-black`}
                    >
                      <social.Icon size={20} strokeWidth={2.5} />
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-16 md:gap-32 w-full md:w-auto">
                <div className="space-y-8">
                  <h4 className="font-black uppercase tracking-widest text-xs opacity-40">Company</h4>
                  <ul className="space-y-4 font-bold text-lg">
                    <li><a href="#" className="hover:text-purple-600 transition-colors">Our Story</a></li>
                    <li><a href="#" className="hover:text-purple-600 transition-colors">Kitchens</a></li>
                  </ul>
                </div>
                <div className="space-y-8">
                  <h4 className="font-black uppercase tracking-widest text-xs opacity-40">Legal</h4>
                  <ul className="space-y-4 font-bold text-lg">
                    <li><a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-purple-600 transition-colors">Security</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-current opacity-10 mb-12" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
              <p>© 2026 daYummeals Group</p>
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

