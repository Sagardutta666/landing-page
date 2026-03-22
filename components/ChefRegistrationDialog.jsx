'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Send, User, Phone, Mail, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function ChefRegistrationDialog({ isOpen, onClose }) {
  const { openPolicy } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyq-ttCjjNJ_pCYtW2cgH1d97jgxG_OgbIrpiZ3U6YWUPJbSjzZhM2zQqXgKKYted6f/exec";

    try {
      // Minimal fetch for GAS no-cors compatibility
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          sheetName: 'Chef_Applications',
          formData: {
            ...formData,
            timestamp: new Date().toLocaleString()
          }
        })
      });

      console.log("Chef Application Submitted:", formData);
      setSubmitted(true);
      setIsLoading(false);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: "", mobile: "", email: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setIsLoading(false);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handlePolicyOpen = (e, type) => {
    e.preventDefault();
    openPolicy(type, "90MIN");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[10000]"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            data-lenis-prevent
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-full max-w-lg bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl z-[10001] border border-purple-50 overflow-y-auto max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight leading-none italic">
                  JOIN OUR <span className="text-[#aa3fdd]">KITCHEN</span>
                </h2>
                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Become a Home Chef</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Success State or Form */}
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-black uppercase italic text-black">Application Received!</h3>
                <p className="text-gray-400 max-w-[250px] mx-auto text-xs font-bold uppercase tracking-widest">Thank you for joining. Our team will reach out to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aa3fdd]">
                    <User size={18} />
                  </div>
                  <input
                    required
                    disabled={isLoading}
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-gray-50 border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-[#aa3fdd]/20 transition-all outline-none text-black disabled:opacity-50"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aa3fdd]">
                    <Phone size={18} />
                  </div>
                  <input
                    required
                    disabled={isLoading}
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full bg-gray-50 border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-[#aa3fdd]/20 transition-all outline-none text-black disabled:opacity-50"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aa3fdd]">
                    <Mail size={18} />
                  </div>
                  <input
                    required
                    disabled={isLoading}
                    type="email"
                    placeholder="Email ID"
                    className="w-full bg-gray-50 border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-[#aa3fdd]/20 transition-all outline-none text-black disabled:opacity-50"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-5 text-[#aa3fdd]">
                    <MessageSquare size={18} />
                  </div>
                  <textarea
                    required
                    disabled={isLoading}
                    placeholder="Briefly describe your kitchen specialties..."
                    className="w-full bg-gray-50 border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-[#aa3fdd]/20 transition-all outline-none min-h-[100px] md:min-h-[120px] resize-none text-black disabled:opacity-50"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-[#aa3fdd] text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-[1.02] transition-all shadow-xl shadow-[#aa3fdd]/20 flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>Sending... <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>Send Application <Send size={16} /></>
                  )}
                </button>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-6 text-[8px] md:text-[9px] uppercase tracking-widest text-gray-400 font-bold border-t border-gray-100 italic">
                  <a href="#" onClick={(e) => handlePolicyOpen(e, "TERMS")} className="hover:text-[#aa3fdd] transition-colors cursor-pointer">Terms & Conditions</a>
                  <a href="#" onClick={(e) => handlePolicyOpen(e, "PRIVACY")} className="hover:text-[#aa3fdd] transition-colors cursor-pointer">Privacy Policy</a>
                  <a href="#" onClick={(e) => handlePolicyOpen(e, "ABOUT")} className="hover:text-[#aa3fdd] transition-colors cursor-pointer">About Us</a>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
