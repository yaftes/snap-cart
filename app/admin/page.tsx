"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut, 
  Plus, 
  X,
  Image as ImageIcon,
  ChevronRight
} from "lucide-react";
import { useForm } from "react-hook-form";

// ===========================
// Types
// ===========================


type Category = {
  id: string;
  name: string;
};

type ProductForm = {
  name: string;
  description: string;
  price: number;
  stock: number;
  thumbnail_image: string;
  category_id: string;
};

type CategoryForm = {
  name: string;
  description: string;
};

// ===========================
// Page Component
// ===========================
export default function AdminPage() {

  const [activeTab, setActiveTab] = useState<"product" | "category">("product");
  const [categories, setCategories] = useState<Category[]>([]);
  const [colorInput, setColorInput] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  // ===========================
  // Fetch categories (for products)
  // ===========================



  useEffect(() => {
    fetchCategories();
  }, []);
  

  async function fetchCategories() {

    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log("Failed to load categories", err);
    }


  }

  // ===========================
  // CATEGORY FORM (React Hook Form)
  // ===========================


  const { register: registerCategory, handleSubmit: submitCategory, reset: resetCategory } = useForm<CategoryForm>();

  async function handleAddCategory(data: CategoryForm) {
    try {
          await axios.post(
        "/api/categories",
        data,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYTJhZGU4LWExZDgtNGYzZC1hNzA1LWZiZDViZmJhMTQzMCIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjUzMDA0ODIsImV4cCI6MTc2NTkwNTI4Mn0.r2BQ0Y3ALywzY6HPC6I4wyzNHk_pPlI-6UfxPZgxd00`,
          },
        }
      );

      setSuccessMessage("Category created successfully!");
      resetCategory();
      fetchCategories();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.log(err);
    }
  }

  // ===========================
  // PRODUCT FORM (React Hook Form)
  // ===========================
  const { register: registerProduct, handleSubmit: submitProduct, reset: resetProduct } = useForm<ProductForm>();

  async function handleAddProduct(data: ProductForm) {
    try {
      await axios.post("/api/products", {
        ...data,
        available_colors: colors
      });

      setSuccessMessage("Product created successfully!");
      resetProduct();
      setColors([]);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.log(err);
    }
  }

  // Add color logic
  const handleAddColor = () => {
    if (colorInput.trim() !== "") {
      setColors([...colors, colorInput]);
      setColorInput("");
    }
  };

  const removeColor = (color: string) => {
    setColors(colors.filter(c => c !== color));
  };

  // ===========================
  // UI Rendering
  // ===========================
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      
      {/* ============ SIDEBAR ============== */}
      <aside className="w-full md:w-64 border-r border-gray-200 p-6 flex flex-col">

        <div className="font-oswald font-bold text-2xl uppercase tracking-tight mb-10">
            SHOP-CART <span className="text-xs text-gray-400">ADMIN</span>
        </div>

        <nav className="flex-1 space-y-2">
            <button className="flex items-center gap-3 w-full px-4 py-3 bg-black text-white rounded-full text-sm font-medium">
                <LayoutDashboard size={18} /> Dashboard
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-[#F0F0F0] rounded-full text-sm font-medium">
                <Package size={18} /> Orders
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-[#F0F0F0] rounded-full text-sm font-medium">
                <Settings size={18} /> Settings
            </button>
        </nav>

        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-full text-sm font-medium mt-auto">
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
                Add Product
            </button>

            <button 
                onClick={() => setActiveTab("category")}
                className={`pb-4 text-sm font-medium transition border-b-2 ${activeTab === "category" ? "border-black text-black" : "border-transparent text-gray-400"}`}
            >
                Add Category
            </button>
        </div>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-5 text-sm font-medium">
            {successMessage}
          </div>
        )}



        <div className="bg-white max-w-4xl mx-auto rounded-[20px] border border-gray-200 p-8 shadow-sm">


          {activeTab === "product" && (
            <form onSubmit={submitProduct(handleAddProduct)} className="grid md:grid-cols-2 gap-10">

              <div className="space-y-6">

                <div>
                  <label className="text-sm font-semibold">Product Name</label>
                  <input 
                    {...registerProduct("name", { required: true })}
                    className="w-full bg-[#F0F0F0] rounded-full px-5 py-3"
                    placeholder="e.g. Hoodie"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold">Price</label>
                    <input 
                      type="number"
                      {...registerProduct("price", { required: true })}
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Stock</label>
                    <input 
                      type="number"
                      {...registerProduct("stock", { required: true })}
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    {...registerProduct("description", { required: true })}
                    className="w-full bg-[#F0F0F0] rounded-[20px] px-5 py-4 resize-none"
                    rows={4}
                    placeholder="Product details..."
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Category</label>
                  <select 
                    {...registerProduct("category_id", { required: true })}
                    className="w-full bg-[#F0F0F0] rounded-full px-5 py-3"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Colors</label>
                  <div className="flex gap-2">
                    <input 
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      placeholder="#000000"
                      className="flex-1 bg-[#F0F0F0] rounded-full px-5 py-3"
                    />
                    <button 
                      type="button"
                      onClick={handleAddColor}
                      className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {colors.map((color, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs">
                        <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: color }} />
                        <span>{color}</span>
                        <button type="button" onClick={() => removeColor(color)}>
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold">Image URL</label>
                  <input 
                    {...registerProduct("thumbnail_image", { required: true })}
                    placeholder="https://..."
                    className="w-full bg-[#F0F0F0] rounded-full px-5 py-3"
                  />
                </div>

                <button className="w-full bg-black text-white py-4 rounded-full font-medium text-lg">
                  Create Product
                </button>
              </div>

            </form>
          )}


          {activeTab === "category" && (
            <form onSubmit={submitCategory(handleAddCategory)} className="space-y-8 max-w-xl mx-auto">

              <div className="space-y-2">
                <label className="text-sm font-semibold">Category Name</label>
                <input 
                  {...registerCategory("name", { required: true })}
                  className="w-full bg-[#F0F0F0] rounded-full px-5 py-3"
                  placeholder="e.g. Streetwear"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Description</label>
                <textarea 
                  {...registerCategory("description", { required: true })}
                  className="w-full bg-[#F0F0F0] rounded-[20px] px-5 py-4 resize-none"
                  rows={4}
                  placeholder="Describe this category..."
                />
              </div>

              <button className="w-full bg-black text-white py-4 rounded-full font-medium text-lg">
                Create Category
              </button>

            </form>
          )}

        </div>
      </main>
    </div>


  );
}
