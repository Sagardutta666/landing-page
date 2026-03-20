import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });

export const metadata: Metadata = {
  title: "daYummeals - Authenticity starts here!",
  description: "Experience authentic home-cooked meals with daYummeals – your ultimate homefood destination delivering quality and taste directly from our kitchen to your door.",
  keywords: "homefood, home-cooked meals, authentic food, daYummeals, food delivery, quality food, traditional recipes, homemade, culinary, healthy eating",
  authors: [{ name: "daYummeals Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.dayummeals.in",
  },
  openGraph: {
    title: "daYummeals - Authenticity starts here!",
    description: "Enjoy authentic home-cooked meals delivered right to your door by daYummeals – where homefood meets quality and tradition.",
    url: "https://www.dayummeals.in",
    siteName: "daYummeals",
    images: "/under90_bowl.png",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "daYummeals - Authenticity starts here!",
    description: "Experience the taste of home with authentic home-cooked meals from daYummeals.",
    images: "/under90_bowl.png",
    site: "@dayummeals",
    creator: "@dayummeals",
  },
  other: {
    "language": "English",
    "revisit-after": "7 days",
    "rating": "General",
    "distribution": "global",
    "coverage": "Worldwide",
    "audience": "All",
    "target": "all",
    "classification": "Homefood, Culinary, Food Delivery",
    "designer": "daYummeals Design Team",
    "publisher": "daYummeals",
    "reply-to": "contact@dayummeals.in",
    "dc.title": "daYummeals - Authenticity starts here!",
    "dc.creator": "daYummeals Team",
    "dc.subject": "Homefood, Authentic Meals, Food Delivery",
    "dc.description": "daYummeals offers authentic home-cooked meals delivered right to your doorstep, ensuring quality and tradition in every bite.",
    "dc.publisher": "daYummeals",
    "dc.date": "2025-02-27",
    "dc.language": "en",
    "geo.region": "US-NY",
    "geo.placename": "New York",
    "geo.position": "40.7128;-74.0060",
    "ICBM": "40.7128, -74.0060",
  }
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