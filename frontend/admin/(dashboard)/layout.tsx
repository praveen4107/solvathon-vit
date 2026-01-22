"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearToken, getToken } from "../app/admin/utils/auth";

export default function AdminNavLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) router.push("/admin/login");
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <nav className="sticky top-0 z-20 border-b border-gray-700 bg-neutral-900/80 backdrop-blur px-6 py-3 flex justify-between items-center">
        <span className="text-sm font-medium">SOLVATHON'26 · ADMIN</span>
        <button
          onClick={() => {
            clearToken();
            router.push("/admin/login");
          }}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </nav>

      {children}
    </div>
  );
}
