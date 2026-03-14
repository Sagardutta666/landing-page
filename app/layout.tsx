import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });

export const metadata: Metadata = {
  title: "DaYumMeals | Delicious Meals Delivered",
  description: "Experience the fusion of taste and health with DaYumMeals. Explore our menu and plan your next meal with ease.",
  keywords: ["meals", "food delivery", "healthy eating", "gourmet", "dayummeals"],
  authors: [{ name: "DaYumMeals Team" }],
  openGraph: {
    title: "DaYumMeals | Delicious Meals Delivered",
    description: "Experience the fusion of taste and health with DaYumMeals.",
    url: "https://dayummeals.com",
    siteName: "DaYumMeals",
    images: [
      {
        url: "/homescreen.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DaYumMeals | Delicious Meals Delivered",
    description: "Experience the fusion of taste and health with DaYumMeals.",
    images: ["/homescreen.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} font-archivo antialiased bg-black text-white`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}