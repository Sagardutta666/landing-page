'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeContext";

const STORY_CHAPTERS = [
  {
    desc: "daYummeals was created from a simple realization: the most profound flavors aren't found in commercial kitchens, but in the heart of homes.",
    image: "/Image1.png"
  },
  {
    desc: "We partnered with the finest home chefs across India, bringing traditional family recipes to the digital age for everyone.",
    image: "/Image2.png"
  },
  {
    desc: "Every meal is an art piece. Small batches, fresh ingredients, and zero preservatives. Prepared with absolute love and care.",
    image: "/Image3.png"
  },
  {
    desc: "Today, we are more than just a delivery service. We are a community of food lovers, home chefs, and creators of happiness.",
    image: "/Image4.png"
  }
];

function ChapterSection({ chapter, index }) {
  const { theme } = useTheme();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -2 : 2, 0, index % 2 === 0 ? 2 : -2]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 py-20 px-6 max-w-7xl mx-auto border-b border-white/5 last:border-0">
      
      {/* IMAGE SIDE */}
      <div className={`w-full md:w-5/12 relative order-2 ${index % 2 === 0 ? 'md:order-none' : 'md:order-2'} perspective-[2000px]`}>
        <motion.div
          style={{ rotateX, rotateY, scale, opacity }}
          className="relative aspect-[4/3] md:aspect-[4/5] max-h-[60vh] md:max-h-[70vh] rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]"
        >
          <Image 
            src={chapter.image} 
            alt="Legacy" 
            fill 
            className="object-cover opacity-80" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
            <span className="text-white font-black italic text-sm md:text-base">0{index + 1}</span>
          </div>
        </motion.div>

        {/* Dynamic Glow */}
        <div className="absolute -inset-10 bg-[#aa3fdd]/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
      </div>

      {/* TEXT SIDE: Only Description is left */}
      <div className="w-full md:w-1/2 space-y-4 md:space-y-8 text-center md:text-left order-1 md:order-none">
        <motion.div style={{ opacity, scale }}>
          <div className="w-12 md:w-16 h-1 bg-[#aa3fdd] mx-auto md:mx-0 rounded-full mb-8 md:mb-10" />
          <p className={`text-xl md:text-3xl font-light leading-relaxed max-w-lg mx-auto md:mx-0 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
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
      <div className="relative">
        {STORY_CHAPTERS.map((chapter, i) => (
          <ChapterSection key={i} chapter={chapter} index={i} />
        ))}
      </div>

      <div className="absolute top-1/4 left-0 w-[50vw] h-[50vh] bg-[#aa3fdd]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[50vw] h-[50vh] bg-[#aa3fdd]/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}
