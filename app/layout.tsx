import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Archivo, Archivo_Black } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const archivoBlack = Archivo_Black({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-archivo-black" 
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dayummeals.in"),
  title: "daYummeals - Authentic Home-Cooked Meals in Mumbai & Thane",
  description: "Experience the art of eating with authentic home-cooked meals delivered in under 90 minutes across Mumbai, Thane, and Navi Mumbai. Mom's magic, delivered fresh.",
  keywords: "homefood, home-cooked meals, authentic food, daYummeals, food delivery Mumbai, food delivery Thane, quality food, traditional recipes, homemade, culinary, healthy eating, mom's magic, homemade food delivery Mumbai, authentic Indian meals, healthy tiffin service Thane, neighborhood home chefs Mumbai, express food delivery Maharashtra, Puran Poli, Biryani, Dal Tadka, Roti, Sabzi, authentic Maharashtrian food, home cooked food Navi Mumbai, Andheri, Bandra, Borivali, Thane West",
  authors: [{ name: "daYummeals Team" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://dayummeals.in",
    languages: {
      'en-US': 'https://dayummeals.in',
    },
  },
  openGraph: {
    title: "daYummeals - Authenticity starts here!",
    description: "Enjoy authentic home-cooked meals delivered right to your door by daYummeals – where homefood meets quality and tradition.",
    url: "https://dayummeals.in",
    siteName: "daYummeals",
    images: [
      {
        url: "/under90_bowl.png",
        width: 1200,
        height: 630,
        alt: "daYummeals - Authenticity starts here!",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "daYummeals - Authenticity starts here!",
    description: "Experience the taste of home with authentic home-cooked meals from daYummeals.",
    images: ["/under90_bowl.png"],
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
    "geo.region": "IN-MH",
    "geo.placename": "Mumbai, Thane",
  },
  icons: {
    icon: "/app_logo.jpg",
    apple: "/app_logo.jpg",
  },
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
        {/* Structured Data (JSON-LD) for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodService",
              "name": "daYummeals",
              "url": "https://dayummeals.in",
              "logo": "https://dayummeals.in/app_logo.jpg",
              "image": "https://dayummeals.in/under90_bowl.png",
              "description": "Authentic home-cooked meals delivered in under 90 minutes. Experience the art of eating real food crafted with love by local moms.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mumbai, Thane",
                "addressRegion": "MH",
                "addressCountry": "IN"
              },
              "areaServed": [
                { "@type": "City", "name": "Mumbai" },
                { "@type": "City", "name": "Thane" },
                { "@type": "City", "name": "Navi Mumbai" }
              ],
              "provider": {
                "@type": "Organization",
                "name": "daYummeals",
                "sameAs": [
                  "https://www.instagram.com/dayummeals/",
                  "https://x.com/dayummeals",
                  "https://m.facebook.com/61567845624373/"
                ]
              },
              "potentialAction": {
                "@type": "OrderAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://play.google.com/store/apps/details?id=com.dayummeals.androidapp",
                  "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/AndroidPlatform"
                  ]
                },
                "deliveryMethod": ["http://schema.org/OnSitePickup", "http://schema.org/DeliveryMode"]
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${archivoBlack.variable} font-archivo antialiased bg-black text-white`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}