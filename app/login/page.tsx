"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();

    if (res.ok) {
      // SECURITY: Save the "Secret Key" so the Dashboard lets us in
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", data.userName || "Member");
      window.location.href = "/dashboard";
    } else {
      alert("Invalid Email or Password. Please try again.");
    }
  };

  const inputStyle = "w-full p-4 bg-slate-100 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-slate-900 placeholder-slate-500 font-semibold outline-none transition-all shadow-sm";

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 text-slate-900">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl border border-white">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-200">L</div>
          <h1 className="text-4xl font-black tracking-tight">Welcome</h1>
          <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">Enter your credentials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-indigo-600 uppercase ml-2 tracking-widest">Email Address</label>
            <input type="email" placeholder="e.g. name@email.com" className={inputStyle} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-indigo-600 uppercase ml-2 tracking-widest">Password</label>
            <input type="password" placeholder="Enter your password" className={inputStyle} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl transform hover:-translate-y-1">
            Sign In
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 font-medium">
            New here? <a href="/register" className="text-indigo-600 font-extrabold hover:underline">Create an Account</a>
          </p>
        </div>
      </div>
    </div>
  );
}