"use client";

import { useEffect, useState } from "react";
import Card from "../../../components/Card";
import { adminFetch, adminDelete } from "../utils/api";
import * as XLSX from "xlsx";
import { Download, Filter, Trash2 } from "lucide-react";

const HOSTEL_BLOCKS = ["All Blocks", "A Block", "C Block", "D1 Block", "D2 Block"];

export default function IndividualsPage() {
  const [data, setData] = useState<any[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string>("All Blocks");

  useEffect(() => {
    adminFetch("/api/admin/individuals/").then((res) => setData(res.data));
  }, []);

  const filteredData = selectedBlock === "All Blocks" 
    ? data 
    : data.filter(i => i.hostel_block === selectedBlock);

  const exportToExcel = () => {
    const excelData = filteredData.map((individual) => ({
      "Registration Number": individual.registration_number,
      "Name": individual.name,
      "Email": individual.email,
      "Phone": individual.phone,
      "Hostel Block": individual.hostel_block,
      "Room No": individual.room_no || "-",
      "Registered On": new Date(individual.created_at).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Set column widths
    worksheet["!cols"] = [
      { wch: 18 }, // Registration Number
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 12 }, // Phone
      { wch: 12 }, // Hostel Block
      { wch: 10 }, // Room No
      { wch: 15 }, // Registered On
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Individuals");
    
    const filename = selectedBlock === "All Blocks" 
      ? "SOLVATHON26_All_Individuals.xlsx"
      : `SOLVATHON26_Individuals_${selectedBlock.replace(" ", "_")}.xlsx`;
    
    XLSX.writeFile(workbook, filename);
  };

  const handleDeleteIndividual = async (id: number, name: string, regNumber: string) => {
    if (!confirm(`⚠️ WARNING: Are you sure you want to delete the individual registration?\n\nName: ${name}\nReg No: ${regNumber}\n\nThis action cannot be undone.`)) {
      return;
    }

    const result = await adminDelete(`/api/admin/individuals/${id}/delete/`);
    if (result.success) {
      // Remove from state
      setData(data.filter(i => i.id !== id));
      alert(`✓ Individual registration for "${name}" has been deleted successfully.`);
    } else {
      alert("Failed to delete registration. Please try again.");
    }
  };

  return (
    <Card title="Individuals">
      {/* Filter and Export Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6 bg-black/40 border border-cyan-500/30 p-4">
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
            {filteredData.length} individual{filteredData.length !== 1 ? "s" : ""}
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
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-cyan-400">
            <tr>
              <th className="text-left py-2 px-3">Reg No</th>
              <th className="text-left py-2 px-3">Name</th>
              <th className="text-left py-2 px-3">Phone</th>
              <th className="text-left py-2 px-3">Block</th>
              <th className="text-left py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((i) => (
              <tr key={i.id} className="border-t border-cyan-500/20">
                <td className="py-2 px-3">{i.registration_number}</td>
                <td className="py-2 px-3">{i.name}</td>
                <td className="py-2 px-3">{i.phone}</td>
                <td className="py-2 px-3">{i.hostel_block}</td>
                <td className="py-2 px-3">
                  <button
                    onClick={() => handleDeleteIndividual(i.id, i.name, i.registration_number)}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-red-400 border border-red-500/40 hover:bg-red-500/10 transition"
                    title="Delete registration"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
