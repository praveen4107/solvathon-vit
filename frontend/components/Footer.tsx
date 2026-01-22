"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faEnvelope, faMapMarkerAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
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
    <footer className="relative w-full mt-16 sm:mt-20 bg-black border-t border-cyan-500/30">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-60 h-60 sm:w-72 sm:h-72 bg-cyan-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 sm:w-72 sm:h-72 bg-blue-500/5 blur-3xl rounded-full" />
      </div>

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ${rajdhani.className}`}>
        {/* MAIN CONTENT - Simplified */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* BRAND */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBolt} className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <h2
              className={`${orbitron.className} text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400`}
            >
              SOLVATHON'26
            </h2>
          </div>

          {/* QUICK LINKS */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/problems", label: "Problems" },
              { href: "/register", label: "Register" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CONTACT */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
            <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            <a
              href="mailto:solvathon@vitchennai.edu"
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-3 sm:mb-4" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-xs text-gray-500">
          <p>
            © 2026 <span className="text-cyan-400 font-semibold">SOLVATHON'26</span>
          </p>
          <span className="hidden sm:inline mx-2">·</span>
          <p>VIT Chennai Hostels</p>
        </div>
      </div>
    </footer>
  );
}