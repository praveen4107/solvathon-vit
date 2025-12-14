"use client";

import { useState } from "react";
import { User, Mail, Phone, Home, Users, Rocket, ChevronDown } from "lucide-react";
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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

type Member = {
  registration_number: string;
  name: string;
  email: string;
  phone: string;
  hostel_block: string;
  room_no: string;
};

export default function RegisterPage() {
  const [mode, setMode] = useState<"individual" | "team">("team");
  const [teamName, setTeamName] = useState("");
  const [memberCount, setMemberCount] = useState<number>(2);

  const [leader, setLeader] = useState<Member>({
    registration_number: "",
    name: "",
    email: "",
    phone: "",
    hostel_block: "",
    room_no: "",
  });

  const [members, setMembers] = useState<Member[]>([
    {
      registration_number: "",
      name: "",
      email: "",
      phone: "",
      hostel_block: "",
      room_no: "",
    },
  ]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ---------- INPUT HANDLER ---------- */
  const updateLeader = (key: keyof Member, value: string) => {
    setLeader((prev) => ({ ...prev, [key]: value }));
  };

  const updateMember = (index: number, key: keyof Member, value: string) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const handleMemberCountChange = (count: number) => {
    setMemberCount(count);
    const newMembers = Array.from({ length: count - 1 }, (_, i) => {
      if (members[i]) return members[i];
      return {
        registration_number: "",
        name: "",
        email: "",
        phone: "",
        hostel_block: "",
        room_no: "",
      };
    });
    setMembers(newMembers);
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      let endpoint = "";
      let payload: any = {};

      if (mode === "individual") {
        endpoint = "/api/register/individual/";
        payload = leader;
      } else {
        endpoint = "/api/register/team/";
        payload = {
          team_name: teamName,
          hostel_block: leader.hostel_block,
          members: [leader, ...members],
        };
      }

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let errorMessage = "Registration failed";
        
        // Try to extract error message from various possible locations
        if (data.error) {
          errorMessage = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
        } else if (data.errors) {
          if (typeof data.errors === "string") {
            errorMessage = data.errors;
          } else if (typeof data.errors === "object") {
            // Handle nested member errors (members[i].fieldName[0])
            if (data.errors.members && Array.isArray(data.errors.members)) {
              const memberErrors = [];
              
              // Check if it's a direct string error (e.g., "All team members must belong to the same hostel block.")
              if (data.errors.members.some((item: any) => typeof item === "string")) {
                data.errors.members.forEach((error: any) => {
                  if (typeof error === "string") {
                    memberErrors.push(error);
                  }
                });
              } else {
                // Handle nested field errors (members[i].fieldName[0])
                data.errors.members.forEach((member: any, idx: number) => {
                  if (typeof member === "object" && Object.keys(member).length > 0) {
                    Object.entries(member).forEach(([field, errors]: [string, any]) => {
                      if (Array.isArray(errors)) {
                        memberErrors.push(`Member ${idx + 1}, ${field}: ${errors[0]}`);
                      } else if (typeof errors === "string") {
                        memberErrors.push(`Member ${idx + 1}, ${field}: ${errors}`);
                      }
                    });
                  }
                });
              }
              
              if (memberErrors.length > 0) {
                errorMessage = memberErrors.join(" | ");
              }
            } else {
              // Handle simple field errors
              const firstErrorKey = Object.keys(data.errors)[0];
              const firstErrorValue = data.errors[firstErrorKey];
              if (Array.isArray(firstErrorValue)) {
                errorMessage = firstErrorValue[0] || errorMessage;
              } else if (typeof firstErrorValue === "string") {
                errorMessage = firstErrorValue;
              } else if (typeof firstErrorValue === "object") {
                errorMessage = JSON.stringify(firstErrorValue);
              }
            }
          }
        }
        
        // Set error state instead of throwing to avoid Next.js error boundary
        setError(errorMessage);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTeamName("");
      setMemberCount(2);
      setLeader({
        registration_number: "",
        name: "",
        email: "",
        phone: "",
        hostel_block: "",
        room_no: "",
      });
      setMembers([
        {
          registration_number: "",
          name: "",
          email: "",
          phone: "",
          hostel_block: "",
          room_no: "",
        },
      ]);
      setLoading(false);
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

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
          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            {mode === "team" && (
              <>
                {/* TEAM NAME */}
                <div>
                  <label className="text-xs sm:text-sm text-gray-300 mb-1 block font-semibold">Team Name</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <input
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                      placeholder="Enter team name"
                      required
                    />
                  </div>
                </div>

                {/* MEMBER COUNT SELECTOR */}
                <div>
                  <label className="text-xs sm:text-sm text-gray-300 mb-1 block font-semibold">
                    Number of Team Members
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 pointer-events-none" />
                    <select
                      value={memberCount}
                      onChange={(e) => handleMemberCountChange(Number(e.target.value))}
                      className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base appearance-none"
                    >
                      <option value={2}>2 members (Team Leader + 1)</option>
                      <option value={3}>3 members (Team Leader + 2)</option>
                      <option value={4}>4 members (Team Leader + 3)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            {/* LEADER / INDIVIDUAL SECTION */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                {mode === "team" ? "Team Leader Details" : "Your Details"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  ["registration_number", "Registration Number", User, 9],
                  ["name", "Name", User],
                  ["email", "Email", Mail],
                  ["phone", "Phone", Phone, 10],
                ].map(([key, label, Icon, max]) => (
                  <div key={key as string}>
                    <label className="text-xs sm:text-sm text-gray-300 mb-1 block">{label}</label>
                    <div className="relative">
                      <Icon className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                      <input
                        value={(leader as any)[key]}
                        onChange={(e) => updateLeader(key as any, e.target.value)}
                        maxLength={max as any}
                        className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Hostel Block</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-orange-400 pointer-events-none" />
                    <select
                      value={leader.hostel_block}
                      onChange={(e) => updateLeader("hostel_block", e.target.value)}
                      className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base appearance-none"
                      required
                    >
                      <option value="">Select block</option>
                      <option>A Block</option>
                      <option>C Block</option>
                      <option>D1 Block</option>
                      <option>D2 Block</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Room No</label>
                  <input
                    value={leader.room_no}
                    onChange={(e) => updateLeader("room_no", e.target.value)}
                    className="w-full bg-black border border-cyan-500/40 px-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* OTHER MEMBERS SECTION */}
            {mode === "team" &&
              members.map((member, idx) => (
                <div key={idx}>
                  <h3 className="text-sm md:text-base font-semibold text-purple-300 mb-4 flex items-center gap-2">
                    Member {idx + 2} Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {[
                      ["registration_number", "Registration Number", User, 9],
                      ["name", "Name", User],
                      ["email", "Email", Mail],
                      ["phone", "Phone", Phone, 10],
                    ].map(([key, label, Icon, max]) => (
                      <div key={key as string}>
                        <label className="text-xs sm:text-sm text-gray-300 mb-1 block">{label}</label>
                        <div className="relative">
                          <Icon className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                          <input
                            value={(member as any)[key]}
                            onChange={(e) => updateMember(idx, key as any, e.target.value)}
                            maxLength={max as any}
                            className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                            required
                          />
                        </div>
                      </div>
                    ))}

                    <div>
                      <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Hostel Block</label>
                      <div className="relative">
                        <Home className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-orange-400 pointer-events-none" />
                        <select
                          value={member.hostel_block}
                          onChange={(e) => updateMember(idx, "hostel_block", e.target.value)}
                          className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base appearance-none"
                          required
                        >
                          <option value="">Select block</option>
                          <option>A Block</option>
                          <option>C Block</option>
                          <option>D1 Block</option>
                          <option>D2 Block</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Room No</label>
                      <input
                        value={member.room_no}
                        onChange={(e) => updateMember(idx, "room_no", e.target.value)}
                        className="w-full bg-black border border-cyan-500/40 px-4 py-3 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
              ))}

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            {success && <p className="text-green-400 text-sm text-center">Registration successful!</p>}

            <div className="pt-4 sm:pt-6 text-center">
              <button
                type="submit"
                disabled={loading}
                className={`${orbitron.className} inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 uppercase tracking-wider font-bold hover:scale-105 transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                {loading ? "Submitting..." : "Submit Registration"}
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
