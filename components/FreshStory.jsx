'use client';

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeContext";
import { ChefHat, Utensils, Flame } from "lucide-react";

const STORY_CHAPTERS = [
  {
    title: "The Vision",
    subtitle: "2024 • THE AWAKENING",
    desc: "daYummeals was born from a simple realization: the most profound flavors aren't found in commercial kitchens, but in the heart of homes.",
    image: "/Image1.png",
    color: "#aa3fdd"
  },
  {
    title: "The Kitchens",
    subtitle: "2025 • THE PARTNERSHIP",
    desc: "We partnered with the finest home chefs across India, bringing traditional family recipes to the digital age for everyone.",
    image: "/Image2.png",
    color: "#aa3fdd"
  },
  {
    title: "The Craft",
    subtitle: "2026 • THE ARTISTRY",
    desc: "Every meal is an art piece. Small batches, fresh ingredients, and zero preservatives. Prepared with absolute love and care.",
    image: "/Image3.png",
    color: "#aa3fdd"
  },
  {
    title: "The Community",
    subtitle: "BEYOND • THE LEGACY",
    desc: "Today, we are more than just a delivery service. We are a community of food lovers, home chefs, and creators of happiness.",
    image: "/Image4.png",
    color: "#aa3fdd"
  }
];

function ChapterSection({ chapter, index }) {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", once: false });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Scroll-linked animations for opacity and scale
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  
  // Dynamic 3D tilt based on scroll position (subtle)
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -2 : 2, 0, index % 2 === 0 ? 2 : -2]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 py-20 px-6 max-w-7xl mx-auto border-b border-white/5 last:border-0">
      
      {/* IMAGE SIDE */}
      <div className={`w-full md:w-5/12 relative order-2 ${index % 2 === 0 ? 'md:order-none' : 'md:order-2'} perspective-[2000px]`}>
        <motion.div
          style={{ rotateX, rotateY, scale, opacity }}
          animate={index === 1 ? {
            borderRadius: ["2rem", "15% 85% 15% 85% / 85% 15% 85% 15%", "2rem"],
            scale: [1, 1.02, 1]
          } : {}}
          transition={index === 1 ? {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
          className={`relative aspect-[4/3] md:aspect-[4/5] max-h-[60vh] md:max-h-[70vh] ${index === 1 ? 'md:rounded-full rounded-[2rem]' : 'rounded-[2rem] md:rounded-[4rem]'} overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]`}
        >
          <Image 
            src={chapter.image} 
            alt={chapter.title} 
            fill 
            className="object-cover opacity-80" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
            <span className="text-white font-black italic text-sm md:text-base">0{index + 1}</span>
          </div>
        </motion.div>

        {/* Unique Floating Elements for Slide 2 */}
        {index === 1 && (
          <>
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 z-20 bg-white text-black p-4 rounded-full shadow-xl hidden md:block"
            >
              <ChefHat size={32} />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -right-10 z-20 bg-[#aa3fdd] text-white p-4 rounded-full shadow-xl hidden md:block"
            >
              <Utensils size={32} />
            </motion.div>
          </>
        )}

        {/* Dynamic Glow */}
        <div className="absolute -inset-10 bg-[#aa3fdd]/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
      </div>

      {/* TEXT SIDE */}
      <div className="w-full md:w-1/2 space-y-4 md:space-y-8 text-center md:text-left order-1 md:order-none">
        <motion.div
          style={{ opacity, scale }}
        >
          <span className="text-[#aa3fdd] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-sm block mb-2 md:mb-4">
            {chapter.subtitle}
          </span>
          <h3 className={`text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            {chapter.title}
          </h3>
          <div className="w-12 md:w-16 h-1 bg-[#aa3fdd] mx-auto md:mx-0 rounded-full my-6 md:my-8" />
          <p className={`text-base md:text-2xl font-light leading-relaxed max-w-lg mx-auto md:mx-0 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            {chapter.desc}
          </p>
          

        </motion.div>
      </div>
    </div>
  );
}

export default function FreshStory() {
  const { theme } = useTheme();

  return (
    <section className={`relative transition-colors duration-1000 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      {/* SECTION HEADER */}
      <div className="container mx-auto pt-32 mb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className={`text-5xl md:text-[8vw] font-black italic tracking-tighter leading-none uppercase ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            OUR <span className="text-[#aa3fdd]">LEGACY</span>
          </h2>
          <p className="text-[#aa3fdd] tracking-[1em] uppercase text-[10px] md:text-xs font-black opacity-60">The Journey of daYum</p>
        </motion.div>
      </div>

      {/* CHAPTER STACK */}
      <div className="relative">
        {STORY_CHAPTERS.map((chapter, i) => (
          <ChapterSection key={i} chapter={chapter} index={i} />
        ))}
      </div>

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-0 w-[50vw] h-[50vh] bg-[#aa3fdd]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[50vw] h-[50vh] bg-[#aa3fdd]/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}
