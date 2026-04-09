"use client";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert(`Access Granted: ${data.name}`);
      window.location.href = "/admin-dashboard"; // You'll create this later
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-3xl p-10 shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-2xl mb-4 shadow-lg shadow-indigo-500/20">
            <span className="text-white text-2xl font-bold">CL</span>
          </div>
          <h1 className="text-3xl font-black text-white">Staff Portal</h1>
          <p className="text-slate-400 mt-2">Cloud Library</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="email" placeholder="Admin Email" onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#334155] border-none rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition" required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#334155] border-none rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition" required />
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}