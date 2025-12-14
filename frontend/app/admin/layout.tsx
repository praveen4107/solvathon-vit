"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearToken, getToken } from "./utils/auth";
import { Orbitron, Rajdhani } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["600", "700"] });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) router.push("/admin/login");
  }, []);

  return (
    <div className={`min-h-screen bg-black text-white ${rajdhani.className}`}>
      <nav className="sticky top-0 z-20 border-b border-cyan-500/30 bg-black/80 backdrop-blur px-4 py-4 flex justify-between">
        <span className={`${orbitron.className} text-cyan-400`}>
          SOLVATHON'26 · ADMIN
        </span>
        <button
          onClick={() => {
            clearToken();
            router.push("/admin/login");
          }}
          className="text-sm text-red-400 hover:underline"
        >
          Logout
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
