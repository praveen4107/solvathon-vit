"use client";

import { useEffect, useState } from "react";
import Card from "../../../components/Card";
import { adminFetch, adminDelete } from "../utils/api";
import * as XLSX from "xlsx";
import { Download, Filter, Trash2 } from "lucide-react";

const HOSTEL_BLOCKS = ["All Blocks", "A Block", "C Block", "D1 Block", "D2 Block"];

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string>("All Blocks");

  useEffect(() => {
    adminFetch("/api/admin/teams/").then((res) => setTeams(res.data));
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
    <div className="space-y-6">
      {/* Filter and Export Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-black/40 border border-cyan-500/30 p-4">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-cyan-400" />
          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="bg-black border border-cyan-500/40 px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
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
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition text-sm font-semibold"
        >
          <Download className="w-4 h-4" />
          Export to Excel
        </button>
      </div>

      {filteredTeams.map((t) => (
        <Card key={t.id} title={t.team_name}>
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm text-gray-400">
              {t.member_count} members · {t.hostel_block}
            </p>
            <button
              onClick={() => handleDeleteTeam(t.id, t.team_name)}
              className="flex items-center gap-1 px-3 py-1 text-xs text-red-400 border border-red-500/40 hover:bg-red-500/10 transition"
              title="Delete team"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>

          <button
            onClick={() => setOpen(open === t.id ? null : t.id)}
            className="text-cyan-400 text-sm mb-3"
          >
            {open === t.id ? "Hide Members" : "View Members"}
          </button>

          {open === t.id && (
            <TeamMembers teamId={t.id} />
          )}
        </Card>
      ))}
    </div>
  );
}

function TeamMembers({ teamId }: { teamId: number }) {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    adminFetch(`/api/admin/teams/${teamId}/`).then((res) =>
      setMembers(res.data.members)
    );
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="text-purple-400">
          <tr>
            <th>Reg No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-t border-purple-500/20">
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
