import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | daYummeals",
  description:
    "Terms and Conditions for daYummeals — the rules governing your use of our website and app.",
};

const TERMS_CONTENT = `
  <p><span><span><span><span><span><span>Last updated on July 21, 2024</span></span></span></span></span></span></p>
  <p>Any Capitalised terms used but not defined herein shall have the meaning assigned to them under the Terms of Use which govern your use of our website www.dayummeals.in (the “Website”) and our ‘daYummeals’ application for mobile and handheld devices (the “App”). The Website and the App are jointly referred to as the “Platform”.</p>
  <p>The terms and conditions are applicable to all the existing and future users accessing and/or using services of the “Platform” daYummeals via <a href="http://www.dayummeals.in">www.dayummeals.in</a> (the “Website”). Do read the terms carefully.</p>
  <p>If any user's activity on the Platform doesn't match up to these Terms and Conditions, we (Drowsy Owls LLP) reserve the right to take all the necessary action. This could include altering or deleting users reviews or comments, restricting users review activity or deleting your daYummeals account altogether, with or without prior notice to the user.</p>
  <p>Do let us know, if you find any user activity or content that does not meet the terms and conditions described here. We will review the reports and take necessary actions, however due to the diverse nature of our community it is possible that content disagreeable to you might not meet the criteria for the action to be taken from our side.</p>
  <h3>Terms of service.</h3>
  <p>The customer / buyer agrees and acknowledges that Drowsy Owls LLP shall not be responsible for:</p>
  <ol>
    <li>The services or goods provided by the Kitchen owners including but not limited to serving of food Orders suiting your requirements and taste;</li>
    <li>The Kitchen owner's services or goods not being up to the customer’s expectations or leading to any loss, harm or damage to him/her;</li>
    <li>The state of availability of certain items on the menu;</li>
    <li>The Kitchen owners serving the incorrect Orders; or</li>
    <li>Product liability of goods provided by the Kitchen owners.</li>
    <li>Liability caused by the Delivery Partners while providing services.</li>
    <li>Differences in price list available on the platform with respect to the services provided by the Kitchen other than the daYummeals platform.</li>
  </ol>
  <p>The customer / buyer / Kitchen account holders agree that they will not use the platform that is unlawful or prohibited by these terms or against the law of the country.</p>
  <h3>Definitions</h3>
  <ul>
    <li>"Platform" refers to the Website or App.</li>
    <li>"Kitchen" refers to the home chefs running home kitchens registered on the platform.</li>
    <li>"User" or "Customer" refers to any person who accesses or uses the Platform.</li>
    <li>"Services" refers to any services provided by daYummeals or the Kitchens.</li>
    <li>"Delivery Partners" refers to any third-party service providers who deliver orders from Kitchens to Customers.</li>
  </ul>
  <h3>Services</h3>
  <p>daYummeals acts as a marketplace for Kitchens to sell their home-cooked meals. The services or goods provided by the Kitchens, including but not limited to serving of food Orders, are solely the responsibility of the Kitchens.</p>
  <h3>Limitation of Liability</h3>
  <p>Under no circumstances, including negligence, shall Drowsy Owls LLP, or any of its directors, officers, employees or agents, be liable for any indirect, incidental, special or consequential damages that result from the use of, or the inability to use, the Platform, even if Drowsy Owls LLP has been advised of the possibility of such damages.</p>
  <h3>Pricing and Payments</h3>
  <p>The total cost of an order will include the cost of the food, delivery service charge, a platform fee charged by daYummeals, GST, and other applicable taxes and charges. The platform fee is currently set at INR 2, but may be subject to change in the future.</p>
  <p>All prices listed on the Platform are subject to change without prior notice. The prices are inclusive of applicable taxes as per the Goods and Services Tax (GST) law of the Republic of India. The platform fee, delivery fee, GST, and other taxes and charges will be added to the order total along with the product cost. The customer is required to pay these charges while making a payment. All payments on the Platform are to be made using the available payment methods.</p>
  <h3>Indemnity</h3>
  <p>You agree to defend, indemnify and hold Drowsy Owls LLP and its affiliates, directors, officers, employees and agents harmless from any and all claims, liabilities, costs and expenses, including attorneys' fees, arising in any way from your use of the Platform, your placement or transmission of any message, content, information, software or other materials through the Platform, or your breach or violation of the law or of these Terms and Conditions.</p>
  <h3>Changes to the Terms and Conditions</h3>
  <p>Drowsy Owls LLP reserves the right to modify these Terms and Conditions at any time. Changes will be effective as soon as they are posted on the Website.</p>
  <h3>Delivery Services</h3>
  <p>The cost of delivery services, provided by our third-party partners, is charged directly to the customer and is included in the total order cost. daYummeals is not liable for any issues, damages, or non-delivery instances that may occur during the delivery process.</p>
  <h3>Cancellation and Refund Policy</h3>
  <p>Once an order is placed by the Customer, it cannot be cancelled due to the nature of the services provided by the Kitchens. However, we at Drowsy Owls LLP and our home kitchens reserve the right to cancel an order due to unavoidable circumstances. In such an event, a full refund will be processed for the order paid.</p>
  <h3>Data Protection</h3>
  <p>The protection of your personal data is important to us. We adhere to the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, among other relevant laws of India, in order to ensure your data is handled responsibly.</p>
`;

export default async function TermsAndConditionsPage({
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
            <FileText size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic leading-[0.9]">
              Terms &amp; Conditions
            </h1>
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-1 ${isLight ? "text-gray-400" : "text-white/20"}`}>
              daYummeals Legal
            </p>
          </div>
        </div>

        <div
          className={`prose max-w-none text-sm md:text-base space-y-6 font-light leading-relaxed opacity-80 ${isLight ? "prose-purple" : "prose-invert"}`}
          dangerouslySetInnerHTML={{ __html: TERMS_CONTENT }}
        />
      </div>
    </div>
  );
}
