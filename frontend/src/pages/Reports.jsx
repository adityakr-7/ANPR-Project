import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getDashboardData } from "../services/api";
import DetectionChart from "../components/charts/DetectionChart";

function Reports() {
  const [report, setReport] = useState({
    images_uploaded: 0,
    vehicles_detected: 0,
    ocr_accuracy: 0,
    recent: [],
  });

  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    loadReport();

    const interval = setInterval(() => {
      loadReport();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadReport = async () => {
    try {
      const data = await getDashboardData();

      setReport(data);

      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error(error);
    }
  };

  const Card = ({ title, value, color, icon }) => (
    <div
      style={{
        background: "#111827",
        borderRadius: "20px",
        padding: "25px",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 0 20px rgba(0,229,255,.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "#94a3b8",
              marginBottom: "10px",
            }}
          >
            {title}
          </p>

          <h1
            style={{
              color,
              margin: 0,
              fontSize: "34px",
            }}
          >
            {value}
          </h1>
        </div>

        <div
          style={{
            fontSize: "40px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );

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
              marginBottom: "30px",
            }}
          >
            📊 Reports & Analytics
          </h1>

          {/* Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <Card
              title="Images Uploaded"
              value={report.images_uploaded}
              color="#00e5ff"
              icon="🖼️"
            />

            <Card
              title="Vehicles Detected"
              value={report.vehicles_detected}
              color="#00ff88"
              icon="🚗"
            />

            <Card
              title="OCR Accuracy"
              value={`${report.ocr_accuracy}%`}
              color="#ffcc00"
              icon="🎯"
            />

            <Card
              title="System Status"
              value="ONLINE"
              color="#ff4d6d"
              icon="🟢"
            />
          </div>

          {/* Analytics Chart */}

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <DetectionChart />
          </div>

          {/* Project Summary */}

          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "20px",
              marginBottom: "30px",
            }}
          >
            <h2
              style={{
                color: "#00e5ff",
                marginBottom: "25px",
              }}
            >
              Project Summary
            </h2>

            <table
              style={{
                width: "100%",
                color: "white",
                borderSpacing: "0 15px",
              }}
            >
              <tbody>
                <tr>
                  <td>Total Images Uploaded</td>
                  <td>
                    <strong>{report.images_uploaded}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Total Number Plates Detected</td>
                  <td>
                    <strong>{report.vehicles_detected}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Average OCR Accuracy</td>
                  <td>
                    <strong>{report.ocr_accuracy}%</strong>
                  </td>
                </tr>

                <tr>
                  <td>Detection Model</td>
                  <td>
                    <strong>YOLOv8</strong>
                  </td>
                </tr>

                <tr>
                  <td>OCR Engine</td>
                  <td>
                    <strong>EasyOCR</strong>
                  </td>
                </tr>

                <tr>
                  <td>Backend</td>
                  <td>
                    <strong>FastAPI</strong>
                  </td>
                </tr>

                <tr>
                  <td>Database</td>
                  <td>
                    <strong>SQLite</strong>
                  </td>
                </tr>

                <tr>
                  <td>Last Updated</td>
                  <td>
                    <strong>{lastUpdated}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Recent Detection Table */}

          <div
            style={{
              background: "#111827",
              padding: "25px",
              borderRadius: "20px",
            }}
          >
            <h2
              style={{
                color: "#00e5ff",
                marginBottom: "20px",
              }}
            >
              Latest Detections
            </h2>

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
                    borderBottom: "2px solid #1e293b",
                    color: "#00e5ff",
                  }}
                >
                  <th style={{ padding: "15px" }}>Plate</th>
                  <th style={{ padding: "15px" }}>Confidence</th>
                  <th style={{ padding: "15px" }}>Time</th>
                  <th style={{ padding: "15px" }}>Status</th>
                </tr>
              </thead>

              <tbody>
                {report.recent.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #1e293b",
                    }}
                  >
                    <td
                      style={{
                        padding: "15px",
                        color: "#00e5ff",
                        fontWeight: "bold",
                      }}
                    >
                      {item.plate_number}
                    </td>

                    <td style={{ padding: "15px", textAlign: "center" }}>
                      {(parseFloat(item.confidence) * 100).toFixed(1)}%
                    </td>

                    <td style={{ padding: "15px", textAlign: "center" }}>
                      {item.time}
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

            {report.recent.length === 0 && (
              <p
                style={{
                  color: "#94a3b8",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                No detections available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;