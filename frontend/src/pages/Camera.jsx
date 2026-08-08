import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { detectCameraFrame } from "../services/api";

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const [cameraRunning, setCameraRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [result, setResult] = useState(null);

  const [cameraMode, setCameraMode] = useState("environment");

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, [cameraMode]);

  const startCamera = async () => {
    try {
      stopCamera();

      const media = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraMode,
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = media;
      }

      setStream(media);
      setCameraRunning(true);
      setError("");
    } catch (err) {
      console.log(err);

      setError("Unable to access camera.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraRunning(false);
  };

  const captureFrame = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    setCapturedImage(image);

    setLoading(true);
    setResult(null);

    try {
      const response = await detectCameraFrame(image);

      if (
        response &&
        response.detections &&
        response.detections.length > 0
      ) {
        const detection = response.detections[0];
const vehicle = response.vehicle || {};

setResult({
  plate: detection.plate_number || "Unknown",

  confidence:
    (detection.confidence * 100).toFixed(2) + "%",

  owner:
    vehicle.owner_name || "Not Available",

  vehicle:
    vehicle.vehicle_name || "Unknown",

  company:
    vehicle.company || "Unknown",

  model:
    vehicle.model || "Unknown",

  color:
    vehicle.color || "Unknown",

  fuel:
    vehicle.fuel_type || "Unknown",

  registration:
    vehicle.registration_year || "Unknown",

  insurance:
    vehicle.insurance_status || "Unknown",

  mobile:
    vehicle.owner_mobile || "Unknown",

  address:
    vehicle.address || "Unknown",

  databaseStatus:
    vehicle.database_status || "Vehicle Not Found",
});
      } else {
        setResult({
          plate: "No Number Plate Found",
          confidence: "--",
        });
      }
    } catch (err) {
      console.log(err);

      setError("Detection failed.");
    }

    setLoading(false);
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

        <div style={{ padding: 30 }}>
          <h1
            style={{
              color: "#00E5FF",
              marginBottom: 30,
            }}
          >
            Live Camera Vehicle Detection
          </h1>

          <div
            style={{
              background: "#111827",
              borderRadius: 20,
              padding: 25,
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{
                width: "100%",
                borderRadius: 15,
                border: "2px solid #00E5FF",
              }}
            />

            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
            />

            <div
              style={{
                marginTop: 25,
                display: "flex",
                gap: 15,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={captureFrame}
                disabled={!cameraRunning || loading}
                style={buttonStyle}
              >
                📸 Capture
              </button>

              {cameraRunning ? (
                <button
                  onClick={stopCamera}
                  style={buttonStyle}
                >
                  ⛔ Stop Camera
                </button>
              ) : (
                <button
                  onClick={startCamera}
                  style={buttonStyle}
                >
                  ▶ Start Camera
                </button>
              )}

              <button
                onClick={() =>
                  setCameraMode((prev) =>
                    prev === "environment"
                      ? "user"
                      : "environment"
                  )
                }
                style={buttonStyle}
              >
                🔄 Switch Camera
              </button>

              <button
                onClick={() => {
                  setCapturedImage(null);
                  setResult(null);
                }}
                style={buttonStyle}
              >
                ♻ Retake
              </button>
            </div>

            <div
              style={{
                marginTop: 20,
                color: cameraRunning ? "#00ff99" : "#ff5555",
                fontWeight: "bold",
              }}
            >
              {cameraRunning
                ? "🟢 Camera Active"
                : "🔴 Camera Stopped"}
            </div>

            {error && (
              <div
                style={{
                  marginTop: 20,
                  color: "#ff5555",
                }}
              >
                {error}
              </div>
            )}
          </div>

          {capturedImage && (
            <div
              style={{
                background: "#111827",
                marginTop: 30,
                borderRadius: 20,
                padding: 25,
              }}
            >
              <h2 style={{ color: "#00E5FF" }}>
                Captured Image
              </h2>

              <img
                src={capturedImage}
                alt="Captured"
                style={{
                  width: "100%",
                  borderRadius: 15,
                  marginTop: 15,
                }}
              />
            </div>
          )}

          {loading && (
            <div
              style={{
                marginTop: 25,
                background: "#111827",
                padding: 25,
                borderRadius: 20,
              }}
            >
              <h2 style={{ color: "#00E5FF" }}>
                Detecting Vehicle...
              </h2>

              <p>✔ Capturing Frame</p>
              <p>✔ Running YOLO Detection</p>
              <p>✔ Extracting Number Plate</p>
              <p>✔ Running EasyOCR</p>
              <p>✔ Searching Vehicle Database</p>
            </div>
          )}

          {result && (
  <div
    style={{
      marginTop: 25,
      background: "#111827",
      padding: 25,
      borderRadius: 20,
      border: "1px solid #00E5FF",
    }}
  >
    <h2
      style={{
        color: "#00E5FF",
        marginBottom: 20,
      }}
    >
      Detection Result
    </h2>

    <table
      style={{
        width: "100%",
        color: "white",
        borderSpacing: "0 12px",
        fontSize: "16px",
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
          <td><b>Detection Time</b></td>
          <td>{new Date().toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  background: "#00E5FF",
  color: "#000",
  border: "none",
  padding: "14px 24px",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 16,
  boxShadow: "0 0 15px #00E5FF",
};

export default Camera;