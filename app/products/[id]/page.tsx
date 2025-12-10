"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight, Minus, Plus, Check, SlidersHorizontal, ChevronDown } from "lucide-react";
import Footer from "@/app/components/Footer";
 

const StarRating = ({ rating, showText = true }: { rating: number, showText?: boolean }) => (
  <div className="flex items-center gap-1 text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={18} className={`${i < Math.floor(rating) ? "fill-yellow-400" : "fill-transparent text-gray-300"}`} />
    ))}
    {showText && <span className="text-sm text-black ml-1">{rating}/5</span>}
  </div>
);


const ReviewCard = ({ name, rating, comment, date }: any) => (
  <div className="border border-gray-200 rounded-[20px] p-6 space-y-3">
    <div className="flex justify-between items-start">
      <StarRating rating={rating} showText={false} />
      <span className="text-gray-400 font-bold">...</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="font-bold text-lg">{name}</span>
      <div className="bg-green-500 rounded-full p-[2px]"><Check size={10} className="text-white" /></div>
    </div>
    <p className="text-gray-500 text-sm leading-relaxed">&quot;{comment}&quot;</p>
    <p className="text-gray-400 text-sm font-medium pt-2">Posted on {date}</p>
  </div>
);

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("olive");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);

  const reviews = [
    { name: "Samantha D.", rating: 4.5, comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.", date: "August 14, 2023" },
    { name: "Alex M.", rating: 4, comment: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.", date: "August 15, 2023" },
    { name: "Ethan R.", rating: 3.5, comment: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.", date: "August 16, 2023" },
    { name: "Olivia P.", rating: 5, comment: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.", date: "August 17, 2023" },
    { name: "Liam K.", rating: 4, comment: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.", date: "August 18, 2023" },
    { name: "Ava H.", rating: 4.5, comment: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.", date: "August 19, 2023" }
  ];

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        
        <div className="flex items-center gap-2 text-sm text-gray-500 py-6">
          <Link href="/">Home</Link> <ChevronRight size={16} />
          <Link href="/">Shop</Link> <ChevronRight size={16} />
          <Link href="/">Men</Link> <ChevronRight size={16} />
          <span className="text-black font-medium">T-shirts</span>
        </div>

      
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          
        
          <div className="flex flex-col-reverse md:flex-row gap-4">
          
            <div className="flex md:flex-col justify-between w-full md:w-32 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="aspect-square bg-[#F0EEED] rounded-[20px] cursor-pointer hover:border border-black overflow-hidden relative">
                   
                   <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">Img {item}</div>
                </div>
              ))}
            </div>
        
            <div className="flex-1 aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Main Image (Olive Green)
                 </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            <h1 className="font-oswald font-black text-4xl uppercase">One Life Graphic T-shirt</h1>
            <StarRating rating={4.5} />
            
            <div className="flex items-center gap-4">
              <span className="font-bold text-3xl">$260</span>
              <span className="font-bold text-3xl text-gray-300 line-through">$300</span>
              <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-medium">-40%</span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed">
              This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
            </p>

            <hr />

            <div>
              <p className="text-gray-500 text-sm mb-3">Select Colors</p>
              <div className="flex gap-3">
                {[
                  { name: 'olive', hex: '#4F4631' },
                  { name: 'green', hex: '#314F4A' },
                  { name: 'navy', hex: '#31344F' },
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition"
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor === color.name && <Check className="text-white" size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <hr />

            <div>
              <p className="text-gray-500 text-sm mb-3">Choose Size</p>
              <div className="flex flex-wrap gap-3">
                {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition ${
                      selectedSize === size 
                      ? 'bg-black text-white' 
                      : 'bg-[#F0F0F0] text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <hr />

            <div className="flex gap-4">
              <div className="bg-[#F0F0F0] rounded-full px-5 py-3 flex items-center gap-6">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={20}/></button>
                <span className="font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={20}/></button>
              </div>
              <button className="flex-1 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>

          </div>
        </div>

        <div className="mt-20">
            <div className="flex justify-between border-b border-gray-200">
                <button className="flex-1 pb-4 text-center text-gray-500">Product Details</button>
                <button className="flex-1 pb-4 text-center border-b-2 border-black font-medium">Rating & Reviews</button>
                <button className="flex-1 pb-4 text-center text-gray-500">FAQs</button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 py-8">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl">All Reviews</h3>
                    <span className="text-gray-500 text-sm">(451)</span>
                </div>
                <div className="flex gap-2.5">
                    <button className="w-10 h-10 bg-[#F0F0F0] rounded-full flex items-center justify-center"><SlidersHorizontal size={20} /></button>
                    <button className="bg-[#F0F0F0] px-4 rounded-full flex items-center gap-2 font-medium text-sm">
                        Latest <ChevronDown size={16}/>
                    </button>
                    <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800">
                        Write a Review
                    </button>
                </div>
            </div>

    
            <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review, i) => (
                    <ReviewCard key={i} {...review} />
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <button className="border border-gray-200 px-10 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition">
                    Load More Reviews
                </button>
            </div>
        </div>

        <div className="mt-20">
            <h2 className="font-oswald font-black text-4xl text-center uppercase mb-12">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                    { title: "Polo with Contrast Trims", price: 212, oldPrice: 242, rating: 4.0, discount: 20 },
                    { title: "Gradient Graphic T-shirt", price: 145, rating: 3.5 },
                    { title: "Polo with Tipping Details", price: 180, rating: 4.5 },
                    { title: "Black Striped T-shirt", price: 120, oldPrice: 150, rating: 5.0, discount: 30 },
                 ].map((item, idx) => (
                     <div key={idx} className="cursor-pointer group">
                        <div className="aspect-square bg-[#F0EEED] rounded-[20px] mb-4 relative overflow-hidden">
                             {/* Placeholder */}
                        </div>
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <StarRating rating={item.rating} />
                        <div className="flex items-center gap-2 mt-2">
                            <span className="font-bold text-xl">${item.price}</span>
                            {item.oldPrice && <span className="text-gray-400 font-bold line-through">${item.oldPrice}</span>}
                            {item.discount && <span className="bg-red-100 text-red-500 text-xs px-2 py-1 rounded-full">-{item.discount}%</span>}
                        </div>
                     </div>
                 ))}
            </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}