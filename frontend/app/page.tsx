"use client";

import { useState, useEffect } from "react";
import {
  Zap,
  Trophy,
  Users,
  Clock,
  Code,
  Shield,
  Cpu,
  Rocket,
} from "lucide-react";
import Card from "../components/Card";
import FAQItem from "../components/FAQItem";
import ThemeCard from "../components/ThemeCard";

import { Orbitron, Rajdhani } from "next/font/google";
import { Press_Start_2P } from "next/font/google";

/* ---------- GOOGLE FONTS ---------- */
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [glitchText, setGlitchText] = useState("SOLVATHON'26");
  const [activeBlock, setActiveBlock] = useState<number | null>(null);

  /* ---------- COUNTDOWN ---------- */
  useEffect(() => {
    const eventDate = new Date("2026-01-15T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    const glitchInterval = setInterval(() => {
      const chars = "SOLVATHON'26@#$%";
      const glitched = "SOLVATHON'26"
        .split("")
        .map((c) => (Math.random() > 0.9 ? chars[Math.floor(Math.random() * chars.length)] : c))
        .join("");
      setGlitchText(glitched);
      setTimeout(() => setGlitchText("SOLVATHON'26"), 120);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  const blocks = [
    { name: "A Block", grad: "from-cyan-500/20 to-blue-500/20", color: "from-cyan-400 to-blue-400", icon: "" },
    { name: "C Block", grad: "from-purple-500/20 to-pink-500/20", color: "from-purple-400 to-pink-400", icon: "" },
    { name: "D1 Block", grad: "from-green-500/20 to-emerald-500/20", color: "from-green-400 to-emerald-400", icon: "" },
    { name: "D2 Block", grad: "from-orange-500/20 to-red-500/20", color: "from-orange-400 to-red-400", icon: "" },
  ];

  const stats = [
    { icon: <Users />, value: "200+", label: "Participants" },
    { icon: <Trophy />, value: "₹50K", label: "Prize Pool" },
    { icon: <Clock />, value: "24 Hrs", label: "Duration" },
    { icon: <Code />, value: "3+", label: "Problems" },
  ];

  return (
    <div className={`min-h-screen bg-black text-white ${rajdhani.className}`}>
      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-cyan-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* HERO */}
        <section className="text-center space-y-6 mb-16 sm:mb-20">
          <h1
            className={`${pressStart2P.className} text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-8 sm:mt-10 mb-6 sm:mb-8 md:mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400`}
          >
            {glitchText}
          </h1>

          <div className="flex justify-center items-center gap-2 text-gray-300 text-base sm:text-lg">
            <Zap className="text-cyan-400 w-4 h-4 sm:w-5 sm:h-5" />
            <span>Code. Compete. Conquer.</span>
            <Zap className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base">
            VIT Chennai Inter-Hostel Hackathon <br />
            <span className="text-cyan-400">A • C • D1 • D2 Blocks</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:pt-6 ">
            <a
              href="/register"
              className="px-8 md:px-16 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 font-bold uppercase tracking-wide hover:scale-105 transition"
            >
              <span className="flex items-center gap-2">
                <Rocket /> Register
              </span>
            </a>

            <a
              href="/problems"
              className="px-8 md:px-16 py-4 border-2 border-cyan-500 hover:border-purple-500 transition uppercase font-bold"
            >
              <span className="flex items-center gap-2">
                <Shield /> Problems
              </span>
            </a>
          </div>
        </section>

        {/* COUNTDOWN */}
        <Card title="Event Countdown">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="flex flex-col items-center">
                <div
                  className={`${orbitron.className} text-2xl xs:text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400`}
                >
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm uppercase text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* STATS */}
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-16 sm:my-20">
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative border border-cyan-500/30 p-4 sm:p-6 text-center bg-black/50 backdrop-blur-sm hover:border-cyan-400 transition group"
            >
              {/* Small square accent – top right (hover only) */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="text-cyan-400 flex justify-center mb-2">
                {s.icon}
              </div>

              <div className={`${orbitron.className} text-xl sm:text-2xl font-bold`}>
                {s.value}
              </div>

              <div className="text-xs sm:text-sm text-gray-400 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* BLOCKS */}
        <section className="my-16 sm:my-20">
          <h2
            className={`${orbitron.className} text-2xl sm:text-3xl text-center mb-6 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400`}
          >
            Competing Blocks
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {blocks.map((b, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveBlock(i)}
                onMouseLeave={() => setActiveBlock(null)}
                className={`relative p-4 sm:p-6 text-center border transition ${
                  activeBlock === i ? "border-cyan-400 scale-105" : "border-cyan-500/30"
                } bg-gradient-to-br ${b.grad}`}
              >
                <div className="text-2xl sm:text-4xl mb-2">{b.icon}</div>
                <div
                  className={`${orbitron.className} text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${b.color}`}
                >
                  {b.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THEMES & PROBLEM STATEMENTS */}
        <section className="my-20 sm:my-24 lg:my-28">
          <h2
            className={`${orbitron.className} text-2xl sm:text-3xl text-center mb-8 sm:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400`}
          >
            Themes & Problem Statements
          </h2>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ThemeCard
              title="AI & Automation"
              description="Leverage artificial intelligence to improve hostel life and operations."
              accent="from-cyan-400 to-blue-400"
              problems={[
                "Smart complaint classification and routing",
                "Predictive mess crowd management",
                "Automated maintenance issue detection",
              ]}
            />

            <ThemeCard
              title="Cyber Security"
              description="Enhance safety, privacy, and access control within hostels."
              accent="from-purple-400 to-pink-400"
              problems={[
                "Secure hostel entry system",
                "Anomaly detection in access logs",
                "Privacy-first surveillance solutions",
              ]}
            />

            <ThemeCard
              title="Smart Systems"
              description="Build intelligent systems that optimize daily hostel activities."
              accent="from-green-400 to-emerald-400"
              problems={[
                "Energy and water usage optimization",
                "Smart room allocation system",
                "IoT-based utility monitoring",
              ]}
            />

            <ThemeCard
              title="Student Productivity"
              description="Tools that help students manage time, tasks, and collaboration."
              accent="from-orange-400 to-red-400"
              problems={[
                "Study group coordination platform",
                "Hostel-centric task management app",
                "Peer learning & mentorship systems",
              ]}
            />

            <ThemeCard
              title="Open Innovation"
              description="Have an idea outside the listed domains? Build it."
              accent="from-cyan-400 to-purple-400"
              problems={[
                "Any impactful hostel-related solution",
                "Cross-domain innovative ideas",
                "Solutions improving student experience",
              ]}
            />
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="my-20 sm:my-24 max-w-4xl mx-auto">
          <h2
            className={`${orbitron.className} text-2xl sm:text-3xl text-center mb-6 sm:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400`}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-3 sm:space-y-4">
            <FAQItem
              question="Who can participate in SOLVATHON'26?"
              answer="SOLVATHON'26 is exclusively open to VIT Chennai hostellers from A Block, C Block, D1 Block, and D2 Block."
            />

            <FAQItem
              question="Is this a team or individual hackathon?"
              answer="You can participate either individually or as a team, depending on the problem statement requirements."
            />

            <FAQItem
              question="How long is the hackathon?"
              answer="The hackathon runs for a continuous 24 hours, starting on 15th January 2026."
            />

            <FAQItem
              question="Do we need prior hackathon experience?"
              answer="No prior hackathon experience is required. SOLVATHON'26 is beginner-friendly and encourages learning and collaboration."
            />

            <FAQItem
              question="What tech stack can we use?"
              answer="You are free to use any technology stack, programming language, or framework unless otherwise specified in the problem statement."
            />
          </div>
        </section>
        
        {/* FINAL CTA */}
        <section className="mt-16 sm:mt-20 md:mt-24 flex flex-col xs:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
            Ready to make your mark?
          </p>
          <a
            href="/register"
            className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-gradient-to-r from-cyan-500 to-purple-500 font-bold uppercase tracking-wider hover:scale-105 transition text-sm sm:text-base"
          >
            Join the Battle
          </a>
        </section>

      </div>
    </div>
  );
}


{/*

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 font-bold uppercase tracking-wide hover:scale-105 transition"
            >
              <span className="flex items-center gap-2">
                <Rocket /> Register
              </span>
            </a>

            <a
              href="/problems"
              className="px-8 py-4 border-2 border-cyan-500 hover:border-purple-500 transition uppercase font-bold"
            >
              <span className="flex items-center gap-2">
                <Shield /> Problems
              </span>
            </a>
          </div>

*/}


{
/*

<div className="flex flex-col xs:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 font-bold uppercase tracking-wide hover:scale-105 transition text-sm sm:text-base"
            >
              <span className="flex items-center gap-2">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5" /> Register
              </span>
            </a>

            <a
              href="/problems"
              className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-cyan-500 hover:border-purple-500 transition uppercase font-bold text-sm sm:text-base"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" /> Problems
              </span>
            </a>
          </div>

*/
}