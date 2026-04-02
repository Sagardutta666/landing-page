'use client';

import BrandLogo from "@/components/BrandLogo";
import FreshStory from "@/components/FreshStory";
import FlipComponent from "@/components/FlipComponent";
import HeroSection from "@/components/Hero";
import ShowcaseSection from "@/components/Showcase";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { useEffect } from "react";
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

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
  const { theme, openPolicy, openPartner, openContact } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01
  });

  const handlePolicyOpen = (e: React.MouseEvent, type: "TERMS" | "PRIVACY" | "ABOUT") => {
    e.preventDefault();
    openPolicy(type, "PRE");
  };

  const handlePartnerOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    openPartner();
  };

  const handleContactOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    openContact();
  };

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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-[#aa3fdd] z-[200] origin-left"
        style={{ scaleX }}
      />

      <div className="relative">
        {/* 1. HERO: PINNED BASE LAYER */}
        <section className="h-screen sticky top-0 z-0">
          <HeroSection />
        </section>

        {/* 3. SHOWCASE (EXPERIENCES): SLIDES UP ONLY ON SCROLL */}
        <SectionWrapper isOverlapping={false} className="shadow-[0_-50px_100px_rgba(0,0,0,0.8)] pb-24 md:pb-40">
          <ShowcaseSection />
        </SectionWrapper>

        {/* 4. OUR LEGACY: CORE STORY IMAGES */}
        <section className="relative z-40 bg-black">
          <FreshStory />
        </section>

        {/* 5. FOOTER */}
        <footer className={`relative z-50 py-24 transition-colors duration-1000 bg-black text-white border-t border-white/5`}>
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center gap-12 text-center mb-16">
              <div className="flex flex-col items-center gap-2">
                <BrandLogo showIcon={false} showUnderline={false} className="scale-[1.5] origin-center bg-white px-5 py-2 mb-4" />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white/30 italic">Authenticity Starts Here!</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/40 italic">
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
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); useTheme().openChef(); }}
                    className="hover:text-[#aa3fdd] transition-colors"
                  >
                    Become a Chef
                  </a>
              </div>

              <div className="flex justify-center gap-6">
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
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all border-white/10 hover:bg-white hover:text-black`}
                  >
                    <social.Icon size={20} strokeWidth={2.5} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
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

