"use client";

import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dialogbox({ open, onClose }) {
  const confettiFiredRef = useRef(false);

  useEffect(() => {
    if (open && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#9333ea', '#db2777', '#ffffff'] });
      setTimeout(
        () => confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#9333ea', '#db2777', '#ffffff'] }),
        300
      );
    } else if (!open) {
      confettiFiredRef.current = false;
    }
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
        className="fixed z-[1001] left-1/2 top-1/2 w-11/12 max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Card className="glass-dark border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Left Side: Image Preview */}
              <div className="w-full md:w-5/12 bg-gradient-to-br from-purple-900/40 to-black p-8 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer shadow-2xl rounded-3xl overflow-hidden"
                  onClick={() => openInNewTab("https://play.google.com/store/apps/details?id=com.dayummeals.androidapp")}
                >
                  <Image
                    src="/Dummy_replica.png"
                    alt="App Preview"
                    width={400}
                    height={800}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </motion.div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
                    Taste <span className="text-gradient">Authenticity</span>
                  </h2>
                  <p className="text-gray-400 mb-8 max-w-sm">
                    Scan to download the daYummeals app and start your gourmet journey today.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-4 rounded-3xl mb-8 shadow-xl"
                  onClick={() => openInNewTab("https://play.google.com/store/apps/details?id=com.dayummeals.androidapp")}
                >
                  <Image
                    src="/qr.jpg"
                    alt="QR Code"
                    width={140}
                    height={140}
                    className="object-contain"
                    priority
                  />
                </motion.div>

                <div className="flex flex-col items-center gap-6 w-full">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openInNewTab("https://play.google.com/store/apps/details?id=com.dayummeals.androidapp")}
                    className="w-full max-w-xs"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Google Play Store"
                      className="w-full"
                    />
                  </motion.button>

                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                    <a href="https://dayummeals.in/terms-and-conditions" target="_blank" className="hover:text-white transition-colors">Terms</a>
                    <a href="https://dayummeals.in/privacy-policy" target="_blank" className="hover:text-white transition-colors">Privacy</a>
                    <a href="https://dayummeals.in/about-us" target="_blank" className="hover:text-white transition-colors">About</a>
                    <a href="https://docs.google.com/forms/u/0/d/1a2EJq3q2MR8vpGIHFXiz_9OoyZBQGRXP9_-sU-hYJhY/viewform" target="_blank" className="hover:text-white transition-colors">Contact</a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          {/* Close button inside modal for better UX */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors text-2xl p-2"
          >
            &times;
          </button>
        </Card>
      </motion.div>
    </>
  );
}
