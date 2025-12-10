"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {  Package, Heart, Settings, LogOut, 
  ChevronRight, CreditCard, MapPin, Camera, 
  Trophy, Clock, ChevronDown, 
  User
} from "lucide-react";
import Footer from "@/app/components/Footer"; 
import axios from "axios";
import { UserModel } from "../components/NavBar";


const MOCK_USER = {
  avatar: "/placeholder-avatar.jpg",
  joinDate: "August 2022",
  points: 2450,
  tier: "Gold Member"
};

const MOCK_ORDERS = [
  {
    id: "#ORD-7782",
    date: "Oct 12, 2023",
    status: "Delivered",
    total: 345.00,
    items: ["Gradient Graphic T-shirt", "Skinny Fit Jeans"]
  },
  {
    id: "#ORD-7783",
    date: "Oct 24, 2023",
    status: "Processing",
    total: 180.00,
    items: ["Polo with Tipping Details"]
  }
];


const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Delivered: "bg-green-100 text-green-600",
    Processing: "bg-yellow-100 text-yellow-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  // @ts-ignore
  const activeStyle = styles[status] || "bg-gray-100 text-gray-600";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${activeStyle}`}>
      {status}
    </span>
  );
};

export default function ProfilePage() {


  const [activeTab, setActiveTab] = useState("orders");
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const menuItems = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "address", label: "Address Book", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  return (
    <main className="bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        
        <div className="flex items-center gap-2 text-sm text-gray-500 py-6">
          <Link href="/">Home</Link> <ChevronRight size={16} />
          <span className="text-black font-medium">Account</span>
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-8 mt-4">
          
          <aside className="space-y-6">

            <div className="flex items-center gap-4 px-2">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <User size={24} />
                </div>
              </div>
              <div>
                {user && <div>
                     <h3 className="font-bold text-lg leading-tight">{user.email}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                     </div>}
               
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id 
                      ? "bg-black text-white shadow-lg shadow-gray-200" 
                      : "bg-white text-gray-500 hover:bg-[#F0F0F0] hover:text-black"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                <button className="w-full flex items-center gap-3 px-5 py-3 rounded-full text-sm font-medium text-red-500 hover:bg-red-50 transition">
                    <LogOut size={18} />
                    Log Out
                </button>
              </div>
            </nav>
          </aside>


         
          <section className="space-y-8">
            
        
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                {user &&  <div>
                  <h1 className="font-oswald font-black text-3xl uppercase mb-2">My Dashboard</h1>
                  <p className="text-gray-500 text-sm">Welcome back, {user.email}!</p>
               </div>}
              
               <button className="text-sm font-medium border-b border-black pb-0.5 hover:opacity-70">
                 Edit Profile
               </button>
            </div>

        
            <div className="grid md:grid-cols-3 gap-4">
              
                <div className="md:col-span-2 bg-black rounded-[20px] p-6 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full -mr-10 -mt-10 opacity-50 blur-2xl group-hover:bg-gray-700 transition"></div>
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Member Status</p>
                            <h2 className="font-oswald text-2xl uppercase tracking-wide text-yellow-500 flex items-center gap-2">
                                <Trophy size={20} className="fill-yellow-500"/> {MOCK_USER.tier}
                            </h2>
                        </div>
                        <div className="text-right">
                             <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Points</p>
                             <span className="font-bold text-3xl">{MOCK_USER.points}</span>
                        </div>
                    </div>

                    <div className="mt-8 relative z-10">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                            <span>Current</span>
                            <span>Next Tier: Platinum</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-[75%] rounded-full"></div>
                        </div>
                    </div>
                </div>

             
                <div className="border border-gray-200 rounded-[20px] p-6 flex flex-col justify-center gap-1">
                    <div className="w-10 h-10 bg-[#F0EEED] rounded-full flex items-center justify-center mb-2">
                        <Package size={20}/>
                    </div>
                    <span className="font-bold text-3xl">12</span>
                    <span className="text-gray-500 text-sm">Total Orders</span>
                </div>
            </div>

           
            <div className="min-h-[400px]">
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                             <h3 className="font-bold text-xl">Recent Orders</h3>
                             <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                                <span>Filter</span> <ChevronDown size={14} />
                             </div>
                        </div>

                     
                        <div className="space-y-4">
                            {MOCK_ORDERS.map((order, i) => (
                                <div key={i} className="border border-gray-200 rounded-[20px] p-6 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b border-gray-100 pb-4">
                                        <div>
                                            <p className="text-sm font-bold text-black">{order.id}</p>
                                            <p className="text-xs text-gray-500 mt-1">Ordered on {order.date}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <StatusBadge status={order.status} />
                                            <span className="font-bold">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <div className="flex -space-x-3">
                                            {order.items.map((_, idx) => (
                                                <div key={idx} className="w-12 h-12 rounded-full border-2 border-white bg-[#F0EEED] flex items-center justify-center text-[8px] text-gray-400 overflow-hidden">
                                                    Img
                                                </div>
                                            ))}
                                            {order.items.length > 2 && (
                                                <div className="w-12 h-12 rounded-full border-2 border-white bg-black text-white flex items-center justify-center text-xs font-medium">
                                                    +2
                                                </div>
                                            )}
                                        </div>
                                        <button className="px-6 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-black hover:text-white transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'wishlist' && (
                    <div>
                        <h3 className="font-bold text-xl mb-6">My Wishlist (4)</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1,2,3,4].map((item) => (
                                <div key={item} className="group cursor-pointer">
                                    <div className="aspect-square bg-[#F0EEED] rounded-[20px] mb-3 relative overflow-hidden">
                                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-red-500">
                                            <Heart size={16} fill="currentColor" />
                                        </button>
                                    </div>
                                    <h4 className="font-bold text-sm">Gradient Graphic T-shirt</h4>
                                    <p className="font-bold text-lg mt-1">$145</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                     <div className="max-w-xl">
                        <h3 className="font-bold text-xl mb-6">Personal Details</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                                    <input type="text" defaultValue="Alex" className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                                    <input type="text" defaultValue="Doe" className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                                <input type="email" defaultValue="alex.doe@example.com" className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                            </div>
                            <div className="pt-4">
                                <button type="button" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                     </div>
                )}
            </div>

          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}