"use client";

import { Zap, Mail, MapPin, Calendar } from "lucide-react";
import { Orbitron, Rajdhani } from "next/font/google";

/* ---------- GOOGLE FONTS ---------- */
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Footer() {
  return (
    <footer className="relative w-full mt-16 sm:mt-20 bg-black border-t border-cyan-500/40">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-60 h-60 sm:w-72 sm:h-72 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 sm:w-72 sm:h-72 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${rajdhani.className}`}>
        {/* MAIN GRID */}
        <div className="grid gap-8 sm:gap-10 md:grid-cols-3 mb-8 sm:mb-10">
          {/* BRAND */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-pulse" />
              <h2
                className={`${orbitron.className} text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400`}
              >
                SOLVATHON'26
              </h2>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm max-w-sm">
              Inter-Hostel Hackathon at VIT Chennai.  
              Code, compete, and build impactful solutions for campus life.
            </p>
          </div>

          {/* EVENT INFO */}
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
              <span>15 January 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
              <span>VIT Chennai – Hostel Campus</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" />
              <a
                href="mailto:solvathon@vitchennai.edu"
                className="hover:text-cyan-400 transition"
              >
                solvathon@vitchennai.edu
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3
              className={`${orbitron.className} text-xs sm:text-sm uppercase tracking-widest text-cyan-400 mb-3 sm:mb-4`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/problems", label: "Problems" },
                { href: "/register", label: "Register" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2"
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-400 opacity-60" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4 sm:mb-6" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs text-gray-500">
          <p>
            © 2026{" "}
            <span className="text-cyan-400 font-semibold">
              SOLVATHON'26
            </span>
          </p>
          <p className="text-center">VIT Chennai · Hostellers Only</p>
        </div>
      </div>
    </footer>
  );
}