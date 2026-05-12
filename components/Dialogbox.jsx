"use client";

import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Dialogbox({ open, onClose }) {
  const { 
    theme, 
    openPolicy, 
    openPartner, 
    openContact, 
    openChef 
  } = useTheme();
  const confettiFiredRef = useRef(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      if (!confettiFiredRef.current) {
        confettiFiredRef.current = true;
        const confettiConfig = { 
          particleCount: 200, 
          spread: 120, 
          origin: { y: 0.6 }, 
          colors: ['#aa3fdd', '#db2777', '#ffffff'],
          zIndex: 10000 
        };
        confetti(confettiConfig);
        setTimeout(() => confetti({ ...confettiConfig, particleCount: 150 }), 300);
      }
    } else {
      document.body.style.overflow = '';
      confettiFiredRef.current = false;
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const openInNewTab = (url) =>
    window.open(url, "_blank", "noopener,noreferrer");

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: "-45%", x: "-50%" }}
        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
        exit={{ opacity: 0, scale: 0.9, y: "-45%", x: "-50%" }}
        className="fixed z-[1001] left-1/2 top-1/2 w-full max-w-5xl overflow-hidden px-4 md:px-8"
      >
        <Card className={`${theme === 'light' ? 'bg-[#F2F0EA] border-none' : 'glass-dark border-none'} rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl`}>
          <CardContent className="p-0">
            <div className={`flex flex-col md:flex-row ${theme === 'light' ? 'bg-[#F2F0EA]' : ''}`}>
              {/* Left Side: Image Preview */}
              <div className={`w-full md:w-5/12 bg-gradient-to-br p-4 md:p-8 flex items-center justify-center relative overflow-hidden ${theme === 'light' ? 'from-[#EAE8E4] to-[#F2F0EA]' : 'from-purple-900/40 to-black'}`}>
                <div className="relative w-full max-w-[120px] md:max-w-[190px] aspect-[9/19]">
                  {/* Secondary Image (Behind, Left) */}
                  <motion.div
                    initial={{ opacity: 0, x: 0, y: 20, rotate: -5 }}
                    animate={{ opacity: 1, x: -40, y: 10, rotate: -8 }}
                    transition={{ delay: 0.3 }}
                    className="absolute inset-0 z-0 scale-[0.95]"
                  >
                    <Image
                      src={theme === 'light' ? "/under90_orderscreen (1).png" : "/orderdetailscreen.png"}
                      alt="Back Preview"
                      width={320}
                      height={640}
                      className="w-full h-auto object-contain"
                    />
                  </motion.div>

                  {/* Primary Image (Front, Right) */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, x: 20 }}
                    className="relative z-10 group cursor-pointer transition-all border-none outline-none bg-transparent"
                    onClick={() => openInNewTab("https://play.google.com/store/apps/details?id=com.dayummeals.androidapp")}
                  >
                    <Image
                      src="/dashboard_updated_new.png"
                      alt="App Preview"
                      width={320}
                      height={640}
                      className="w-full h-auto object-contain"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </motion.div>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-7/12 p-5 md:p-8 lg:p-10 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className={`text-xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 tracking-tighter ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    Order <span className="text-gradient">Authentic Meal</span> Now!
                  </h2>
                  <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mb-2 md:mb-4 text-[9px] md:text-xs max-w-sm`}>
                    Scan the QR code below to download our app
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-2 md:p-3 rounded-xl mb-3 md:mb-4 shadow-xl"
                  onClick={() => openInNewTab("https://play.google.com/store/apps/details?id=com.dayummeals.androidapp")}
                >
                  <Image
                    src="/qr.jpg"
                    alt="QR Code"
                    width={100}
                    height={100}
                    className="object-contain w-16 md:w-24 lg:w-28"
                    priority
                  />
                </motion.div>

                <div className="flex flex-col items-center gap-3 md:gap-6 w-full">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openInNewTab("https://play.google.com/store/apps/details?id=com.dayummeals.androidapp")}
                    className="w-full max-w-[180px] md:max-w-[200px]"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Google Play Store"
                      className="w-full"
                    />
                  </motion.button>

                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 mt-2 px-2 md:px-8 border-t border-gray-100 pt-6 md:pt-8 w-full italic">
                    <button onClick={() => openPolicy('TERMS')} className="hover:text-[#aa3fdd] transition-colors whitespace-nowrap">Terms & Conditions</button>
                    <button onClick={() => openPolicy('PRIVACY')} className="hover:text-[#aa3fdd] transition-colors whitespace-nowrap">Privacy Policy</button>
                    <button onClick={() => openPolicy('ABOUT')} className="hover:text-[#aa3fdd] transition-colors whitespace-nowrap">About Us</button>
                    <button onClick={openContact} className="hover:text-[#aa3fdd] transition-colors whitespace-nowrap">Contact Us</button>
                    <button onClick={openPartner} className="hover:text-[#aa3fdd] transition-colors whitespace-nowrap">Partner with us</button>
                    <button onClick={openChef} className="hover:text-[#aa3fdd] transition-colors whitespace-nowrap font-black">Become a Chef</button>
                  </div>

                  <div className={`flex items-center gap-6 mt-2 ${theme === 'light' ? 'text-black/40' : 'text-white/40'}`}>
                    {[
                      { icon: Instagram, url: "https://www.instagram.com/dayummeals/" },
                      { icon: Twitter, url: "https://x.com/dayummeals" },
                      { icon: Facebook, url: "https://m.facebook.com/61567845624373/" }
                    ].map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:scale-120 hover:text-[#aa3fdd] transition-all">
                        <s.icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          {/* Close button inside modal for better UX */}
          <button 
            onClick={onClose}
            className={`absolute top-6 right-6 transition-colors text-2xl p-2 ${theme === 'light' ? 'text-black/40 hover:text-black' : 'text-white/40 hover:text-white'}`}
          >
            &times;
          </button>
        </Card>
      </motion.div>
    </>
  );
}
