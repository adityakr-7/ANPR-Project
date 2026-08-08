import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/api";

function CameraPreview() {
  const [dashboard, setDashboard] = useState({
    vehicles_detected: 0,
    recent: [],
  });

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    loadDashboard();

    const dashboardInterval = setInterval(() => {
      loadDashboard();
    }, 5000);

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(dashboardInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardData();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    }
  };

  const lastPlate =
    dashboard.recent.length > 0
      ? dashboard.recent[0].plate_number
      : "No Detection";

  return (
    <div
      style={{
        background: "#111827",
        borderRadius: "20px",
        padding: "20px",
        border: "1px solid #1e293b",
        minHeight: "430px",
        boxShadow: "0 0 20px rgba(0,255,255,.12)",
      }}
    >
      <h2
        style={{
          color: "#00e5ff",
          marginBottom: "20px",
        }}
      >
        📷 AI Camera Monitor
      </h2>

      <div
        style={{
          height: "210px",
          borderRadius: "15px",
          background:
            "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#94a3b8",
          border: "2px solid #00e5ff",
        }}
      >
        <h2
          style={{
            color: "#00ff88",
            marginBottom: "10px",
          }}
        >
          🟢 LIVE
        </h2>

        <h3>Camera Ready</h3>

        <p>{currentTime}</p>
      </div>

      <div
        style={{
          marginTop: "20px",
          lineHeight: "2.1",
          color: "white",
        }}
      >
        <p>
          📹 <b>Camera Status :</b>{" "}
          <span style={{ color: "#22c55e" }}>
            Online
          </span>
        </p>

        <p>
          🤖 <b>AI Detection :</b>{" "}
          <span style={{ color: "#22c55e" }}>
            Active
          </span>
        </p>

        <p>
          🚗 <b>Total Vehicles :</b>{" "}
          {dashboard.vehicles_detected}
        </p>

        <p>
          🔢 <b>Last Plate :</b>{" "}
          <span
            style={{
              color: "#00e5ff",
              fontWeight: "bold",
            }}
          >
            {lastPlate}
          </span>
        </p>

        <p>
          ⚡ <b>System :</b>{" "}
          <span style={{ color: "#22c55e" }}>
            Running Normally
          </span>
        </p>
      </div>
    </div>
  );
}

export default CameraPreview;