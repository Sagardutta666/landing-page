import type { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | daYummeals",
  description:
    "Privacy Policy for daYummeals — how we collect, use, and protect your personal data.",
};

const PRIVACY_CONTENT = `
  <p dir="ltr"><span>Last updated on July 21, 2024</span></p>
  <p>daYummeals ("we", "our", "us") operates the website https://dayummeals.in/ (the "Site"). This privacy policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Site and the choices you have associated with that data.</p>
  <h3>1. Types of Personal Data Collected</h3>
  <p>We collect various types of personal data for different purposes to provide and improve our service to you. This personal data includes:</p>
  <ul>
    <li>Name, Mobile number</li>
    <li>Email address, Phone number</li>
    <li>Address, Payment information</li>
  </ul>
  <h3>2. Methods of Data Collection</h3>
  <p>We collect personal data through the following methods:</p>
  <ul>
    <li>Forms on our website</li>
    <li>Cookies</li>
    <li>Third-party services such as Google Analytics</li>
  </ul>
  <h3>3. Purpose of Data Collection</h3>
  <p>The personal data we collect is used for the following purposes:</p>
  <ul>
    <li>Processing orders to share with home chefs</li>
    <li>Sending notifications</li>
    <li>Improving our services</li>
    <li>Marketing and promotional purposes</li>
  </ul>
  <h3>4. Data Sharing</h3>
  <p>To efficiently deliver our services, we may share your personal data with:</p>
  <ul>
    <li>Kitchens (home chefs) to prepare your meals</li>
    <li>Third-party delivery services to deliver your orders</li>
  </ul>
  <h3>5. Data Storage and Security</h3>
  <p>User data is stored on secured servers and access is password-protected to ensure the security and confidentiality of your personal information.</p>
  <h3>6. User Rights</h3>
  <p>Users have the right to access and modify their personal data. However, users do not have the right to delete their data from our records.</p>
  <h3>7. Cookies and Tracking</h3>
  <p>We use cookies and similar tracking technologies to track activity on our Site and hold certain information. The tracking technologies used include Google Analytics 4.</p>
`;

export default async function PrivacyPolicyPage({
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
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic leading-[0.9]">
              Privacy Policy
            </h1>
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-1 ${isLight ? "text-gray-400" : "text-white/20"}`}>
              daYummeals Legal
            </p>
          </div>
        </div>

        <div
          className={`prose max-w-none text-sm md:text-base space-y-6 font-light leading-relaxed opacity-80 ${isLight ? "prose-purple" : "prose-invert"}`}
          dangerouslySetInnerHTML={{ __html: PRIVACY_CONTENT }}
        />
      </div>
    </div>
  );
}
