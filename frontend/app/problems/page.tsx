"use client";

import ProblemCard from "../../components/ProblemCard";
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

export default function Problems() {
  const problems = [
    {
      title: "Smart Campus Navigation",
      code: "SVT-001",
      category: "AR / Mobile",
      description:
        "Build an intelligent or AR-based solution to help students navigate hostel blocks, facilities, and common areas efficiently.",
    },
    {
      title: "Hostel Resource Optimizer",
      code: "SVT-002",
      category: "AI / Optimization",
      description:
        "Design an AI-driven system to optimize hostel resources such as mess capacity, laundry scheduling, or maintenance workflows.",
    },
    {
      title: "Eco-Hostel Challenge",
      code: "SVT-003",
      category: "Sustainability",
      description:
        "Propose and build sustainable solutions to reduce energy, water, and waste usage within hostel environments.",
    },
    {
      title: "Secure Entry & Monitoring",
      code: "SVT-004",
      category: "Cyber Security",
      description:
        "Create a secure entry, surveillance, or anomaly-detection system to improve hostel safety and access control.",
    },
    {
      title: "Student Productivity Suite",
      code: "SVT-005",
      category: "Developer Tools",
      description:
        "Build tools that improve student productivity, collaboration, or issue reporting inside hostel ecosystems.",
    },
  ];

  return (
    <div className={`min-h-screen bg-black text-white ${rajdhani.className}`}>
      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-16 left-1/4 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-cyan-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-16 right-1/4 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-500/10 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14 space-y-4">
          <h1
            className={`${orbitron.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400`}
          >
            Problem Statements
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base">
            Choose a challenge that resonates with you and build impactful
            solutions for hostel life at VIT Chennai.
          </p>
        </div>

        {/* PROBLEM GRID */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <ProblemCard
              key={p.code}
              title={p.title}
              code={p.code}
              category={p.category}
              description={p.description}
            />
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-12 sm:mt-16 text-center text-gray-500 text-xs sm:text-sm">
          More problem statements may be revealed during the event.
        </div>
      </section>
    </div>
  );
}