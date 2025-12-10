import Link from "next/link";
import { Search, ShoppingCart, CircleUser, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8">
        <Link href="/" className="font-oswald font-bold text-3xl tracking-tight uppercase">
          SHOP-CART
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-black">
          <Link href="#" className="flex items-center gap-1">Shop <ChevronDown size={16}/></Link>
          <Link href="#">On Sale</Link>
          <Link href="#">New Arrivals</Link>
          <Link href="#">Brands</Link>
        </div>

        <div className="flex-1 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="w-full bg-[#F0F0F0] rounded-full py-3 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-black/10"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Search className="md:hidden" size={24} />
          <Link href="#"><ShoppingCart size={24} /></Link>
          <Link href="#"><CircleUser size={24} /></Link>
        </div>
      </div>
    </nav>
  );
}