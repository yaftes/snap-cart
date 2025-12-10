"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Footer from "@/app/components/Footer";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.606.492-2.606 1.691v1.881h3.947l-.597 3.667h-3.35v7.98h-5.208Z" /></svg>
);

type FormValues = {
  fullName: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setApiMessage(null);
    try {
      const response = await axios.post("/api/auth/sign-up", data);
      setApiMessage({ type: "success", text: "Account created successfully!" });
      reset();
    } catch (error: any) {
      setApiMessage({
        type: "error",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex-1 w-full">
        <div className="flex items-center gap-2 text-sm text-gray-500 py-6">
          <span className="text-black font-medium">Create Account</span>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-24 mb-20 items-center">
          <div className="flex-1 w-full max-w-md">
            <h1 className="font-oswald font-black text-4xl uppercase mb-2">Create Account</h1>
            <p className="text-gray-500 mb-8 text-sm">Sign up for free and become a member.</p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-sm font-medium ml-3 mb-1 block text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`w-full bg-[#F0F0F0] text-black px-6 py-3.5 rounded-full outline-none focus:ring-1 transition-all ${
                    errors.fullName ? "focus:ring-red-500 border border-red-500" : "focus:ring-black"
                  }`}
                  {...register("fullName", { required: "Full name is required" })}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-3">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium ml-3 mb-1 block text-gray-600">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full bg-[#F0F0F0] text-black px-6 py-3.5 rounded-full outline-none focus:ring-1 transition-all ${
                    errors.email ? "focus:ring-red-500 border border-red-500" : "focus:ring-black"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
                  })}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 ml-3">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <label className="text-sm font-medium ml-3 mb-1 block text-gray-600">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className={`w-full bg-[#F0F0F0] text-black px-6 py-3.5 rounded-full outline-none focus:ring-1 transition-all ${
                    errors.password ? "focus:ring-red-500 border border-red-500" : "focus:ring-black"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-[38px] text-gray-400 hover:text-black transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1 ml-3">{errors.password.message}</p>}
              </div>

              {apiMessage && (
                <p className={`text-sm mt-2 ${apiMessage.type === "error" ? "text-red-500" : "text-green-500"} text-center`}>
                  {apiMessage.text}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white rounded-full py-3.5 font-medium text-base hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Account"} <Sparkles size={18} />
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 border border-gray-200 rounded-full py-3.5 font-medium text-black hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <GoogleIcon /> <span className="hidden sm:inline">Google</span>
              </button>
              <button className="flex-1 border border-gray-200 rounded-full py-3.5 font-medium text-black hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <FacebookIcon /> <span className="hidden sm:inline">Facebook</span>
              </button>
            </div>

            <div className="mt-8 text-center text-sm">
              <span className="text-gray-500">Already have an account? </span>
              <Link
                href="/auth/sign-in"
                className="font-bold text-black border-b border-black pb-0.5 hover:text-gray-700"
              >
                Login Here
              </Link>
            </div>
          </div>

          <div className="hidden md:block flex-1 w-full h-[650px] bg-black rounded-[20px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-black to-black"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                <Sparkles size={32} className="text-white" />
              </div>
              <h2 className="font-oswald font-black text-5xl uppercase mb-4 leading-tight">
                Join the
                <br />
                Revolution
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Create your profile today and get access to exclusive collections, priority shipping, and personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
