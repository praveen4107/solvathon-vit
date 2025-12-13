"use client";

import { useState } from "react";
import { User, Mail, Phone, Home, Users, Rocket } from "lucide-react";
import Card from "../../components/Card";

import { Orbitron, Rajdhani } from "next/font/google";

/* ---------- GOOGLE FONTS ---------- */
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RegisterPage() {
  const [mode, setMode] = useState<"individual" | "team">("team");

  return (
    <div className={`min-h-screen bg-black text-white ${rajdhani.className}`}>
      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-cyan-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-500/10 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* HEADER */}
        <div className="text-center mb-8 sm:mb-10 space-y-3 sm:space-y-4">
          <h1
            className={`${orbitron.className} text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 leading-[1.25] pb-1`}
          >
            Register for SOLVATHON'26
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Inter-Hostel Hackathon · VIT Chennai Hostels
          </p>
        </div>

        {/* MODE TOGGLE */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="flex border border-cyan-500/40">
            {["team", "individual"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as any)}
                className={`px-4 py-2 sm:px-6 sm:py-2 uppercase tracking-wide text-xs sm:text-sm transition ${
                  mode === m
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 font-bold"
                    : "hover:bg-white/5 text-gray-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* FORM */}
        <Card title={mode === "team" ? "Team Registration" : "Individual Registration"}>
          <form className="space-y-6 sm:space-y-8">
            {/* TEAM NAME */}
            {mode === "team" && (
              <div>
                <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Team Name</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <input
                    className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                    placeholder="Enter team name"
                  />
                </div>
              </div>
            )}

            {/* LEADER DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <input
                    className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <input
                    className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                    placeholder="vitstudent.ac.in"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                  <input
                    className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                    placeholder="10-digit number"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Hostel Block</label>
                <div className="relative">
                  <Home className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  <select
                    className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base appearance-none"
                  >
                    <option value="">Select block</option>
                    <option>A Block</option>
                    <option>C Block</option>
                    <option>D1 Block</option>
                    <option>D2 Block</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SUBMIT */}
            <div className="pt-4 sm:pt-6 text-center">
              <button
                type="submit"
                className={`${orbitron.className} inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 uppercase tracking-wider font-bold hover:scale-105 transition text-sm sm:text-base`}
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                Submit Registration
              </button>

              <p className="text-xs text-gray-500 mt-3 sm:mt-4">
                Only VIT Chennai hostellers from A, C, D1 & D2 Blocks are eligible
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}