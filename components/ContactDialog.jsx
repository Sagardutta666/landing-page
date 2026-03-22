'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, User, Phone, HelpCircle, MessageSquare, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function ContactDialog({ isOpen, onClose }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    queryType: "Order Related",
    description: ""
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
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          sheetName: 'Contact_Queries',
          formData: {
            ...formData,
            timestamp: new Date().toLocaleString()
          }
        })
      });

      console.log("Contact Form Submitted:", formData);
      setSubmitted(true);
      setIsLoading(false);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: "", phone: "", queryType: "Order Related", description: "" });
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setIsLoading(false);
    }
  };

  const queryTypes = ["Account Related", "Order Related", "Other"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[12000]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            data-lenis-prevent
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-lg rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl z-[12001] border overflow-y-auto max-h-[90vh] ${isLight ? 'bg-white border-purple-100 text-black' : 'bg-[#121212] border-white/10 text-white'}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8 md:mb-10">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${isLight ? 'bg-purple-50 text-purple-600' : 'bg-purple-500/10 text-purple-400'}`}>
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight uppercase italic">Contact Us</h2>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? 'text-gray-400' : 'text-white/30'}`}>We&apos;re here to help</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isLight ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 mb-6 font-black italic uppercase italic">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className={`text-xl font-black italic uppercase italic ${isLight ? 'text-black' : 'text-white'}`}>Query Received!</h3>
                <p className="opacity-60 max-w-[250px] mx-auto text-xs font-bold uppercase tracking-widest leading-relaxed">Our support team will get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aa3fdd]">
                      <User size={18} />
                    </div>
                    <input
                      required
                      disabled={isLoading}
                      type="text"
                      placeholder="Your Name"
                      className={`w-full border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-[#aa3fdd]/20 transition-all outline-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
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
                      placeholder="Phone Number"
                      className={`w-full border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-[#aa3fdd]/20 transition-all outline-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aa3fdd]">
                    <HelpCircle size={18} />
                  </div>
                  <select
                    disabled={isLoading}
                    className={`w-full border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-[#aa3fdd]/20 transition-all outline-none cursor-pointer appearance-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                    value={formData.queryType}
                    onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                  >
                    {queryTypes.map(type => (
                      <option key={type} value={type} className="text-black">{type}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-4 text-[#aa3fdd]">
                    <MessageSquare size={18} />
                  </div>
                  <textarea
                    required
                    disabled={isLoading}
                    placeholder="How can we help you today?"
                    className={`w-full border-none rounded-xl md:rounded-2xl py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-[#aa3fdd]/20 transition-all outline-none min-h-[120px] resize-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed ${isLight ? 'bg-black text-white hover:scale-[1.02] shadow-xl shadow-black/10' : 'bg-[#aa3fdd] text-white hover:scale-[1.02] shadow-xl shadow-[#aa3fdd]/20'}`}
                >
                  {isLoading ? (
                    <>Sending... <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>Send Query <Send size={16} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
