"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut, 
  Upload, 
  Plus, 
  X, 
  Image as ImageIcon,
  ChevronRight
} from "lucide-react";


export type Product = {
    id?: string;
    name: string;
    description: string;
    price: number;
    thumbnail_image: string;
    stock?: number;
    available_colors?: string[];
}

export type Category = {
    id?: string;
    name?: string;
    description: string | null;
}


const InputField = ({ label, placeholder, type = "text", value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-black/80">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 outline-none focus:ring-1 focus:ring-black/20 transition text-sm"
    />
  </div>
);

const TextAreaField = ({ label, placeholder, value, onChange, rows = 4 }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-black/80">{label}</label>
    <textarea 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-[#F0F0F0] rounded-[20px] px-5 py-4 outline-none focus:ring-1 focus:ring-black/20 transition text-sm resize-none"
    />
  </div>
);

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"product" | "category">("product");


  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    thumbnail_image: "",
    available_colors: []
  });

  const [colorInput, setColorInput] = useState("");

  
  const [category, setCategory] = useState<Category>({
    name: "",
    description: ""
  });

 
  const handleAddColor = () => {
    if (colorInput && product.available_colors) {
      setProduct({
        ...product,
        available_colors: [...product.available_colors, colorInput]
      });
      setColorInput("");
    }
  };

  const removeColor = (colorToRemove: string) => {
    setProduct({
        ...product,
        available_colors: product.available_colors?.filter(c => c !== colorToRemove)
    })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      
      <aside className="w-full md:w-64 border-r border-gray-200 p-6 flex flex-col">
        <div className="font-oswald font-bold text-2xl uppercase tracking-tight mb-10">
            SHOP-CART <span className="text-xs align-top text-gray-400">ADMIN</span>
        </div>

        <nav className="flex-1 space-y-2">
            <button className="flex items-center gap-3 w-full px-4 py-3 bg-black text-white rounded-full text-sm font-medium">
                <LayoutDashboard size={18} /> Dashboard
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-[#F0F0F0] rounded-full text-sm font-medium transition">
                <Package size={18} /> Orders
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-[#F0F0F0] rounded-full text-sm font-medium transition">
                <Settings size={18} /> Settings
            </button>
        </nav>

        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-full text-sm font-medium transition mt-auto">
            <LogOut size={18} /> Logout
        </button>
      </aside>

     
      <main className="flex-1 p-6 md:p-12 bg-[#FAFAFA]">
        
        
        <div className="flex justify-between items-center mb-10">
            <h1 className="font-oswald font-bold text-3xl uppercase">Manage Inventory</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Admin</span> <ChevronRight size={14} /> <span className="text-black font-medium">Add New</span>
            </div>
        </div>

      
        <div className="flex gap-8 border-b border-gray-200 mb-8 w-full max-w-4xl mx-auto">
            <button 
                onClick={() => setActiveTab("product")}
                className={`pb-4 text-sm font-medium transition border-b-2 ${activeTab === "product" ? "border-black text-black" : "border-transparent text-gray-400"}`}
            >
                Add New Product
            </button>
            <button 
                onClick={() => setActiveTab("category")}
                className={`pb-4 text-sm font-medium transition border-b-2 ${activeTab === "category" ? "border-black text-black" : "border-transparent text-gray-400"}`}
            >
                Add New Category
            </button>
        </div>

   
        <div className="bg-white max-w-4xl mx-auto rounded-[20px] border border-gray-200 p-8 shadow-sm">
            
          
            {activeTab === "product" && (
                <div className="grid md:grid-cols-2 gap-10">
                 
                    <div className="space-y-6">
                        <InputField 
                            label="Product Name" 
                            placeholder="e.g. Gradient Graphic T-shirt" 
                            value={product.name}
                            onChange={(e: any) => setProduct({...product, name: e.target.value})}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <InputField 
                                label="Price ($)" 
                                type="number" 
                                placeholder="0.00" 
                                value={product.price}
                                onChange={(e: any) => setProduct({...product, price: Number(e.target.value)})}
                            />
                            <InputField 
                                label="Stock Quantity" 
                                type="number" 
                                placeholder="0" 
                                value={product.stock}
                                onChange={(e: any) => setProduct({...product, stock: Number(e.target.value)})}
                            />
                        </div>

                        <TextAreaField 
                            label="Description" 
                            placeholder="Product details..." 
                            value={product.description}
                            onChange={(e: any) => setProduct({...product, description: e.target.value})}
                        />

                      
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-black/80">Available Colors (Hex)</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="#000000" 
                                    value={colorInput}
                                    onChange={(e) => setColorInput(e.target.value)}
                                    className="flex-1 bg-[#F0F0F0] rounded-full px-5 py-3 outline-none text-sm"
                                />
                                <button 
                                    onClick={handleAddColor}
                                    className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {product.available_colors?.map((color, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-gray-100 pl-3 pr-2 py-1 rounded-full text-xs">
                                        <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: color }}></div>
                                        <span>{color}</span>
                                        <button onClick={() => removeColor(color)} className="hover:text-red-500"><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                
                    <div className="flex flex-col gap-6">
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-black/80">Product Image</label>
                            <div className="w-full aspect-square bg-[#F0EEED] rounded-[20px] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 cursor-pointer hover:border-black transition">
                                <ImageIcon size={48} className="mb-2 opacity-50" />
                                <span className="text-sm font-medium">Click to upload image</span>
                                <span className="text-xs text-gray-500 mt-1">(Currently just URL string)</span>
                            </div>
                            <InputField 
                                label="Or Image URL" 
                                placeholder="https://..." 
                                value={product.thumbnail_image}
                                onChange={(e: any) => setProduct({...product, thumbnail_image: e.target.value})}
                            />
                        </div>

                        <div className="mt-auto pt-6">
                            <button className="w-full bg-black text-white py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition shadow-lg">
                                Create Product
                            </button>
                        </div>
                    </div>
                </div>
            )}

        
            {activeTab === "category" && (
                <div className="max-w-xl mx-auto space-y-8 py-10">
                     <div className="text-center">
                        <h2 className="font-oswald text-2xl font-bold uppercase mb-2">New Category</h2>
                        <p className="text-gray-500 text-sm">Create a new section for your store.</p>
                     </div>

                     <div className="space-y-6">
                        <InputField 
                            label="Category Name" 
                            placeholder="e.g. Streetwear" 
                            value={category.name}
                            onChange={(e: any) => setCategory({...category, name: e.target.value})}
                        />
                        <TextAreaField 
                            label="Description" 
                            placeholder="Describe this category..." 
                            value={category.description || ""}
                            onChange={(e: any) => setCategory({...category, description: e.target.value})}
                        />
                     </div>

                     <button className="w-full bg-black text-white py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition shadow-lg">
                        Create Category
                    </button>
                </div>
            )}

        </div>
      </main>
    </div>
  );
}