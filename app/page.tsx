import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import Footer from "./components/Footer";

// --- Components for this page ---

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1 text-yellow-400 mb-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${i < Math.floor(rating) ? "fill-yellow-400" : "fill-transparent text-gray-300"}`}
        />
      ))}
      <span className="text-sm text-black ml-1">{rating}/5</span>
    </div>
  );
};

const ProductCard = ({ 
  title, 
  price, 
  rating, 
  discountPrice, 
  discountPercent,
  imageColor 
}: any) => {
  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
      <div className={`aspect-square ${imageColor} rounded-[20px] relative overflow-hidden`}>
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 opacity-50 font-bold text-xl">
           Product Image
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg leading-tight mb-1 group-hover:underline">{title}</h3>
        <StarRating rating={rating} />
        <div className="flex items-center gap-3 mt-1">
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

// --- Main Page ---

export default function Home() {
  const products = [
    { title: "T-shirt with Tape Details", rating: 4.5, price: 120, imageColor: "bg-[#F0EEED]" },
    { title: "Skinny Fit Jeans", rating: 3.5, price: 240, discountPrice: 260, discountPercent: 20, imageColor: "bg-[#F0EEED]" },
    { title: "Checkered Shirt", rating: 4.5, price: 180, imageColor: "bg-[#F0EEED]" },
    { title: "Sleeve Striped T-shirt", rating: 4.5, price: 130, discountPrice: 160, discountPercent: 30, imageColor: "bg-[#F0EEED]" },
  ];

  return (
    <main>
      {/* --- HERO SECTION --- */}
      <section className="bg-[#F2F0F1] pt-10 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
          
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            <h1 className="font-oswald font-black text-5xl md:text-[64px] leading-[1] uppercase">
              Find clothes that matches your style
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-sm">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <button className="bg-black text-white px-12 py-4 rounded-full font-medium hover:bg-gray-800 transition">
              Shop Now
            </button>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-6">
              <div>
                <h4 className="font-bold text-3xl">200+</h4>
                <p className="text-gray-500 text-xs">International Brands</p>
              </div>
              <div className="w-[1px] bg-gray-300 h-12 hidden md:block"></div>
              <div>
                <h4 className="font-bold text-3xl">2,000+</h4>
                <p className="text-gray-500 text-xs">High-Quality Products</p>
              </div>
              <div className="w-[1px] bg-gray-300 h-12 hidden md:block"></div>
              <div>
                <h4 className="font-bold text-3xl">30,000+</h4>
                <p className="text-gray-500 text-xs">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Hero Image Area */}
          <div className="relative min-h-[400px] md:min-h-[600px] flex items-end justify-center">
            {/* Decorative Stars */}
            <Star className="absolute top-10 right-10 text-black fill-black w-12 h-12 animate-pulse" />
            <Star className="absolute top-1/2 left-0 text-black fill-black w-8 h-8" />
            
            {/* Placeholder for Main Model Image */}
            {/* In a real app, use <Image src="..." /> */}
            <div className="relative w-full h-full min-h-[500px] bg-gradient-to-t from-[#F2F0F1] via-transparent to-transparent z-10">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop')] bg-contain bg-no-repeat bg-bottom"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BRAND BAR --- */}
      <section className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap justify-center md:justify-between items-center gap-8 text-white">
          <span className="font-serif text-3xl">VERSACE</span>
          <span className="font-sans font-bold text-3xl">ZARA</span>
          <span className="font-serif text-3xl">GUCCI</span>
          <span className="font-bold text-3xl tracking-widest">PRADA</span>
          <span className="font-light text-3xl">Calvin Klein</span>
        </div>
      </section>

      {/* --- NEW ARRIVALS --- */}
      <section className="py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-oswald font-black text-4xl md:text-5xl text-center mb-12 uppercase">
            New Arrivals
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="border border-gray-200 px-12 py-3 rounded-full hover:bg-black hover:text-white transition">
              View All
            </button>
          </div>
          <div>
            <Footer/>
          </div>
        </div>
      </section>
    </main>
  );
}