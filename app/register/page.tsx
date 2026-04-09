"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", address: "", phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Registration Successful! Now please log in.");
      window.location.href = "/login";
    } else {
      alert("Registration failed. Email might already be in use.");
    }
  };

  const inputStyle = "w-full p-4 bg-slate-100 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-slate-900 placeholder-slate-500 font-medium outline-none transition-all shadow-sm";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-900">
      <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        <div className="bg-indigo-600 md:w-2/5 p-12 text-white flex flex-col justify-center">
          <h2 className="text-4xl font-black leading-tight tracking-tight">Join the Library.</h2>
          <p className="mt-4 text-indigo-100 text-lg">Your gateway to a world of knowledge starts here.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 md:w-3/5 space-y-5 bg-white">
          <div>
            <h1 className="text-3xl font-black">Register</h1>
            <p className="text-slate-400 font-medium mt-1">Please enter your details accurately</p>
          </div>

          <input type="text" placeholder="Full Name" className={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="Email Address" className={inputStyle} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Create Secure Password" className={inputStyle} onChange={(e) => setFormData({...formData, password: e.target.value})} required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <input type="text" placeholder="Phone (e.g. +91...)" className={inputStyle} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
             <input type="text" placeholder="City" className={inputStyle} onChange={(e) => setFormData({...formData, address: e.target.value})} required />
          </div>

          <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 mt-4">
            Sign Up Now
          </button>
          
          <p className="text-center text-slate-500 font-medium pt-2">
            Already have an account? <a href="/login" className="text-indigo-600 font-bold hover:underline">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
}