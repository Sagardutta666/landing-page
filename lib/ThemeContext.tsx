'use client';

import { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light";
type SplashType = "90MIN" | "PRE";
type PolicyType = "TERMS" | "PRIVACY" | "ABOUT";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isSplashLoading: boolean;
  splashType: SplashType;
  triggerSplash: (type: SplashType, duration?: number) => void;
  isPolicyOpen: boolean;
  policyType: PolicyType;
  openPolicy: (type: PolicyType, work?: SplashType) => void;
  closePolicy: () => void;
  isPartnerOpen: boolean;
  openPartner: () => void;
  closePartner: () => void;
  isContactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isSplashLoading, setIsSplashLoading] = useState(true);
  const [splashType, setSplashType] = useState<SplashType>("90MIN");
  
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [policyType, setPolicyType] = useState<PolicyType>("TERMS");

  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    // Initial load splash
    const timer = setTimeout(() => setIsSplashLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const triggerSplash = (work: SplashType = "90MIN", duration: number = 2000) => {
    setSplashType(work);
    setIsSplashLoading(true);
    setTimeout(() => {
      setIsSplashLoading(false);
    }, duration);
  };

  const openPolicy = (type: PolicyType, work: SplashType = "90MIN") => {
    setPolicyType(type);
    setSplashType(work);
    setIsSplashLoading(true);
    setTimeout(() => {
      setIsSplashLoading(false);
      setIsPolicyOpen(true);
    }, 1200);
  };

  const closePolicy = () => {
    setIsPolicyOpen(false);
  };

  const openPartner = () => {
    setIsPartnerOpen(true);
  };

  const closePartner = () => {
    setIsPartnerOpen(false);
  };

  const openContact = () => {
    setIsContactOpen(true);
  };

  const closeContact = () => {
    setIsContactOpen(false);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      isSplashLoading, 
      splashType, 
      triggerSplash,
      isPolicyOpen,
      policyType,
      openPolicy,
      closePolicy,
      isPartnerOpen,
      openPartner,
      closePartner,
      isContactOpen,
      openContact,
      closeContact
    }}>
      <div className={theme === "light" ? "light" : "dark"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
