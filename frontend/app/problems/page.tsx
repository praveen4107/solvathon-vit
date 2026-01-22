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
      title: "Water Quality & Supply Management",
      code: "SVT-001",
      category: "IoT / Smart Systems",
      description:
        "Real-time monitoring of hostel water tanks (level, quality, flow). Alert system for low levels, contamination, and anomalies. Predictive refill notifications and usage analytics dashboard.",
    },
    {
      title: "Food Wastage Minimization System",
      code: "SVT-002",
      category: "AI / Optimization",
      description:
        "Track food prepared, served, and wasted in real-time. Predict demand using attendance and preferences. Alert on overproduction with analytics dashboard for optimized mess operations.",
    },
    {
      title: "Campus Animal Alert System",
      code: "SVT-003",
      category: "Safety / Mobile",
      description:
        "Real-time reporting and location-based alerts for animal (monkey) intrusions. Incident logging, hotspot pattern analysis, and monitoring dashboard for faster response and prevention.",
    },
    {
      title: "Happy Index - Mental Well-Being Tracker",
      code: "SVT-004",
      category: "Health / Privacy-First",
      description:
        "Privacy-first daily mood logging system. Trend analysis with counselor alerts for consistent low scores. Anonymized dashboard to track overall student mental well-being.",
    },
    {
      title: "Laundry Automation & Tracking",
      code: "SVT-005",
      category: "Automation / Mobile",
      description:
        "Real-time laundry status tracking with online clothes tagging. Completion notifications, queue estimation, and analytics dashboard to reduce lost clothes and delays.",
    },
    {
      title: "Library Attendance & Token Automation",
      code: "SVT-006",
      category: "Automation / Access Control",
      description:
        "Digital attendance via QR/RFID/app replacing manual tokens. Automated slot allocation, real-time occupancy tracking, entry/exit logs, and usage analytics dashboard.",
    },
    {
      title: "Waste Classification & Management",
      code: "SVT-007",
      category: "Sustainability / AI",
      description:
        "Real-time waste classification (biodegradable/recyclable/non-recyclable). Student guidance system, improper disposal alerts, and comprehensive waste analytics dashboard.",
    },
    {
      title: "Late Monitoring System",
      code: "SVT-008",
      category: "Management / Analytics",
      description:
        "Digital logging of student outing return times. Automated delay calculation, repeated lateness alerts, searchable history, and pattern analysis to optimize outing policies.",
    },
    {
      title: "Restroom Water Wastage Detection",
      code: "SVT-009",
      category: "IoT / Sustainability",
      description:
        "Track water flow per restroom. Detect leaks and continuous flow. Real-time alerts for wastage, usage reports, and monitoring dashboard for maintenance teams.",
    },
    {
      title: "Activity Recognition & Safety",
      code: "SVT-010",
      category: "AI / Security",
      description:
        "Real-time movement analysis in common areas. Detect unusual or unsafe behavior. Instant alerts for security, high-risk zone analytics with privacy-preserving design.",
    },
    {
      title: "Room Rating & Cleanliness System",
      code: "SVT-011",
      category: "Feedback / Management",
      description:
        "Anonymous student ratings for room cleanliness. Trend analysis and alerts for consistently low-rated rooms. Authority dashboard for tracking and improving hygiene standards.",
    },
  ];

  return (
    <div className={`min-h-screen bg-black text-white ${rajdhani.className} relative overflow-hidden`}>
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px"
      }} />
      
      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-16 left-1/4 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-cyan-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-16 right-1/4 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-500/5 blur-3xl rounded-full" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14 space-y-4">
          <h1
            className={`${orbitron.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400`}
            style={{
              textShadow: "0 0 20px rgba(34, 211, 238, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)",
            }}
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