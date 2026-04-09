"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Member");

  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn");
    const name = localStorage.getItem("userName");
    if (!authStatus) {
      window.location.href = "/login";
    } else {
      setUserName(name || "Member");
      fetch("/api/books").then(res => res.json()).then(data => {
        setBooks(data);
        setLoading(false);
      });
    }
  }, []);

  // --- LOGIC: LOGOUT ---
  const handleLogout = () => {
    localStorage.clear(); // Clears login status and name
    window.location.href = "/login";
  };

  // --- LOGIC: RENT A BOOK ---
  const handleRent = async (isbn: string, title: string) => {
    const res = await fetch("/api/rent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        isbn, 
        bookTitle: title, 
        customerId: "C1000" // In a real app, you'd pull this from localStorage
      }),
    });

    if (res.ok) {
      alert(`Enjoy reading "${title}"!`);
      window.location.reload(); // Refresh to update "Available" status
    } else {
      alert("Could not rent book. It might be unavailable.");
    }
  };

  const filteredBooks = books.filter((b: any) => 
    b.Book_title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-slate-400">Loading Library...</div>;

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black">L</div>
          <span className="text-xl font-black">CloudLibrary</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button className="w-full text-left px-5 py-4 rounded-2xl font-bold bg-indigo-50 text-indigo-600">Discover</button>
          <button className="w-full text-left px-5 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50">My Rentals</button>
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="mt-auto border-t pt-6">
          <p className="text-xs font-bold text-slate-400 uppercase mb-4 px-2 tracking-widest">Logged in as {userName}</p>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 font-black py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black tracking-tight">The Collection</h1>
          <input 
            type="text" 
            placeholder="Search..." 
            className="p-4 bg-white border border-slate-200 rounded-2xl w-80 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredBooks.map((book: any) => (
            <div key={book.ISBN} className="group flex flex-col">
              <div className="relative aspect-[2/3] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-lg mb-6 transform group-hover:-translate-y-2 transition-all">
                <img src={book.Image_URL} alt={book.Book_title} className="w-full h-full object-cover" />
                
                {/* RENT BUTTON - Only shows on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8">
                  {book.Status === 'Yes' ? (
                    <button 
                      onClick={() => handleRent(book.ISBN, book.Book_title)}
                      className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform"
                    >
                      Rent Now
                    </button>
                  ) : (
                    <span className="text-white font-bold text-xl italic">Unavailable</span>
                  )}
                </div>

                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase ${book.Status === 'Yes' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-white'}`}>
                    {book.Status === 'Yes' ? 'Available' : 'Rented'}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900">{book.Book_title}</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{book.Author}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}