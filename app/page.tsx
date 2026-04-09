export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 text-center px-6">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto mb-8 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-500/50">
          L
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
          The Modern <br className="hidden md:block"/> Cloud Library.
        </h1>
        <p className="text-lg text-slate-400 font-medium max-w-xl mx-auto mb-10">
          Access thousands of premium books, manage your rentals, and track your reading journey in one seamless platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-1">
            Member Login
          </a>
          <a href="/register" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-10 rounded-2xl transition-all">
            Create Free Account
          </a>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-800 flex justify-center gap-8 text-slate-500 font-bold text-sm uppercase tracking-widest">
          <a href="/admin-login" className="hover:text-indigo-400 transition-colors">Staff Portal</a>
          <span>•</span>
          <span>System v2.0</span>
        </div>
      </div>
    </div>
  );
}