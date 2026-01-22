"use client";

import { useState } from "react";
import { User, Mail, Phone, Home, Users, Rocket, ChevronDown, Crown } from "lucide-react";
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
  is_leader: boolean;
};

export default function RegisterPage() {
  const [teamName, setTeamName] = useState("");
  const [memberCount, setMemberCount] = useState<number>(2);

  const [leader, setLeader] = useState<Member>({
    registration_number: "",
    name: "",
    email: "",
    phone: "",
    hostel_block: "",
    room_no: "",
    is_leader: true,
  });

  const [members, setMembers] = useState<Member[]>([
    {
      registration_number: "",
      name: "",
      email: "",
      phone: "",
      hostel_block: "",
      room_no: "",
      is_leader: false,
    },
  ]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ---------- INPUT HANDLER ---------- */
  const updateLeader = (key: keyof Member, value: string | boolean) => {
    setLeader((prev) => ({ ...prev, [key]: value }));
  };

  const updateMember = (index: number, key: keyof Member, value: string | boolean) => {
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
        is_leader: false,
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
      const endpoint = "/api/register/team/";
      const payload = {
        team_name: teamName,
        hostel_block: leader.hostel_block,
        members: [leader, ...members],
      };

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
              const memberErrors: string[] = [];
              
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
        is_leader: true,
      });
      setMembers([
        {
          registration_number: "",
          name: "",
          email: "",
          phone: "",
          hostel_block: "",
          room_no: "",
          is_leader: false,
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
        <div className="absolute top-20 left-1/4 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-cyan-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-500/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* HEADER */}
        <div className="text-center mb-8 sm:mb-10 space-y-3 sm:space-y-4">
          <h1
            className={`${orbitron.className} text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 leading-[1.25] pb-1`}
            style={{
              textShadow: "0 0 20px rgba(34, 211, 238, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)",
            }}
          >
            Register for SOLVATHON'26
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Inter-Hostel Team Hackathon · VIT Chennai Hostels
          </p>
        </div>

        {/* FORM */}
        <Card title="Team Registration">
          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            {/* TEAM NAME */}
            <div>
              <label className="text-xs sm:text-sm text-gray-300 mb-1 block font-semibold">Team Name</label>
              <div className="relative">
                <Users className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter your team name (unique)"
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
                  className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base appearance-none"
                >
                  <option value={2}>2 members (1 Leader + 1 Member)</option>
                  <option value={3}>3 members (1 Leader + 2 Members)</option>
                  <option value={4}>4 members (1 Leader + 3 Members)</option>
                  <option value={5}>5 members (1 Leader + 4 Members)</option>
                  <option value={6}>6 members (1 Leader + 5 Members)</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* TEAM LEADER SECTION */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                <Crown className="w-4 h-4 text-blue-400" />
                Team Leader Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Registration Number</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <input
                      value={leader.registration_number}
                      onChange={(e) => updateLeader("registration_number", e.target.value)}
                      maxLength={9}
                      className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                      placeholder="Registration Number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <input
                      value={leader.name}
                      onChange={(e) => updateLeader("name", e.target.value)}
                      className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                      placeholder="Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <input
                      value={leader.email}
                      onChange={(e) => updateLeader("email", e.target.value)}
                      className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <input
                      value={leader.phone}
                      onChange={(e) => updateLeader("phone", e.target.value)}
                      maxLength={10}
                      className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Hostel Block</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 pointer-events-none" />
                    <select
                      value={leader.hostel_block}
                      onChange={(e) => updateLeader("hostel_block", e.target.value)}
                      className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base appearance-none"
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
                    className="w-full bg-black border border-cyan-500/40 px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                    placeholder="Room No"
                  />
                </div>
              </div>
            </div>

            {/* OTHER MEMBERS SECTION */}
            {members.map((member, idx) => (
                <div key={idx}>
                  <h3 className="text-sm md:text-base font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                    Member {idx + 2} Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Registration Number</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                        <input
                          value={member.registration_number}
                          onChange={(e) => updateMember(idx, "registration_number", e.target.value)}
                          maxLength={9}
                          className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                          placeholder="Registration Number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                        <input
                          value={member.name}
                          onChange={(e) => updateMember(idx, "name", e.target.value)}
                          className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                          placeholder="Name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                        <input
                          value={member.email}
                          onChange={(e) => updateMember(idx, "email", e.target.value)}
                          className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                        <input
                          value={member.phone}
                          onChange={(e) => updateMember(idx, "phone", e.target.value)}
                          maxLength={10}
                          className="w-full bg-black border border-cyan-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                          placeholder="Phone"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Hostel Block</label>
                      <div className="relative">
                        <Home className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 pointer-events-none" />
                        <select
                          value={member.hostel_block}
                          onChange={(e) => updateMember(idx, "hostel_block", e.target.value)}
                          className="w-full bg-black border border-amber-500/40 pl-10 sm:pl-11 pr-4 py-3 focus:outline-none focus:border-amber-400 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 text-sm sm:text-base appearance-none"
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
                        className="w-full bg-black border border-cyan-500/40 px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm sm:text-base"
                        placeholder="Room No"
                      />
                    </div>
                  </div>
                </div>
              ))}

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            {success && <p className="text-green-400 text-sm text-center">Registration successful! 🎉</p>}

            <div className="pt-4 sm:pt-6 text-center">
              <button
                type="submit"
                disabled={loading}
                className={`${orbitron.className} relative inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 uppercase tracking-wider font-bold hover:scale-105 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] overflow-hidden group/btn text-black`}
              >
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-y-[-2px]" />
                  {loading ? "Submitting..." : "Register Team"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </button>

              <div className="text-xs text-gray-500 mt-4 sm:mt-6 space-y-1">
                <p>✓ Team Size: 2-6 members (1 leader + 1-5 members)</p>
                <p>✓ All must use @vitstudent.ac.in email</p>
                <p>✓ All members from same hostel block</p>
                <p>✓ Only A, C, D1 & D2 Blocks are eligible</p>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
