'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Building2, User, Phone, FileText, Calendar, MapPin, Globe, MessageSquare, Send, Loader2 } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function PartnerDialog({ isOpen, onClose }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    fssai: "",
    operatingSince: "",
    address: "",
    region: "",
    socialMedia: "",
    comments: ""
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
          sheetName: 'Kitchen_Partners',
          formData: {
            ...formData,
            timestamp: new Date().toLocaleString()
          }
        })
      });

      console.log("Partner Application Submitted:", formData);
      setSubmitted(true);
      setIsLoading(false);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({
          businessName: "", ownerName: "", phone: "", fssai: "", operatingSince: "", address: "", region: "", socialMedia: "", comments: ""
        });
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setIsLoading(false);
    }
  };

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
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-2xl rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 shadow-2xl z-[12001] border overflow-y-auto max-h-[90vh] ${isLight ? 'bg-[#F2F0EA] border-purple-100 text-black' : 'bg-black border-white/10 text-white'}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8 md:mb-12">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${isLight ? 'bg-white shadow-sm text-purple-600' : 'bg-white/5 text-purple-400'}`}>
                  <Building2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic">Partner With Us</h2>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? 'text-gray-400' : 'text-white/20'}`}>Grow your kitchen</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isLight ? 'bg-white hover:bg-gray-100' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center space-y-4"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-black italic uppercase italic">Application Received!</h3>
                <p className="opacity-60 max-w-xs mx-auto text-sm">Our team will review your kitchen details and get back to you within 48 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Business Name */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500">
                      <Building2 size={18} />
                    </div>
                    <input
                      required
                      disabled={isLoading}
                      type="text"
                      placeholder="Business Name*"
                      className={`w-full border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/20 transition-all outline-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    />
                  </div>
                  {/* Owner Name */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500">
                      <User size={18} />
                    </div>
                    <input
                      required
                      disabled={isLoading}
                      type="text"
                      placeholder="Owner Name*"
                      className={`w-full border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/20 transition-all outline-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Phone */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500">
                      <Phone size={18} />
                    </div>
                    <input
                      required
                      disabled={isLoading}
                      type="tel"
                      placeholder="Phone Number*"
                      className={`w-full border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/20 transition-all outline-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  {/* FSSAI */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500">
                      <FileText size={18} />
                    </div>
                    <input
                      disabled={isLoading}
                      type="text"
                      placeholder="FSSAI Number (Optional)"
                      className={`w-full border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/20 transition-all outline-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                      value={formData.fssai}
                      onChange={(e) => setFormData({ ...formData, fssai: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Operating Since */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500">
                      <Calendar size={18} />
                    </div>
                    <input
                      disabled={isLoading}
                      type="text"
                      placeholder="Operating Since (Optional)"
                      className={`w-full border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/20 transition-all outline-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                      value={formData.operatingSince}
                      onChange={(e) => setFormData({ ...formData, operatingSince: e.target.value })}
                    />
                  </div>
                  {/* Region */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500">
                      <MapPin size={18} />
                    </div>
                    <input
                      required
                      disabled={isLoading}
                      type="text"
                      placeholder="Region/Area*"
                      className={`w-full border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/20 transition-all outline-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="relative">
                  <div className="absolute left-4 top-4 text-purple-500">
                    <MapPin size={18} />
                  </div>
                  <textarea
                    required
                    disabled={isLoading}
                    placeholder="Full Address*"
                    className={`w-full border-none rounded-xl md:rounded-2xl py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/20 transition-all outline-none min-h-[100px] resize-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                {/* Social Media */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500">
                    <Globe size={18} />
                  </div>
                  <input
                    disabled={isLoading}
                    type="text"
                    placeholder="Social Media Links (Optional)"
                    className={`w-full border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/20 transition-all outline-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                    value={formData.socialMedia}
                    onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                  />
                </div>

                {/* Comments */}
                <div className="relative">
                  <div className="absolute left-4 top-4 text-purple-500">
                    <MessageSquare size={18} />
                  </div>
                  <textarea
                    disabled={isLoading}
                    placeholder="Comments (Optional)"
                    className={`w-full border-none rounded-xl md:rounded-2xl py-4 pl-12 pr-4 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/20 transition-all outline-none min-h-[100px] resize-none disabled:opacity-50 ${isLight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className={`px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs transition-all flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed ${isLight ? 'bg-black text-white hover:scale-105 shadow-xl shadow-black/10' : 'bg-white text-black hover:scale-105 shadow-xl shadow-white/10'}`}
                  >
                    {isLoading ? (
                      <>Submitting... <Loader2 size={16} className="animate-spin" /></>
                    ) : (
                      <>Submit Application <Send size={16} /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
