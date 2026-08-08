import { useEffect, useState } from "react";
import { getHistory } from "../../services/api";

function RecentDetections() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    loadDetections();

    const interval = setInterval(() => {
      loadDetections();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadDetections = async () => {
    try {
      const data = await getHistory();
      setVehicles(data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        background: "#111827",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 0 20px rgba(0,229,255,.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            color: "#00e5ff",
            margin: 0,
          }}
        >
          🚗 Recent Vehicle Detections
        </h2>

        <span
          style={{
            background: "#00e5ff",
            color: "#000",
            padding: "6px 14px",
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {vehicles.length} Records
        </span>
      </div>

      {vehicles.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#94a3b8",
          }}
        >
          No detections found.
        </div>
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
                borderBottom: "2px solid #1e293b",
              }}
            >
              <th style={{ padding: "15px", textAlign: "left" }}>Plate</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Confidence</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Time</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                style={{
                  borderBottom: "1px solid #1e293b",
                }}
              >
                <td
                  style={{
                    padding: "15px",
                    color: "#00e5ff",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  {vehicle.plate_number}
                </td>

                <td
                  style={{
                    padding: "15px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      background: "#1e293b",
                      padding: "6px 12px",
                      borderRadius: "15px",
                    }}
                  >
                    {(parseFloat(vehicle.confidence) * 100).toFixed(1)}%
                  </span>
                </td>

                <td
                  style={{
                    padding: "15px",
                    textAlign: "center",
                    color: "#cbd5e1",
                    fontSize: "14px",
                  }}
                >
                  {vehicle.detection_time}
                </td>

                <td
                  style={{
                    padding: "15px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      background:
                        vehicle.status === "Detected"
                          ? "#16a34a"
                          : "#ef4444",
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      fontSize: "13px",
                    }}
                  >
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentDetections;