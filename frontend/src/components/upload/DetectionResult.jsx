function DetectionResult({ image, result }) {
  if (!result) return null;

  const noPlate =
    result.plate === "No Number Plate Detected";

  return (
    <div
      style={{
        marginTop: "35px",
        background: "#111827",
        borderRadius: "20px",
        padding: "30px",
        border: `1px solid ${
          noPlate ? "#ef4444" : "#00e5ff"
        }`,
      }}
    >
      <h2
        style={{
          color: noPlate ? "#ef4444" : "#00e5ff",
          marginBottom: "25px",
        }}
      >
        Detection Result
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "35px",
          alignItems: "start",
        }}
      >
        {/* Image */}

        <div>
          <h3
            style={{
              color: "#00e5ff",
              marginBottom: "15px",
            }}
          >
            AI Detection Result
          </h3>

          <img
            src={
              noPlate
                ? image.preview
                : `http://127.0.0.1:8000/results/annotated_result.jpg?${Date.now()}`
            }
            alt="Detection"
            style={{
              width: "100%",
              borderRadius: "15px",
              border: `2px solid ${
                noPlate ? "#ef4444" : "#00e5ff"
              }`,
              boxShadow: `0 0 20px ${
                noPlate
                  ? "rgba(239,68,68,.3)"
                  : "rgba(0,229,255,.35)"
              }`,
            }}
          />

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            {noPlate ? (
              <span
                style={{
                  background: "#dc2626",
                  padding: "8px 15px",
                  borderRadius: "20px",
                }}
              >
                ❌ No Plate Found
              </span>
            ) : (
              <>
                <span
                  style={{
                    background: "#16a34a",
                    padding: "8px 15px",
                    borderRadius: "20px",
                  }}
                >
                  ✅ Plate Detected
                </span>

                <span
                  style={{
                    background: "#0284c7",
                    padding: "8px 15px",
                    borderRadius: "20px",
                  }}
                >
                  🤖 YOLOv8
                </span>

                <span
                  style={{
                    background: "#7c3aed",
                    padding: "8px 15px",
                    borderRadius: "20px",
                  }}
                >
                  🔍 EasyOCR
                </span>
              </>
            )}
          </div>
        </div>

        {/* Details */}

        <div>
          <h3
            style={{
              color: "#00e5ff",
              marginBottom: "20px",
            }}
          >
            Vehicle Details
          </h3>

          <table
            style={{
              width: "100%",
              color: "white",
              borderSpacing: "0 12px",
            }}
          >
            <tbody>
  <tr>
    <td><b>Number Plate</b></td>
    <td>{result.plate}</td>
  </tr>

  <tr>
    <td><b>Owner Name</b></td>
    <td>{result.owner}</td>
  </tr>

  <tr>
    <td><b>Vehicle Name</b></td>
    <td>{result.vehicle}</td>
  </tr>

  <tr>
    <td><b>Company</b></td>
    <td>{result.company}</td>
  </tr>

  <tr>
    <td><b>Model</b></td>
    <td>{result.model}</td>
  </tr>

  <tr>
    <td><b>Vehicle Color</b></td>
    <td>{result.color}</td>
  </tr>

  <tr>
    <td><b>Fuel Type</b></td>
    <td>{result.fuel}</td>
  </tr>

  <tr>
    <td><b>Registration Year</b></td>
    <td>{result.registration}</td>
  </tr>

  <tr>
    <td><b>Insurance Status</b></td>
    <td>{result.insurance}</td>
  </tr>

  <tr>
    <td><b>Owner Mobile</b></td>
    <td>{result.mobile}</td>
  </tr>

  <tr>
    <td><b>Address</b></td>
    <td>{result.address}</td>
  </tr>

  <tr>
    <td><b>Database Status</b></td>
    <td
      style={{
        color:
          result.databaseStatus === "Vehicle Found"
            ? "#22c55e"
            : "#facc15",
        fontWeight: "bold",
      }}
    >
      {result.databaseStatus}
    </td>
  </tr>

  <tr>
    <td><b>Confidence</b></td>
    <td>{result.confidence}</td>
  </tr>

  <tr>
    <td><b>Status</b></td>
    <td
      style={{
        color: noPlate ? "#ef4444" : "#22c55e",
        fontWeight: "bold",
      }}
    >
      {result.status}
    </td>
  </tr>

  <tr>
    <td><b>Detection Time</b></td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
</tbody>
          </table>

          {!noPlate && (
            <div
              style={{
                marginTop: "30px",
              }}
            >
              <h4
                style={{
                  color: "#00e5ff",
                  marginBottom: "10px",
                }}
              >
                OCR Confidence
              </h4>

              <div
                style={{
                  width: "100%",
                  height: "18px",
                  background: "#1e293b",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: result.confidence,
                    height: "100%",
                    background:
                      "linear-gradient(90deg,#00e5ff,#00ff88)",
                  }}
                />
              </div>

              <p
                style={{
                  marginTop: "10px",
                  color: "#94a3b8",
                }}
              >
                AI Confidence : {result.confidence}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetectionResult;