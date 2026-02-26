"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Github, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed) router.push(`/${trimmed}`);
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e8eaed] font-mono flex flex-col">

      <nav className="px-6 py-4 border-b border-[#21262d]">
        <h1 className="text-2xl font-bold tracking-tight">TALVIA</h1>
      </nav>


      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        <div className="flex flex-col items-center gap-8 max-w-lg w-full">

          <div className="flex items-center justify-center size-20 rounded-2xl bg-[#ff8c00]/10 border border-[#ff8c00]/20">
            <Github className="size-10 text-[#ff8c00]" />
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              GitHub Profile Insights
            </h2>
            <p className="text-[#8b949e] text-sm md:text-base leading-relaxed max-w-md">
              Enter a GitHub username to explore their repositories, languages,
              contributions, and more.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#8b949e] group-focus-within:text-[#ff8c00] transition-colors" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username…"
                className="w-full h-14 pl-12 pr-14 rounded-xl bg-[#161b22] border border-[#21262d] text-[#e8eaed] placeholder:text-[#484f58] text-base outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00]/50 transition-all"
                autoFocus
              />
              <button
                type="submit"
                disabled={!username.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center rounded-lg bg-[#ff8c00] text-[#0d1117] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#ff9d2e] transition-colors"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[10px] text-[#484f58] uppercase tracking-widest mr-1">
              Try:
            </span>
            {["torvalds", "gaearon", "sindresorhus", "Bhup-GitHUB"].map(
              (name) => (
                <button
                  key={name}
                  onClick={() => router.push(`/${name}`)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-[#161b22] border border-[#21262d] text-[#8b949e] hover:text-[#ff8c00] hover:border-[#ff8c00]/40 transition-colors"
                >
                  {name}
                </button>
              ),
            )}
          </div>
        </div>
      </main>

      <footer className="px-6 py-4 border-t border-[#21262d] text-center">
        <p className="text-[10px] text-[#484f58] uppercase tracking-widest">
          Powered by GitHub GraphQL API
        </p>
      </footer>
    </div>
  );
}
