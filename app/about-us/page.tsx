import type { Metadata } from "next";
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | daYummeals",
  description:
    "About daYummeals — your destination for authentic, home-cooked food from talented local chefs.",
};

export default async function AboutUsPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string }>;
}) {
  const { theme } = await searchParams;
  const isLight = theme === "light";

  return (
    <div className={isLight ? "min-h-screen bg-white text-black" : "min-h-screen bg-black text-white"}>
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-3xl">
        <div className="flex items-center gap-5 mb-12">
          <div className={`p-4 rounded-3xl ${isLight ? "bg-purple-50 text-purple-600" : "bg-white/5 text-purple-400"}`}>
            <Info size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic leading-[0.9]">
              About Us
            </h1>
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-1 ${isLight ? "text-gray-400" : "text-white/20"}`}>
              daYummeals Legal
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-black text-[#aa3fdd] mb-2 uppercase italic tracking-tighter">
            Welcome to daYummeals
          </h3>
          <p className={`text-xs uppercase tracking-[0.2em] ${isLight ? "text-gray-400" : "text-white/40"}`}>
            Your ultimate destination for authentic, home-cooked food
          </p>
        </div>

        <div className={`space-y-6 font-light leading-relaxed text-sm md:text-base ${isLight ? "text-black/80" : "text-white/80"}`}>
          <p>
            Our mission? To connect you with talented local chefs who whip up delicious, wholesome
            dishes that make every bite feel like a taste of home. At <strong>daYummeals</strong>, we
            celebrate the rich tapestry of Indian cuisines.
          </p>
          <p>
            From traditional favorites to modern twists, our diverse menu offers something for every
            palate. Our home chefs use only the finest ingredients, crafting meals that fit your
            schedule and delight your taste buds.
          </p>
          <p>
            Enjoy the convenience of quality, homemade food without the kitchen hassle. Dive into a
            world where every meal is a joyous celebration of authentic, homemade goodness.
          </p>
        </div>

        <div className={`mt-12 pt-8 border-t space-y-4 ${isLight ? "border-purple-100" : "border-white/10"}`}>
          <div className={`flex flex-col md:flex-row justify-between gap-4 text-[10px] font-black uppercase tracking-widest p-6 rounded-3xl border ${isLight ? "bg-purple-50 border-purple-100/50" : "bg-white/5 border-white/10"}`}>
            <div className="space-y-1">
              <p className={isLight ? "text-gray-400" : "text-white/40"}>Licensing</p>
              <p className={isLight ? "text-black" : "text-white"}>FSSAI No: 21523014000649</p>
            </div>
            <div className="space-y-1">
              <p className={isLight ? "text-gray-400" : "text-white/40"}>Grievance Officer</p>
              <p className={isLight ? "text-black" : "text-white"}>support@dayummeals.in</p>
            </div>
          </div>
          <div className="pt-4 flex justify-center">
            <span className="px-8 py-3 bg-[#aa3fdd] text-white rounded-full font-black uppercase tracking-[0.3em] text-[9px] shadow-lg shadow-purple-200">
              AUTHENTICITY starts here!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
