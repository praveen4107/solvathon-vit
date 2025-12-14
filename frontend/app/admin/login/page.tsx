"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../../../components/Card";
import { setToken } from "../utils/auth";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["600", "700"] });
const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <Card title="Admin Login">
        <div className="space-y-4">
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-cyan-500/40 px-4 py-3"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-cyan-500/40 px-4 py-3"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={login}
            className={`${orbitron.className} w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500`}
          >
            Login
          </button>
        </div>
      </Card>
    </div>
  );
}
