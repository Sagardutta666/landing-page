'use client';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useTheme } from "@/lib/ThemeContext";

const DARK_SCREENSHOTS = [
  { 
    id: 1, 
    image: "/homescreen.png", 
    title: "AUTHENTIC FLAVORS", 
    desc: "Experience the real taste of home-cooked meals, crafted with love by local chefs.", 
    accent: "from-purple-600 to-indigo-600"
  },
  { 
    id: 2, 
    image: "/menu-page.png", 
    title: "CURATED MENU", 
    desc: "Our chefs prepare diverse, healthy options daily to keep your palate excited.", 
    accent: "from-pink-600 to-rose-600"
  },
  { 
    id: 3, 
    image: "/orderdetails_screen.png", 
    title: "REAL-TIME TRACKING", 
    desc: "Follow your meal's journey from the kitchen to your doorstep with precision.", 
    accent: "from-purple-600 to-[#aa3fdd]"
  },
  { 
    id: 4, 
    image: "/reward-page.png", 
    title: "EXCLUSIVE REWARDS", 
    desc: "Collect digital cookies with every order and claim vouchers for free meals.", 
    accent: "from-emerald-600 to-teal-600"
  }
];

const LIGHT_SCREENSHOTS = [
  { 
    id: 101, 
    image: "/under90_splashscreen.png", 
    title: "AUTHENTIC HOME", 
    desc: "Pure home-cooked goodness, delivered fresh from local kitchens to your table.", 
    accent: "from-purple-500 to-pink-500",
    label: "STEP 01",
    layout: "float"
  },
  { 
    id: 102, 
    image: "/under90_homescreen.png", 
    title: "KITCHEN PRIDE", 
    desc: "Discover the secret recipes of your neighborhood. Handcrafted with love.", 
    accent: "from-purple-500 to-[#aa3fdd]",
    label: "STEP 02",
    layout: "slant"
  },
  { 
    id: 103, 
    image: "/under90_orderscreen (1).png", 
    title: "EXPRESS LOVE", 
    desc: "Speed meets soul. Tracking your meal from the heart of a home to your hands.", 
    accent: "from-blue-500 to-cyan-500",
    label: "STEP 03",
    layout: "minimal"
  },
  { 
    id: 104, 
    image: "/homescreen_under90.png", 
    title: "RUSH READY", 
    desc: "Because the best home-cooked food shouldn't make you wait. 90 mins, guaranteed.", 
    accent: "from-emerald-500 to-teal-500",
    label: "STEP 04",
    layout: "reveal"
  }
];



export default function Showcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  function handleMouseMove(e) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  const SCREENSHOTS = theme === 'light' ? LIGHT_SCREENSHOTS : DARK_SCREENSHOTS;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SCREENSHOTS.length);
  };

  const currentScreenshot = SCREENSHOTS[currentIndex % SCREENSHOTS.length];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`relative py-32 md:py-48 overflow-hidden transition-colors duration-1000 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
    >
      {/* Background Glow / Dynamic Color Shift */}
      <AnimatePresence mode="wait">
        <motion.div
           key={`container-${currentIndex}`}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="absolute inset-0 pointer-events-none z-0"
        >
          <motion.div
             animate={{ 
               opacity: theme === 'light' ? 1 : 0.3,
               backgroundColor: theme === 'light' ? (currentScreenshot.accent.includes('purple') ? '#f5f3ff' : currentScreenshot.accent.includes('#aa3fdd') ? '#f5f3ff' : '#f0f9ff') : 'transparent'
             }}
             transition={{ duration: 1 }}
             className="absolute inset-0"
          />
          {theme === 'dark' && (
            <motion.div
              animate={{ opacity: 0.3 }}
              className={`absolute inset-0 bg-gradient-to-br ${currentScreenshot.accent} opacity-20`}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-32 ${theme === 'light' && currentIndex % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* IMAGE CONTAINER */}
          <motion.div 
            style={{ rotateX, rotateY }}
            className={`w-full lg:w-1/2 flex justify-center perspective-[2000px] ${theme === 'light' ? 'mb-12 lg:mb-0' : ''}`}
          >
            {theme === 'dark' ? (
              /* DARK THEME: PRE-ORDERS PHONE STACK */
              <div 
                 className="relative w-[120px] h-[260px] sm:w-[180px] sm:h-[380px] md:w-[220px] md:h-[460px] cursor-pointer"
                 onClick={handleNext}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {[...Array(3)].map((_, i) => {
                    const slideIndex = (currentIndex + i) % SCREENSHOTS.length;
                    const screen = SCREENSHOTS[slideIndex];
                    const depth = i;

                    return (
                      <motion.div
                        key={screen.id}
                        layoutId={`screen-${screen.id}`}
                        initial={{ scale: 0.8, opacity: 0, x: 50 }}
                        animate={{ 
                          scale: 1 - depth * 0.08, 
                          opacity: 1 - depth * 0.4,
                          y: -depth * 25,
                          zIndex: 10 - depth,
                          filter: `blur(${depth * 4}px)`,
                          x: 0
                        }}
                        exit={{ 
                          x: 300, 
                          opacity: 0, 
                          rotate: 10,
                          scale: 0.9,
                          filter: "blur(10px)",
                          transition: { duration: 0.4, ease: "circIn" }
                        }}
                        className={`absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-[4px] md:border-[6px] shadow-2xl bg-black border-[#111]`}
                      >
                        <img src={screen.image} alt={screen.title} className="w-full h-full object-cover" />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              /* LIGHT THEME: UNDER 90 FRAMELESS DYNAMIC LAYOUTS */
              <div 
                 className="relative w-full max-w-md aspect-[9/16] cursor-pointer"
                 onClick={handleNext}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreenshot.id}
                    initial={{ opacity: 0, scale: 0.9, x: currentIndex % 2 === 0 ? -100 : 100 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 1.1, x: currentIndex % 2 === 0 ? 100 : -100, filter: "blur(20px)" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="w-full h-full relative"
                  >
                    {/* Unique Shadow Base (No Bezel) */}
                    <div className="absolute inset-4 bg-black/5 blur-3xl rounded-[3rem] -z-10" />
                    
                    <motion.div 
                      className={`w-full h-full rounded-[3rem] overflow-hidden shadow-2xl relative z-10 glass-light`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <img 
                        src={currentScreenshot.image} 
                        alt={currentScreenshot.title} 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Floating Decorative Elements per layout */}
                    <AnimatePresence>
                      {currentScreenshot.layout === 'float' && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute -top-10 -left-10 w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-4xl z-20"
                        >
                          🥗
                        </motion.div>
                      )}
                      
                      {currentScreenshot.layout === 'slant' && (
                        <motion.div 
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white font-black text-xs uppercase tracking-widest z-20"
                        >
                          90 MIN
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* TEXT SIDE */}
          <div className={`w-full lg:w-1/2 space-y-8 ${theme === 'light' ? 'text-center lg:text-left' : 'text-center lg:text-left'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="space-y-4"
              >
                <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${theme === 'light' ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-white text-black'}`}>
                   {theme === 'light' ? currentScreenshot.label : `EXPERIENCE ${currentIndex + 1}`}
                </div>
                
                <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter leading-[0.9] uppercase ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  {currentScreenshot.title.split(' ').map((word, i) => (
                    <span 
                      key={i} 
                      className={i === 1 ? 'block' : 'block'}
                      style={i === 1 ? { 
                        background: `linear-gradient(to right, ${currentScreenshot.accent.split(' ')[0].replace('from-', '')}, ${currentScreenshot.accent.split(' ')[1].replace('to-', '')})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      } : {}}
                    >
                      {word}
                    </span>
                  ))}
                </h2>
                
                <p className={`text-base md:text-xl font-light max-w-lg mx-auto lg:mx-0 leading-tight ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {currentScreenshot.desc}
                </p>

                <div className="flex flex-col md:flex-row items-center gap-8 pt-6">
                   <button 
                     onClick={handleNext}
                     className={`group flex items-center gap-4 text-xs font-black uppercase tracking-widest ${theme === 'light' ? 'text-black' : 'text-white'}`}
                   >
                     Next Feature
                     <motion.div 
                       whileHover={{ x: 10 }}
                       className="w-10 h-10 rounded-full border border-current flex items-center justify-center transition-colors group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white"
                     >
                       →
                     </motion.div>
                   </button>

                     <div className="flex gap-3">
                       {SCREENSHOTS.map((_, i) => (
                         <motion.div 
                           key={i} 
                           animate={{ 
                             width: i === currentIndex ? 40 : 10,
                             opacity: i === currentIndex ? 1 : 0.4 
                           }}
                           className={`h-2 rounded-full ${theme === 'light' ? 'bg-purple-600' : 'bg-white'}`} 
                         />
                       ))}
                     </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}