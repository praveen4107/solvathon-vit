"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "../../app/admin/utils/auth";
const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    setError("");
    const res = await fetch(`${API}/api/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    setToken(data.access);
    router.push("/admin");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-6">
      <div className="w-full max-w-sm rounded-md border border-gray-700 bg-neutral-900 p-5">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="text-gray-400 text-sm mb-4">Enter your credentials</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Username</label>
            <input
              placeholder="admin"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-neutral-950 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-gray-700 rounded-md px-3 py-2 pr-16 text-sm focus:outline-none focus:border-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={login}
            className="w-full rounded-md bg-white/10 hover:bg-white/20 px-4 py-2 text-sm"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
