"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Orbitron, Rajdhani } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border border-cyan-500/30 bg-black/60 ${rajdhani.className}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition"
      >
        <span
          className={`${orbitron.className} text-sm sm:text-base text-cyan-400`}
        >
          {question}
        </span>

        <ChevronDown
          className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pt-4 pb-4 text-sm sm:text-base text-gray-300">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
