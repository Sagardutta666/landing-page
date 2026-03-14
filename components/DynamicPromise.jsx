'use client'
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function DynamicPromise() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const textLeft = useTransform(scrollYProgress, [0, 0.5], ["-100%", "0%"]);
  const textRight = useTransform(scrollYProgress, [0.5, 1], ["100%", "0%"]);
  const scale = useTransform(scrollYProgress, [0.3, 0.7], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-white overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        
        {/* Animated Background Text */}
        <div className="absolute inset-0 flex flex-col justify-center gap-20 opacity-[0.03] select-none pointer-events-none">
           <motion.div style={{ x: textLeft }} className="text-[20vw] font-black whitespace-nowrap">90 MINUTES PROMISE 90 MINUTES PROMISE</motion.div>
           <motion.div style={{ x: textRight }} className="text-[20vw] font-black whitespace-nowrap">HOME COOKED FRESH HOME COOKED FRESH</motion.div>
        </div>

        {/* Central Component */}
        <motion.div 
          style={{ scale, opacity }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="relative w-80 h-80 md:w-[600px] md:h-[600px] flex items-center justify-center">
             {/* Progress Circle */}
             <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="2" />
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" stroke="#9333ea" strokeWidth="2" 
                  style={{ pathLength }}
                  strokeLinecap="round"
                />
             </svg>

             {/* Inner Content */}
             <div className="text-center p-12">
                <motion.span 
                  className="text-7xl md:text-9xl font-black text-black block"
                >
                  <motion.span>{useTransform(scrollYProgress, [0, 1], [0, 90])}</motion.span>
                  <span className="text-3xl md:text-5xl">MIN</span>
                </motion.span>
                <div className="w-20 h-2 bg-purple-600 mx-auto rounded-full my-6" />
                <p className="text-lg md:text-2xl font-bold text-gray-400 uppercase tracking-widest">The Ultimate Speed Promise</p>
             </div>
          </div>

          {/* Feature Cards that appear on scroll */}
          <div className="absolute inset-0 pointer-events-none">
             {[
               { icon: "🛵", label: "Priority Delivery", pos: "top-0 -left-40" },
               { icon: "🥗", label: "Always Fresh", pos: "top-40 -right-60" },
               { icon: "🍳", label: "Home Kitchens", pos: "bottom-20 -left-80" },
               { icon: "💰", label: "Great Value", pos: "bottom-40 -right-40" }
             ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ margin: "-200px" }}
                  transition={{ type: "spring", delay: i * 0.1 }}
                  className={`absolute ${feature.pos} bg-white shadow-2xl rounded-3xl p-6 border border-black/5 flex items-center gap-4 hidden md:flex`}
                >
                  <span className="text-4xl">{feature.icon}</span>
                  <span className="font-black text-xs uppercase tracking-widest">{feature.label}</span>
                </motion.div>
             ))}
          </div>
        </motion.div>

        {/* Scroll Progress Text */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-20 text-center"
        >
          <p className="text-xs font-black text-purple-600 uppercase tracking-[0.5em] mb-4">Journey of your meal</p>
          <div className="flex gap-16 text-[10px] font-bold text-gray-300">
             <span className={pathLength.get() > 0.2 ? 'text-black' : ''}>ORDER</span>
             <span className={pathLength.get() > 0.5 ? 'text-black' : ''}>COOKING</span>
             <span className={pathLength.get() > 0.8 ? 'text-black' : ''}>DELIVERY</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
