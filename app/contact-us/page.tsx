import type { Metadata } from "next";
import { HelpCircle, Mail, Globe, Building2, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | daYummeals",
  description:
    "Get in touch with daYummeals — reach our support team for account, order, or any other queries.",
};

const CONTACT_DETAILS = [
  {
    label: "Email Us",
    value: "support@dayummeals.in",
    href: "mailto:support@dayummeals.in",
  },
  {
    label: "Visit Website",
    value: "dayummeals.in",
    href: "https://dayummeals.in",
  },
  {
    label: "Registered Entity",
    value: "Drowsy Owls LLP",
    href: null,
  },
  {
    label: "Support Hours",
    value: "Mon – Sun, 9 AM – 9 PM",
    href: null,
  },
];

function DetailIcon({ index }: { index: number }) {
  const size = 20;
  if (index === 0) return <Mail size={size} />;
  if (index === 1) return <Globe size={size} />;
  if (index === 2) return <Building2 size={size} />;
  return <Clock size={size} />;
}

export default async function ContactUsPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string }>;
}) {
  const { theme } = await searchParams;
  const isLight = theme === "light";

  return (
    <div className={isLight ? "min-h-screen bg-white text-black" : "min-h-screen bg-black text-white"}>
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-5 mb-12">
          <div className={`p-4 rounded-3xl ${isLight ? "bg-purple-50 text-purple-600" : "bg-white/5 text-purple-400"}`}>
            <HelpCircle size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic leading-[0.9]">
              Contact Us
            </h1>
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-1 ${isLight ? "text-gray-400" : "text-white/20"}`}>
              We&apos;re here to help
            </p>
          </div>
        </div>

        {/* Intro */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-black text-[#aa3fdd] mb-2 uppercase italic tracking-tighter">
            Got a question? We&apos;d love to hear from you
          </h3>
          <p className={`text-xs uppercase tracking-[0.2em] ${isLight ? "text-gray-400" : "text-white/40"}`}>
            Reach out and our support team will get back within 24 hours
          </p>
        </div>

        {/* Contact detail cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONTACT_DETAILS.map((item, index) => {
            const inner = (
              <div className={`flex items-center gap-4 p-5 rounded-3xl border h-full transition-colors ${isLight ? "bg-purple-50 border-purple-100/50 hover:border-purple-200" : "bg-white/5 border-white/10 hover:border-white/20"}`}>
                <div className={`p-3 rounded-2xl shrink-0 ${isLight ? "bg-white text-purple-600" : "bg-white/5 text-purple-400"}`}>
                  <DetailIcon index={index} />
                </div>
                <div className="min-w-0">
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isLight ? "text-gray-400" : "text-white/40"}`}>
                    {item.label}
                  </p>
                  <p className={`text-sm font-bold break-words ${isLight ? "text-black" : "text-white"}`}>
                    {item.value}
                  </p>
                </div>
              </div>
            );

            return item.href ? (
              <a key={item.label} href={item.href} className="block">
                {inner}
              </a>
            ) : (
              <div key={item.label}>{inner}</div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
