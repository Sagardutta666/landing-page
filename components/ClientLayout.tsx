"use client";

import BrandLogo from "@/components/BrandLogo";
import Dialogbox from "@/components/Dialogbox";
import Navbar from "@/components/Navbar";
import GrainOverlay from "@/components/GrainOverlay";
import FloatingPremiumAction from "@/components/FloatingPremiumAction";
import Splash from "@/components/Splash";
import PolicyDialog from "@/components/PolicyDialog";
import PartnerDialog from "@/components/PartnerDialog";
import ContactDialog from "@/components/ContactDialog";
import ChefRegistrationDialog from "@/components/ChefRegistrationDialog";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";
import { ReactLenis } from 'lenis/react'

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { 
    theme, 
    isSplashLoading, 
    splashType, 
    isPolicyOpen, 
    policyType, 
    closePolicy,
    isPartnerOpen,
    closePartner,
    isContactOpen,
    closeContact,
    isChefDialogOpen,
    closeChef,
    isOrderNowOpen,
    openOrderNow,
    closeOrderNow
  } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'light' ? 'bg-[#F2F0EA] text-[#1A1A1A]' : 'bg-black text-white'}`}>
      <AnimatePresence mode="wait">
        {isSplashLoading && (
          <Splash theme={theme} type={splashType} key="splash" />
        )}
      </AnimatePresence>

      <GrainOverlay />
      {!isSplashLoading && <Navbar />}
      
      <motion.div 
        key="main-layout"
        className="flex flex-col min-h-screen relative transform-gpu will-change-transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSplashLoading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <main className="flex-1">
          {children}
        </main>
      </motion.div>

      {!isSplashLoading && (
        <FloatingPremiumAction 
          isOpen={isOrderNowOpen} 
          onClick={isOrderNowOpen ? closeOrderNow : openOrderNow} 
        />
      )}

      <AnimatePresence>
        {isOrderNowOpen && (
          <Dialogbox key="order-dialog" open={isOrderNowOpen} onClose={closeOrderNow} />
        )}
        {isPolicyOpen && (
          <PolicyDialog key="policy-dialog" isOpen={isPolicyOpen} type={policyType} onClose={closePolicy} />
        )}
        {isPartnerOpen && (
          <PartnerDialog key="partner-dialog" isOpen={isPartnerOpen} onClose={closePartner} />
        )}
        {isContactOpen && (
          <ContactDialog key="contact-dialog" isOpen={isContactOpen} onClose={closeContact} />
        )}
        {isChefDialogOpen && (
          <ChefRegistrationDialog key="chef-dialog" isOpen={isChefDialogOpen} onClose={closeChef} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </ReactLenis>
    </ThemeProvider>
  );
}
