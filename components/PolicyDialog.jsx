'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, Shield, FileText, Info } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

const POLICIES = {
  TERMS: {
    title: "Terms and Conditions",
    icon: FileText,
    content: `
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
    `
  },
  PRIVACY: {
    title: "Privacy Policy",
    icon: Shield,
    content: `
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
    `
  },
  ABOUT: {
    title: "About Us",
    icon: Info,
    content: `
      <div class="text-center mb-8">
        <h3 class="text-xl font-black text-[#aa3fdd] mb-2 uppercase italic tracking-tighter">Welcome to daYummeals</h3>
        <p class="text-xs uppercase tracking-[0.2em] text-gray-400">Your ultimate destination for authentic, home-cooked food</p>
      </div>
      
      <p>Our mission? To connect you with talented local chefs who whip up delicious, wholesome dishes that make every bite feel like a taste of home. At <strong>daYummeals</strong>, we celebrate the rich tapestry of Indian cuisines.</p>
      
      <p>From traditional favorites to modern twists, our diverse menu offers something for every palate. Our home chefs use only the finest ingredients, crafting meals that fit your schedule and delight your taste buds.</p>
      
      <p>Enjoy the convenience of quality, homemade food without the kitchen hassle. Dive into a world where every meal is a joyous celebration of authentic, homemade goodness.</p>
      
      <div class="mt-12 pt-8 border-t border-purple-100/20 space-y-4">
        <div class="flex flex-col md:flex-row justify-between gap-4 text-[10px] font-black uppercase tracking-widest bg-purple-50 p-6 rounded-3xl border border-purple-100/50">
           <div class="space-y-1">
             <p class="text-gray-400">Licensing</p>
             <p class="text-black">FSSAI No: 21523014000649</p>
           </div>
           <div class="space-y-1">
             <p class="text-gray-400">Grievance Officer</p>
             <p class="text-black">support@dayummeals.in</p>
           </div>
        </div>
        <div class="pt-4 flex justify-center">
           <span class="px-8 py-3 bg-[#aa3fdd] text-white rounded-full font-black uppercase tracking-[0.3em] text-[9px] shadow-lg shadow-purple-200">AUTHENTICITY starts here!</span>
        </div>
      </div>
    `
  }
};

export default function PolicyDialog({ isOpen, onClose, type }) {
  const { theme } = useTheme();
  const policy = POLICIES[type] || POLICIES.TERMS;
  const isLight = theme === 'light';

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[11000]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-2xl rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-14 shadow-2xl z-[11001] border overflow-hidden ${isLight ? 'bg-[#F2F0EA] border-purple-100 text-black' : 'bg-black border-white/10 text-white'}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-10 md:mb-14">
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-3xl ${isLight ? 'bg-white shadow-sm text-purple-600' : 'bg-white/5 text-purple-400'}`}>
                  <policy.icon size={28} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase italic leading-[0.9]">{policy.title}</h2>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isLight ? 'text-gray-400' : 'text-white/20'}`}>daYummeals Legal</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isLight ? 'bg-white hover:bg-gray-100 shadow-sm' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div 
              data-lenis-prevent
              className={`overflow-y-auto max-h-[55vh] md:max-h-[50vh] pr-6 custom-scrollbar ${isLight ? 'prose prose-purple' : 'prose prose-invert'} max-w-none text-sm md:text-base`}
            >
              <div 
                dangerouslySetInnerHTML={{ __html: policy.content }} 
                className="space-y-6 font-light leading-relaxed opacity-80"
              />
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
