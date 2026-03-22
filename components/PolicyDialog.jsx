'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, Shield, FileText, Info } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

const POLICIES = {
  TERMS: {
    title: "Terms & Conditions",
    icon: FileText,
    content: `
      <p><strong>Last updated on July 21, 2024</strong></p>
      <p>Any Capitalised terms used but not defined herein shall have the meaning assigned to them under the Terms of Use which govern your use of our website www.dayummeals.in (the “Website”) and our ‘daYummeals’ application for mobile and handheld devices (the “App”). The Website and the App are jointly referred to as the “Platform”.</p>
      <p>The terms and conditions are applicable to all the existing and future users accessing and/or using services of the “Platform” daYummeals via <a href="http://www.dayummeals.in">www.dayummeals.in</a>. Do read the terms carefully.</p>
      <p>If any user's activity on the Platform doesn't match up to these Terms and Conditions, we (Drowsy Owls LLP) reserve the right to take all the necessary action. This could include altering or deleting users reviews or comments, restricting users review activity or deleting your daYummeals account altogether, with or without prior notice to the user.</p>
      
      <h3>1. Terms of Service</h3>
      <p>The customer / buyer agrees and acknowledges that Drowsy Owls LLP shall not be responsible for:</p>
      <ul>
        <li>The services or goods provided by the Kitchen owners including but not limited to serving of food orders suiting your requirements and taste.</li>
        <li>The Kitchen owner's services or goods not being up to the customer’s expectations or leading to any loss, harm or damage.</li>
        <li>The state of availability of certain items on the menu.</li>
        <li>The Kitchen owners serving the incorrect orders.</li>
        <li>Product liability of goods provided by the Kitchen owners.</li>
        <li>Liability caused by the Delivery Partners while providing services.</li>
      </ul>

      <h3>2. Definitions</h3>
      <ul>
        <li>"Platform" refers to the Website or App.</li>
        <li>"Kitchen" refers to the home chefs running home kitchens registered on the platform.</li>
        <li>"User" refers to any person who accesses or uses the Platform.</li>
      </ul>

      <h3>3. Pricing and Payments</h3>
      <p>The total cost of an order will include the cost of the food, delivery service charge, a platform fee charged by daYummeals, GST, and other applicable taxes. The platform fee is currently set at INR 2.</p>
      
      <h3>4. Cancellation and Refund Policy</h3>
      <p>Once an order is placed, it cannot be cancelled due to the perishable nature of home-cooked meals. However, we reserve the right to cancel an order due to unavoidable circumstances, in which case a full refund will be processed.</p>
    `
  },
  PRIVACY: {
    title: "Privacy Policy",
    icon: Shield,
    content: `
      <p><strong>Last updated on July 21, 2024</strong></p>
      <p>daYummeals ("we", "our", "us") operates the website https://dayummeals.in/ (the "Site"). This privacy policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Site.</p>
      
      <h3>1. Types of Personal Data Collected</h3>
      <ul>
        <li>Name, Mobile number, Email address</li>
        <li>Phone number, Delivery Address</li>
        <li>Payment information</li>
      </ul>

      <h3>2. Methods of Data Collection</h3>
      <p>We collect data through forms on our website, cookies, and third-party services like Google Analytics.</p>

      <h3>3. Purpose of Data Collection</h3>
      <ul>
        <li>Processing orders to share with home chefs</li>
        <li>Sending order notifications</li>
        <li>Improving our services and marketing</li>
      </ul>

      <h3>4. Data Sharing</h3>
      <p>We share data with Kitchens (home chefs) to prepare your meals and third-party delivery services to fulfill your orders.</p>

      <h3>5. Data Storage and Security</h3>
      <p>User data is stored on secured servers and access is password-protected to ensure the security and confidentiality of your personal information.</p>
    `
  },
  ABOUT: {
    title: "About Us",
    icon: Info,
    content: `
      <h3>Our Mission</h3>
      <p>daYummeals is on a mission to bring back the authenticity of home-cooked food. We bridge the gap between talented neighborhood home-chefs and food lovers who crave healthy, soulful meals.</p>
      
      <h3>How it Works</h3>
      <p>We partner with local moms and home-chefs who cook with love. Every meal is prepared fresh in a real home kitchen, ensuring the highest standards of hygiene and taste.</p>

      <h3>Community First</h3>
      <p>By ordering from daYummeals, you are supporting local micro-entrepreneurs and preserving traditional recipes that have been passed down through generations.</p>
    `
  }
};

export default function PolicyDialog({ isOpen, onClose, type }) {
  const { theme } = useTheme();
  const policy = POLICIES[type] || POLICIES.TERMS;
  const isLight = theme === 'light';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[11000]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-2xl rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-12 shadow-2xl z-[11001] border overflow-hidden ${isLight ? 'bg-[#F2F0EA] border-purple-100 text-black' : 'bg-black border-white/10 text-white'}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8 md:mb-12">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${isLight ? 'bg-white shadow-sm text-purple-600' : 'bg-white/5 text-purple-400'}`}>
                  <policy.icon size={24} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic">{policy.title}</h2>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? 'text-gray-400' : 'text-white/20'}`}>daYummeals Legal</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isLight ? 'bg-white hover:bg-gray-100' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div 
              data-lenis-prevent
              className={`overflow-y-auto max-h-[60vh] md:max-h-[50vh] pr-4 custom-scrollbar prose prose-sm md:prose-base ${isLight ? 'prose-purple' : 'prose-invert'}`}
            >
              <div 
                dangerouslySetInnerHTML={{ __html: policy.content }} 
                className="space-y-4 font-light leading-relaxed"
              />
            </div>

            {/* Footer */}
            <div className="mt-8 md:mt-12 flex justify-center">
              <button 
                onClick={onClose}
                className={`px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-all ${isLight ? 'bg-black text-white hover:scale-105' : 'bg-white text-black hover:scale-105'}`}
              >
                Got it
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
