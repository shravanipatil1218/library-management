"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    // This API would fetch data from the IssueStatus table
    fetch("/api/admin/rentals").then(res => res.json()).then(data => setRentals(data));
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900 text-white p-8 flex flex-col sticky top-0 h-screen">
        <h2 className="text-2xl font-black mb-12 tracking-tighter text-indigo-400">ADMIN PANEL</h2>
        <nav className="space-y-4 flex-1">
          <button className="w-full text-left p-3 rounded-lg bg-indigo-600 font-bold">Dashboard</button>
          <button className="w-full text-left p-3 rounded-lg text-slate-400 hover:text-white transition">Book Inventory</button>
          <button className="w-full text-left p-3 rounded-lg text-slate-400 hover:text-white transition">User Management</button>
          <button className="w-full text-left p-3 rounded-lg text-slate-400 hover:text-white transition">Issue Records</button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-12">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900">Live Issue Tracking</h1>
          <p className="text-slate-500">Monitoring all active book rentals in the system.</p>
        </header>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-6 font-bold text-slate-600 uppercase text-xs tracking-widest">Issue ID</th>
                <th className="p-6 font-bold text-slate-600 uppercase text-xs tracking-widest">Customer ID</th>
                <th className="p-6 font-bold text-slate-600 uppercase text-xs tracking-widest">Book Title</th>
                <th className="p-6 font-bold text-slate-600 uppercase text-xs tracking-widest">Issue Date</th>
                <th className="p-6 font-bold text-slate-600 uppercase text-xs tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rentals.map((item: any) => (
                <tr key={item.Issue_Id} className="hover:bg-slate-50/50 transition">
                  <td className="p-6 font-mono text-indigo-600">{item.Issue_Id}</td>
                  <td className="p-6 font-semibold">{item.Issued_cust}</td>
                  <td className="p-6">{item.Issued_book_name}</td>
                  <td className="p-6 text-slate-500">{item.Issue_date}</td>
                  <td className="p-6">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}