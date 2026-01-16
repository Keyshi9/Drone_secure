import React from "react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

export default function ExportPage() {
  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Drone Secure - Export Configuration", 20, 25);

    pdf.setFontSize(12);
    pdf.text("Système : EN LIGNE", 20, 45);
    pdf.text("Antennes : 2 / 2", 20, 55);
    pdf.text("Menaces : 1", 20, 65);

    pdf.text("Sensibilité : 75", 20, 85);
    pdf.text("Portée : 2.5 km", 20, 95);
    pdf.text("Alertes automatiques : ON", 20, 105);

    pdf.save("drone-secure-export.pdf");
  };

  const exportCSV = () => {
    const csv = `Paramètre,Valeur
Système,EN LIGNE
Antennes,2/2
Menaces,1
Sensibilité,75
Portée,2.5 km
Alertes automatiques,ON
`;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "drone-secure-export.csv");
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-[420px]">
        <h2 className="text-xl font-bold text-white mb-6">Export des données</h2>

        <div className="flex gap-4">
          <button
            onClick={exportPDF}
            className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-xl font-semibold"
          >
            Export PDF
          </button>

          <button
            onClick={exportCSV}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 transition-all py-3 rounded-xl font-semibold"
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
