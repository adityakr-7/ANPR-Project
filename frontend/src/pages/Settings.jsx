import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {
  const settings = [
    { title: "AI Detection Model", value: "YOLOv8", color: "#00e5ff", icon: "🤖" },
    { title: "OCR Engine", value: "EasyOCR", color: "#00ff88", icon: "🔍" },
    { title: "Backend Framework", value: "FastAPI", color: "#ffcc00", icon: "⚡" },
    { title: "Frontend Framework", value: "React + Vite", color: "#38bdf8", icon: "💻" },
    { title: "Database", value: "SQLite", color: "#a855f7", icon: "🗄️" },
    { title: "Programming Language", value: "Python 3.13", color: "#f97316", icon: "🐍" },
    { title: "Project Version", value: "Version 1.0", color: "#10b981", icon: "📦" },
    { title: "System Status", value: "ONLINE", color: "#22c55e", icon: "🟢" },
    { title: "Supported Formats", value: "JPG, JPEG, PNG", color: "#06b6d4", icon: "🖼️" },
    { title: "Camera Support", value: "Web Camera", color: "#3b82f6", icon: "📷" },
    { title: "Object Detection", value: "Vehicle Number Plate", color: "#ec4899", icon: "🚗" },
    { title: "Detection Storage", value: "SQLite Database", color: "#f59e0b", icon: "💾" },
  ];

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
              marginBottom: "10px",
            }}
          >
            ⚙️ System Settings
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "35px",
            }}
          >
            Configuration and project information
          </p>

          {/* Settings Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "20px",
            }}
          >
            {settings.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#111827",
                  borderRadius: "18px",
                  padding: "25px",
                  borderLeft: `6px solid ${item.color}`,
                  boxShadow: "0 0 18px rgba(0,229,255,.08)",
                  transition: ".3s",
                }}
              >
                <div
                  style={{
                    fontSize: "34px",
                    marginBottom: "15px",
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    color: "#94a3b8",
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h3>

                <h2
                  style={{
                    color: item.color,
                    margin: 0,
                    fontWeight: "bold",
                  }}
                >
                  {item.value}
                </h2>
              </div>
            ))}
          </div>

          {/* About */}

          <div
            style={{
              marginTop: "35px",
              background: "#111827",
              borderRadius: "20px",
              padding: "30px",
            }}
          >
            <h2
              style={{
                color: "#00e5ff",
                marginBottom: "20px",
              }}
            >
              📖 About Project
            </h2>

            <p
              style={{
                color: "white",
                fontSize: "17px",
                lineHeight: "32px",
              }}
            >
              The AI Based Vehicle Number Plate Recognition System is designed
              to automatically detect and recognize vehicle registration numbers
              from uploaded images as well as live camera feeds. The system uses
              the YOLOv8 object detection model to accurately locate vehicle
              number plates and EasyOCR to extract the registration text. All
              successful detections are securely stored in an SQLite database
              and can be viewed later through the Dashboard, History and Reports
              modules.
            </p>
          </div>

          {/* Features */}

          <div
            style={{
              marginTop: "25px",
              background: "#111827",
              borderRadius: "20px",
              padding: "30px",
            }}
          >
            <h2
              style={{
                color: "#00e5ff",
                marginBottom: "20px",
              }}
            >
              🚀 Key Features
            </h2>

            <ul
              style={{
                color: "white",
                lineHeight: "34px",
                fontSize: "17px",
                paddingLeft: "20px",
              }}
            >
              <li>Vehicle Number Plate Detection using YOLOv8</li>
              <li>Text Recognition using EasyOCR</li>
              <li>Image Upload Detection</li>
              <li>Live Camera Detection</li>
              <li>Detection History Management</li>
              <li>Dashboard Analytics</li>
              <li>Detection Reports</li>
              <li>CSV & PDF Report Export</li>
              <li>SQLite Database Storage</li>
              <li>Modern Responsive User Interface</li>
            </ul>
          </div>

          {/* Developer */}

          <div
            style={{
              marginTop: "25px",
              background: "#111827",
              borderRadius: "20px",
              padding: "30px",
            }}
          >
            <h2
              style={{
                color: "#00e5ff",
                marginBottom: "20px",
              }}
            >
              👨‍💻 Project Information
            </h2>

            <table
              style={{
                width: "100%",
                color: "white",
                lineHeight: "34px",
                fontSize: "17px",
              }}
            >
              <tbody>
                <tr>
                  <td><strong>Project Name</strong></td>
                  <td>AI Based Vehicle Number Plate Recognition System</td>
                </tr>

                <tr>
                  <td><strong>Technology Stack</strong></td>
                  <td>React • FastAPI • YOLOv8 • EasyOCR • SQLite</td>
                </tr>

                <tr>
                  <td><strong>Version</strong></td>
                  <td>1.0</td>
                </tr>

                <tr>
                  <td><strong>Status</strong></td>
                  <td style={{ color: "#22c55e", fontWeight: "bold" }}>
                    ● ONLINE
                  </td>
                </tr>

                <tr>
                  <td><strong>License</strong></td>
                  <td>Academic Project</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}

          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            AI Based Vehicle Number Plate Recognition System © 2026
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;