import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dayummeals.in"),
  title: "daYummeals - Authenticity starts here!",
  description: "Enjoy authentic home-cooked meals delivered right to your door by daYummeals – where homefood meets quality and tradition.",
  keywords: "homefood, home-cooked meals, authentic food, daYummeals, food delivery, quality food, traditional recipes, homemade, culinary, healthy eating, mom's magic, homemade food delivery",
  authors: [{ name: "daYummeals Team" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://dayummeals.in",
  },
  openGraph: {
    title: "daYummeals - Authenticity starts here!",
    description: "Enjoy authentic home-cooked meals delivered right to your door by daYummeals – where homefood meets quality and tradition.",
    url: "https://dayummeals.in",
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
    "reply-to": "support@dayummeals.in",
    "dc.title": "daYummeals - Authenticity starts here!",
    "dc.creator": "daYummeals Team",
    "dc.subject": "Homefood, Authentic Meals, Food Delivery",
    "dc.description": "daYummeals offers authentic home-cooked meals delivered right to your doorstep, ensuring quality and tradition in every bite.",
    "dc.publisher": "daYummeals",
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-8T3ZPM47P4"
        />
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8T3ZPM47P4', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
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