"use client";

import { useEffect, useState } from "react";
import { adminFetch, adminDelete } from "../../../app/admin/utils/api";
import * as XLSX from "xlsx";

const HOSTEL_BLOCKS = ["All Blocks", "A Block", "C Block", "D1 Block", "D2 Block"];

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string>("All Blocks");

  useEffect(() => {
    adminFetch("/api/admin/teams/").then((res: any) => setTeams(res.data));
  }, []);

  const filteredTeams = selectedBlock === "All Blocks" 
    ? teams 
    : teams.filter(t => t.hostel_block === selectedBlock);

  const exportToExcel = async () => {
    // Fetch all team members for all teams
    const teamsWithMembers = await Promise.all(
      filteredTeams.map(async (team) => {
        const res = await adminFetch(`/api/admin/teams/${team.id}/`);
        return { ...team, members: res.data.members };
      })
    );

    // Flatten data for Excel
    const excelData: any[] = [];
    teamsWithMembers.forEach((team) => {
      team.members.forEach((member: any, idx: number) => {
        excelData.push({
          "Team Name": team.team_name,
          "Team Block": team.hostel_block,
          "Member Role": idx === 0 ? "Team Leader" : `Member ${idx + 1}`,
          "Registration Number": member.registration_number,
          "Name": member.name,
          "Email": member.email,
          "Phone": member.phone,
          "Member Block": member.hostel_block,
          "Room No": member.room_no || "-",
          "Team Created": new Date(team.created_at).toLocaleDateString(),
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Set column widths
    worksheet["!cols"] = [
      { wch: 20 }, // Team Name
      { wch: 12 }, // Team Block
      { wch: 15 }, // Member Role
      { wch: 18 }, // Registration Number
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 12 }, // Phone
      { wch: 12 }, // Member Block
      { wch: 10 }, // Room No
      { wch: 15 }, // Team Created
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");
    
    const filename = selectedBlock === "All Blocks" 
      ? "SOLVATHON26_All_Teams.xlsx"
      : `SOLVATHON26_Teams_${selectedBlock.replace(" ", "_")}.xlsx`;
    
    XLSX.writeFile(workbook, filename);
  };

  const handleDeleteTeam = async (teamId: number, teamName: string) => {
    if (!confirm(`⚠️ WARNING: Are you sure you want to delete team "${teamName}"?\n\nThis will permanently delete the team and all its members. This action cannot be undone.`)) {
      return;
    }

    const result = await adminDelete(`/api/admin/teams/${teamId}/delete/`);
    if (result.success) {
      // Remove from state
      setTeams(teams.filter(t => t.id !== teamId));
      alert(`✓ Team "${teamName}" has been deleted successfully.`);
    } else {
      alert("Failed to delete team. Please try again.");
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6 text-white">
      <a href="/admin" className="inline-block text-sm text-gray-300 hover:text-white mb-4">← Back to Dashboard</a>

      {/* Filter and Export Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-md border border-gray-700 bg-neutral-900 p-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-300">Filter:</label>
          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="bg-neutral-950 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          >
            {HOSTEL_BLOCKS.map((block) => (
              <option key={block} value={block}>
                {block}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-400">
            {filteredTeams.length} team{filteredTeams.length !== 1 ? "s" : ""}
          </span>
        </div>

        <button
          onClick={exportToExcel}
          className="rounded-md bg-white/10 hover:bg-white/20 px-4 py-2 text-sm"
        >
          Export to Excel
        </button>
      </div>

      {filteredTeams.map((t) => (
        <section key={t.id} className="rounded-md border border-gray-700 bg-neutral-900 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-lg font-medium">{t.team_name}</h2>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span>{t.member_count} members</span>
              <span>·</span>
              <span>{t.hostel_block}</span>
              <button
                onClick={() => handleDeleteTeam(t.id, t.team_name)}
                className="text-red-400 hover:text-red-300"
                title="Delete team"
              >
                Delete
              </button>
            </div>
          </div>

          <button
            onClick={() => setOpen(open === t.id ? null : t.id)}
            className="mt-3 text-sm text-gray-300 hover:text-white"
          >
            {open === t.id ? "Hide Members" : "View Members"}
          </button>

          {open === t.id && (
            <TeamMembers teamId={t.id} />
          )}
        </section>
      ))}
    </main>
  );
}

function TeamMembers({ teamId }: { teamId: number }) {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    adminFetch(`/api/admin/teams/${teamId}/`).then((res: any) =>
      setMembers(res.data.members)
    );
  }, []);

  return (
    <div className="overflow-x-auto mt-3">
      <table className="min-w-full text-sm">
        <thead className="text-gray-300">
          <tr>
            <th>Reg No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody className="text-gray-200">
          {members.map((m) => (
            <tr key={m.id} className="border-t border-gray-700">
              <td>{m.registration_number}</td>
              <td>{m.name}</td>
              <td>{m.phone}</td>
              <td>{m.room_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
