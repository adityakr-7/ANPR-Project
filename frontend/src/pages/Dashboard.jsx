import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import RecentDetections from "../components/dashboard/RecentDetections";
import CameraPreview from "../components/dashboard/CameraPreview";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import DetectionChart from "../components/charts/DetectionChart";
import { getDashboardData } from "../services/api";
import { searchVehicle } from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    images_uploaded: 0,
    vehicles_detected: 0,
    ocr_accuracy: 0,
  });

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(() => {
      loadDashboard();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardData();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    }
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
              color: "#fff",
              marginBottom: "30px",
            }}
          >
            🚗 AI Vehicle Number Plate Recognition System
          </h1>

          {/* Stats */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "20px",
              marginBottom: "25px",
            }}
          >
            <StatsCard
              title="Images Uploaded"
              value={dashboard.images_uploaded}
              color="#00e5ff"
            />

            <StatsCard
              title="Vehicles Detected"
              value={dashboard.vehicles_detected}
              color="#00ff88"
            />

            <StatsCard
              title="OCR Accuracy"
              value={`${dashboard.ocr_accuracy}%`}
              color="#ffcc00"
            />

            <StatsCard
              title="System Status"
              value="ONLINE"
              color="#ff4d6d"
            />
          </div>

          {/* Chart */}

          <div
            style={{
              marginBottom: "25px",
            }}
          >
            <DetectionChart />
          </div>

          {/* Bottom */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "20px",
            }}
          >
            <RecentDetections />

            <CameraPreview />
          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;