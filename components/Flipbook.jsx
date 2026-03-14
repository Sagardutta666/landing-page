'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/lib/ThemeContext';

const STORY_ITEMS = [
  {
    image: "/Image1.png",
    title: "The Vision",
    year: "2024",
    desc: "It started with a simple idea: make healthy, home-cooked meals accessible to everyone without compromising on taste."
  },
  {
    image: "/Image2.png",
    title: "The Kitchens",
    year: "2025",
    desc: "We partnered with the finest home chefs across India, bringing traditional family recipes to the digital age."
  },
  {
    image: "/Image3.png",
    title: "The Craft",
    year: "2026",
    desc: "Every meal is an art piece. Small batches, fresh ingredients, and zero preservatives. Pure love."
  },
  {
    image: "/Image4.png",
    title: "The Community",
    year: "BEYOND",
    desc: "Today, we are more than just a delivery service. We are a community of food lovers and creators."
  }
];

export default function FlipBook() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate horizontal movement - Tighter range to prevent dead space at the end
  const xOffset = useTransform(smoothScroll, [0, 0.95], ["0%", "-300%"]);
  
  // Fade out into the footer to remove the "black block" feeling
  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <div ref={containerRef} className="h-[250vh] md:h-[400vh] relative z-40 bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* CINEMATIC MURAL TITLE */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
            scale: useTransform(scrollYProgress, [0, 0.05], [1, 0.8])
          }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: 200 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase"
            >
              OUR <span className="text-gradient">STORY</span>
            </motion.h2>
          </div>
          <p className="text-white/30 tracking-[1em] uppercase text-[10px] md:text-sm mt-4">The Kinetic Journey</p>
        </motion.div>

        {/* KINETIC SCROLLING GALLERY */}
        <motion.div 
          style={{ x: xOffset, opacity }}
          className="flex h-full items-center px-[5vw] md:px-[10vw] gap-[15vw] md:gap-[20vw]"
        >
          {STORY_ITEMS.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-[90vw] md:w-[60vw] h-[55vh] md:h-[60vh] relative group">
              
              {/* LARGE YEAR NUMBER BACKGROUND */}
              <div className="absolute -top-10 md:-top-20 -left-5 md:-left-10 z-0">
                <span className="text-[25vw] md:text-[20vw] font-black text-white/[0.03] italic leading-none pointer-events-none">
                  {item.year}
                </span>
              </div>

              <div className="w-full h-full relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110" 
                  priority={i === 0}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-20 flex flex-col justify-end">
                  <div className="max-w-2xl space-y-4 md:space-y-6">
                    <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    <h3 className="text-4xl md:text-8xl font-black italic tracking-tighter text-white uppercase leading-none">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-2xl font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* FLOATING DECOR */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
                className="absolute -bottom-10 -right-10 w-24 md:w-40 h-24 md:h-40 bg-purple-600/10 md:bg-purple-600/20 blur-[40px] md:blur-[60px] rounded-full -z-10"
              />
            </div>
          ))}
        </motion.div>

        {/* HORIZONTAL PROGRESS BAR */}
        <div className="absolute bottom-10 left-[10vw] right-[10vw] h-[1px] bg-white/10 overflow-hidden">
          <motion.div 
            style={{ scaleX: scrollYProgress, opacity }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 origin-left"
          />
        </div>

      </div>
    </div>
  );
}
