import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getHistory } from "../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);

    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load history.");
    }

    setLoading(false);
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) =>
      item.plate_number
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [history, search]);

  // ==========================
  // Export CSV
  // ==========================

  const exportCSV = () => {
    if (filteredHistory.length === 0) {
      alert("No data available.");
      return;
    }

    const headers = [
      "ID",
      "Plate Number",
      "Confidence",
      "Image",
      "Detection Time",
      "Status",
    ];

    const rows = filteredHistory.map((item) => [
      item.id,
      item.plate_number,
      (parseFloat(item.confidence) * 100).toFixed(1) + "%",
      item.image_name,
      item.detection_time,
      item.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "ANPR_History.csv";

    a.click();

    URL.revokeObjectURL(url);
  };

  // ==========================
  // Export PDF
  // ==========================

  const exportPDF = () => {
    if (filteredHistory.length === 0) {
      alert("No data available.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(
      "AI Vehicle Number Plate Recognition Report",
      14,
      20
    );

    doc.setFontSize(11);
    doc.text(
      `Generated : ${new Date().toLocaleString()}`,
      14,
      30
    );

    doc.text(
      `Total Records : ${filteredHistory.length}`,
      14,
      38
    );

    autoTable(doc, {
      startY: 48,

      head: [[
        "ID",
        "Plate",
        "Confidence",
        "Image",
        "Detection Time",
        "Status",
      ]],

      body: filteredHistory.map((item) => [
        item.id,
        item.plate_number,
        (parseFloat(item.confidence) * 100).toFixed(1) + "%",
        item.image_name,
        item.detection_time,
        item.status,
      ]),

      styles: {
        fontSize: 9,
      },

      headStyles: {
        fillColor: [0, 229, 255],
        textColor: [0, 0, 0],
      },
    });

    doc.save("ANPR_Report.pdf");
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#050816",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1
            style={{
              color: "#00e5ff",
              marginBottom: "25px",
            }}
          >
            Detection History
          </h1>

          {/* Toolbar */}

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "25px",
            }}
          >
            <input
              type="text"
              placeholder="Search Number Plate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background: "#111827",
                color: "white",
                fontSize: "16px",
              }}
            />

            <button
              onClick={loadHistory}
              style={{
                background: "#00e5ff",
                color: "#000",
                border: "none",
                padding: "12px 22px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Refresh
            </button>

            <button
              onClick={exportCSV}
              style={{
                background: "#22c55e",
                color: "#000",
                border: "none",
                padding: "12px 22px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Export CSV
            </button>

            <button
              onClick={exportPDF}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "12px 22px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Export PDF
            </button>
          </div>

          <div
            style={{
              color: "#94a3b8",
              marginBottom: "20px",
              fontSize: "18px",
            }}
          >
            Total Detections :{" "}
            <strong>{filteredHistory.length}</strong>
          </div>

          <div
            style={{
              background: "#111827",
              borderRadius: "20px",
              padding: "20px",
              overflowX: "auto",
            }}
          >
            {loading ? (
              <h2 style={{ color: "white" }}>
                Loading...
              </h2>
            ) : filteredHistory.length === 0 ? (
              <h2
                style={{
                  color: "#94a3b8",
                  textAlign: "center",
                }}
              >
                No Detection Found
              </h2>
            ) : (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  color: "white",
                }}
              >
                <thead>
                  <tr
                    style={{
                      color: "#00e5ff",
                      borderBottom: "2px solid #334155",
                    }}
                  >
                    <th style={{ padding: "15px" }}>ID</th>
                    <th style={{ padding: "15px" }}>
                      Plate Number
                    </th>
                    <th style={{ padding: "15px" }}>
                      Confidence
                    </th>
                    <th style={{ padding: "15px" }}>
                      Image
                    </th>
                    <th style={{ padding: "15px" }}>
                      Detection Time
                    </th>
                    <th style={{ padding: "15px" }}>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredHistory.map((item) => (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: "1px solid #1e293b",
                      }}
                    >
                      <td
                        style={{
                          padding: "15px",
                          textAlign: "center",
                        }}
                      >
                        {item.id}
                      </td>

                      <td
                        style={{
                          padding: "15px",
                          color: "#00e5ff",
                          fontWeight: "bold",
                        }}
                      >
                        {item.plate_number}
                      </td>

                      <td
                        style={{
                          padding: "15px",
                          textAlign: "center",
                        }}
                      >
                        {(parseFloat(item.confidence) * 100).toFixed(1)}%
                      </td>

                      <td style={{ padding: "15px" }}>
                        {item.image_name}
                      </td>

                      <td style={{ padding: "15px" }}>
                        {item.detection_time}
                      </td>

                      <td
                        style={{
                          padding: "15px",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            background: "#16a34a",
                            color: "white",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;