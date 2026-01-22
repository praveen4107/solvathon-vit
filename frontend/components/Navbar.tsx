"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Orbitron, Rajdhani } from "next/font/google";

/* ---------- GOOGLE FONTS ---------- */
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/problems", label: "Problems" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-cyan-500/30"
          : "bg-black/60 backdrop-blur border-b border-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <a
            href="/"
            className={`relative flex items-center gap-2 sm:gap-3 group ${orbitron.className}`}
          >
            {/* VIT Logo */}
            <img 
              src="/vitlogo.svg" 
              alt="VIT Logo" 
              className="h-8 sm:h-10 w-auto transition-all duration-700 group-hover:scale-110"
              style={{
                filter: 'brightness(0) saturate(100%) invert(64%) sepia(85%) saturate(2086%) hue-rotate(157deg) brightness(101%) contrast(101%)',
              }}
            />
            
            {/* Vertical Divider */}
            <div className="hidden xs:block h-8 sm:h-10 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-60" />
            
            <span
  className="
    text-sm sm:text-base font-extrabold tracking-wider
    text-transparent bg-clip-text
    bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400
    bg-[length:200%_200%] bg-left
    transition-[background-position] duration-700 ease-out
    group-hover:bg-right
  "
>
  SOLVATHON'26
</span>

          </a>

          {/* DESKTOP NAV */}
          <div className={`hidden md:flex items-center gap-1 ${rajdhani.className}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 border border-transparent group-hover:border-cyan-500/40 transition-all" />
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all" />
              </a>
            ))}

            {/* REGISTER */}
            <a
  href="/register"
  className={`
    ml-2 px-6 py-2 text-sm font-bold uppercase tracking-wider text-black
    relative overflow-hidden
    bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500
    bg-[length:200%_200%] bg-left
    transition-[background-position,box-shadow] duration-500 ease-out
    hover:bg-right
    hover:shadow-[0_0_16px_rgba(34,211,238,0.4)]
    ${orbitron.className}
  `}
>
  Register
</a>

          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-cyan-400 hover:text-blue-400 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <FontAwesomeIcon icon={faXmark} className="w-6 h-6" /> : <FontAwesomeIcon icon={faBars} className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 border-t border-cyan-500/30" : "max-h-0"
        }`}
      >
        <div
          className={`px-4 py-4 space-y-2 bg-black/90 backdrop-blur-xl ${rajdhani.className}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block relative px-4 py-3 text-gray-300 hover:text-cyan-400 border border-gray-700 hover:border-cyan-500/40 transition group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition" />
                {link.label}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-yellow-500/0 group-hover:from-amber-500/10 group-hover:to-yellow-500/10 transition" />
            </a>
          ))}

          <a
            href="/register"
            onClick={() => setIsOpen(false)}
            className={`block mt-4 px-4 py-3 text-center font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.02] transition ${orbitron.className}`}
          >
            Register
          </a>
        </div>
      </div>

      {/* GLOW LINE */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      )}
    </nav>
  );
}
