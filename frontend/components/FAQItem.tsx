"use client";

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
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
      className={`relative border border-cyan-500/30 bg-black/60 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 group ${rajdhani.className}`}
    >
      {/* Corner accent on hover */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <span
          className={`${orbitron.className} text-sm sm:text-base text-cyan-400 group-hover:text-blue-400 transition-colors`}
        >
          {question}
        </span>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={`w-5 h-5 text-cyan-400 transition-all duration-300 ${
            open ? "rotate-180 text-blue-400" : ""
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
          <div className="px-5 pt-4 pb-4 text-sm sm:text-base text-gray-300 border-t border-cyan-500/20">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
