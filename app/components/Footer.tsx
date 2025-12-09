import { Mail, Twitter, Facebook, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] mt-20 pt-10 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="bg-black rounded-[20px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative -top-24 mb-[-60px]">
          <h2 className="font-oswald text-white text-3xl md:text-4xl font-bold uppercase max-w-lg leading-tight">
            Stay upto date about our latest offers
          </h2>
          <div className="w-full md:w-auto flex flex-col gap-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full md:w-80 py-3 pl-12 pr-4 rounded-full bg-white text-black outline-none"
              />
            </div>
            <button className="w-full md:w-80 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition">
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-gray-300">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-oswald font-bold text-3xl uppercase mb-4">SHOP.CO</h3>
            <p className="text-sm text-gray-600 mb-6">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer"><Twitter size={16}/></div>
              <div className="w-8 h-8 bg-black text-white border rounded-full flex items-center justify-center cursor-pointer"><Facebook size={16}/></div>
              <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer"><Instagram size={16}/></div>
              <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer"><Github size={16}/></div>
            </div>
          </div>
          
          {[
            { title: "COMPANY", links: ["About", "Features", "Works", "Career"] },
            { title: "HELP", links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"] },
            { title: "FAQ", links: ["Account", "Manage Deliveries", "Orders", "Payments"] },
            { title: "RESOURCES", links: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"] },
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold tracking-widest uppercase mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                {section.links.map((link) => (
                  <li key={link}><a href="#" className="hover:underline">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

    
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>shop-cart © 2000-2027, All Rights Reserved</p>
          <div className="flex gap-2">
             {/* Payment badges placeholders */}
             <div className="w-10 h-6 bg-white border rounded shadow-sm"></div>
             <div className="w-10 h-6 bg-white border rounded shadow-sm"></div>
             <div className="w-10 h-6 bg-white border rounded shadow-sm"></div>
             <div className="w-10 h-6 bg-white border rounded shadow-sm"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}