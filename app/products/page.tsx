"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  ChevronUp, 
  ChevronDown, 
  SlidersHorizontal, 
  Check, 
  Star, 
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import Footer from "../components/Footer";


const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-yellow-400 mb-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < Math.floor(rating) ? "fill-yellow-400" : "fill-transparent text-gray-300"}`}
      />
    ))}
    <span className="text-sm text-black ml-1 font-normal">{rating}/5</span>
  </div>
);


const ProductCard = ({ title, price, discountPrice, discountPercent, rating, image }: any) => {
  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
      <div className="aspect-[1/1.1] bg-[#F0EEED] rounded-[20px] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium text-center p-4">
           {title} <br/> (Image)
        </div>
      </div>
      <div>
        <h3 className="font-bold text-base md:text-lg leading-tight mb-1 group-hover:underline truncate">{title}</h3>
        <StarRating rating={rating} />
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-xl">${price}</span>
          {discountPrice && (
            <>
              <span className="text-gray-400 font-bold text-xl line-through">${discountPrice}</span>
              <span className="bg-red-100 text-red-500 text-xs font-medium px-2 py-1 rounded-full">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, isOpen = true, children }: { title: string, isOpen?: boolean, children: React.ReactNode }) => {
    const [open, setOpen] = useState(isOpen);
    return (
        <div className="border-t border-gray-200 py-5">
            <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-4">
                <span className="font-bold text-lg">{title}</span>
                {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {open && <div>{children}</div>}
        </div>
    );
}

export default function ShopPage() {
 
  const products = [
    { title: "Gradient Graphic T-shirt", price: 145, rating: 3.5 },
    { title: "Polo with Tipping Details", price: 180, rating: 4.5 },
    { title: "Black Striped T-shirt", price: 120, discountPrice: 150, discountPercent: 30, rating: 5.0 },
    { title: "Skinny Fit Jeans", price: 240, discountPrice: 260, discountPercent: 20, rating: 3.5 },
    { title: "Checkered Shirt", price: 180, rating: 4.5 },
    { title: "Sleeve Striped T-shirt", price: 130, discountPrice: 160, discountPercent: 30, rating: 4.5 },
    { title: "Vertical Striped Shirt", price: 212, discountPrice: 232, discountPercent: 20, rating: 5.0 },
    { title: "Courage Graphic T-shirt", price: 145, rating: 4.0 },
    { title: "Loose Fit Bermuda Shorts", price: 80, rating: 3.0 },
  ];

  const colors = [
    "#00C12B", "#F50606", "#F5DD06", "#F57906", "#06CAF5", "#063AF5", "#7D06F5", "#F506A4", "#FFFFFF", "#000000"
  ];
  
  const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
  const styles = ["Casual", "Formal", "Party", "Gym"];

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        
        <hr className="border-gray-200" />

        <div className="flex items-center gap-2 text-sm text-gray-500 py-6">
          <Link href="/">Home</Link> <ChevronRight size={16} />
          <span className="text-black font-medium">Casual</span>
        </div>

        <div className="flex gap-8 items-start relative">
            
        
          <aside className="hidden md:block w-72 flex-shrink-0 border border-gray-200 rounded-[20px] p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl">Filters</h3>
                <SlidersHorizontal size={20} className="text-gray-400" />
            </div>
            
            <hr className="border-gray-200 mb-4"/>

            <div className="space-y-4 mb-6 text-gray-500">
                {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map(cat => (
                    <div key={cat} className="flex items-center justify-between cursor-pointer hover:text-black">
                        <span>{cat}</span>
                        <ChevronRight size={16} />
                    </div>
                ))}
            </div>

           
            <FilterSection title="Price">
                <div className="px-2">
            
                    <div className="relative h-2 bg-gray-200 rounded-full mt-4 mb-6">
                        <div className="absolute left-[15%] right-[25%] top-0 bottom-0 bg-black rounded-full"></div>
                        <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full cursor-pointer"></div>
                        <div className="absolute right-[25%] top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full cursor-pointer"></div>
                    </div>
                    <div className="flex justify-between font-medium">
                        <span>$50</span>
                        <span>$200</span>
                    </div>
                </div>
            </FilterSection>

         
            <FilterSection title="Colors">
                <div className="flex flex-wrap gap-3">
                    {colors.map((c, i) => (
                        <div key={i} 
                            className={`w-9 h-9 rounded-full border border-black/10 cursor-pointer flex items-center justify-center relative`}
                            style={{ backgroundColor: c }}
                        >
    
                            {c === "#063AF5" && <Check size={14} className="text-white" />}
                        </div>
                    ))}
                </div>
            </FilterSection>

        
            <FilterSection title="Size">
                <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                        <button key={size} className={`px-5 py-2.5 text-sm rounded-full transition ${size === 'Large' ? 'bg-black text-white' : 'bg-[#F0F0F0] text-gray-500 hover:bg-gray-200'}`}>
                            {size}
                        </button>
                    ))}
                </div>
            </FilterSection>

        
            <FilterSection title="Dress Style">
                <div className="space-y-4 text-gray-500">
                    {styles.map(style => (
                        <div key={style} className="flex items-center justify-between cursor-pointer hover:text-black">
                            <span>{style}</span>
                            <ChevronRight size={16} />
                        </div>
                    ))}
                </div>
            </FilterSection>

            <button className="w-full bg-black text-white py-4 rounded-full font-medium mt-4 hover:bg-gray-800 transition">
                Apply Filter
            </button>
          </aside>

         
          <div className="flex-1">
            
          
            <div className="flex items-end justify-between mb-6">
                <h1 className="font-oswald font-bold text-3xl md:text-4xl">Casual</h1>
                <div className="flex flex-col md:flex-row items-end md:items-center gap-2 text-gray-500 text-sm md:text-base">
                    <span>Showing 1-10 of 100 Products</span>
                    <div className="hidden md:flex items-center gap-1 ml-4 text-black font-medium cursor-pointer">
                        Sort by: <span className="font-bold">Most Popular</span> <ChevronDown size={16} />
                    </div>
                </div>
            </div>

    
            <div className="md:hidden flex justify-between items-center mb-6">
                <button className="flex items-center justify-center w-10 h-10 bg-[#F0F0F0] rounded-full">
                    <SlidersHorizontal size={18} />
                </button>
                 <div className="flex items-center gap-1 text-black font-medium">
                        Sort by: <span className="font-bold">Most Popular</span> <ChevronDown size={16} />
                </div>
            </div>

           
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                {products.map((product, idx) => (
                    <ProductCard key={idx} {...product} />
                ))}
            </div>

            <hr className="border-gray-200 my-10" />

          
            <div className="flex justify-between items-center">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-[8px] text-sm font-medium hover:bg-gray-50">
                    <ArrowLeft size={16} /> Previous
                </button>

              
                <div className="hidden md:flex items-center gap-1">
                    <button className="w-10 h-10 flex items-center justify-center rounded-[8px] bg-[#F0F0F0] text-black font-medium">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-[8px] text-gray-500 hover:bg-gray-50">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-[8px] text-gray-500 hover:bg-gray-50">3</button>
                    <span className="px-2 text-gray-500">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-[8px] text-gray-500 hover:bg-gray-50">8</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-[8px] text-gray-500 hover:bg-gray-50">9</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-[8px] text-gray-500 hover:bg-gray-50">10</button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-[8px] text-sm font-medium hover:bg-gray-50">
                    Next <ArrowRight size={16} />
                </button>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}