"use client";

import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Dialogbox({ open, onClose }) {
  const { theme } = useTheme();
  const confettiFiredRef = useRef(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      if (!confettiFiredRef.current) {
        confettiFiredRef.current = true;
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#9333ea', '#db2777', '#ffffff'] });
        setTimeout(
          () => confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#9333ea', '#db2777', '#ffffff'] }),
          300
        );
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
        className="fixed z-[1001] left-1/2 top-1/2 w-11/12 md:w-full max-w-5xl max-h-[92vh] md:max-h-[82vh] overflow-y-auto md:overflow-hidden p-4 md:p-8"
      >
        <Card className={`${theme === 'light' ? 'bg-[#F2F0EA]/90 border-[#814A20]/10' : 'glass-dark border-white/10'} rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-xl`}>
          <CardContent className="p-0">
            <div className={`flex flex-col md:flex-row ${theme === 'light' ? 'bg-[#F2F0EA]' : ''}`}>
              {/* Left Side: Image Preview */}
              <div className={`w-full md:w-5/12 bg-gradient-to-br p-6 md:p-8 flex items-center justify-center relative overflow-hidden ${theme === 'light' ? 'from-[#EAE8E4] to-[#F2F0EA]' : 'from-purple-900/40 to-black'}`}>
                <div className="relative w-full max-w-[160px] md:max-w-[190px] aspect-[9/19]">
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
                      className="w-full h-auto object-cover rounded-[2rem] shadow-xl"
                    />
                  </motion.div>

                  {/* Primary Image (Front, Right) */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, x: 20 }}
                    className="relative z-10 group cursor-pointer shadow-[20px_40px_80px_rgba(0,0,0,0.4)] rounded-[2.2rem] md:rounded-[2.5rem] overflow-hidden transition-all"
                    onClick={() => openInNewTab("https://play.google.com/store/apps/details?id=com.dayummeals.androidapp")}
                  >
                    <Image
                      src="/homescreen_under90.png"
                      alt="App Preview"
                      width={320}
                      height={640}
                      className="w-full h-auto object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </motion.div>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-7/12 p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className={`text-xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 tracking-tighter ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    Order <span className="text-gradient">Authentic Meal</span> Now!
                  </h2>
                  <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mb-3 md:mb-4 text-[10px] md:text-xs max-w-sm`}>
                    Scan the QR code below to download our app
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-2 md:p-3 rounded-2xl mb-4 md:mb-4 shadow-xl"
                  onClick={() => openInNewTab("https://play.google.com/store/apps/details?id=com.dayummeals.androidapp")}
                >
                  <Image
                    src="/qr.jpg"
                    alt="QR Code"
                    width={100}
                    height={100}
                    className="object-contain w-20 md:w-24 lg:w-28"
                    priority
                  />
                </motion.div>

                <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
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

                  <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-1 text-[7px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                    <a href="https://dayummeals.in/terms-and-conditions" target="_blank" className="hover:text-purple-600 transition-colors">Terms & Conditions</a>
                    <a href="https://dayummeals.in/privacy-policy" target="_blank" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
                    <a href="https://dayummeals.in/about-us" target="_blank" className="hover:text-purple-600 transition-colors">About Us</a>
                    <a href="#" className="hover:text-purple-600 transition-colors">Contact Us</a>
                    <a href="#" className="hover:text-purple-600 transition-colors">Partner with us</a>
                  </div>

                  <div className={`flex items-center gap-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    <a href="#" className="hover:scale-120 transition-transform"><Twitter size={14} /></a>
                    <a href="#" className="hover:scale-120 transition-transform"><Instagram size={14} /></a>
                    <a href="#" className="hover:scale-120 transition-transform"><Facebook size={14} /></a>
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
