import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DetectionResult from "../components/upload/DetectionResult";
import { testBackend, uploadImage } from "../services/api";

function Upload() {
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(previews);
    setResults([]);
  };

  const detectPlate = async () => {
    if (images.length === 0) {
      alert("Please select image(s) first.");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      await testBackend();

      const uploadResult = await uploadImage(
        images.map((img) => img.file)
      );

      const finalResults = [];

      uploadResult.results.forEach((item) => {
        if (
          !item.detections ||
          item.detections.length === 0
        ) {
          finalResults.push({
            plate: "No Number Plate Detected",
            owner: "--",
            vehicle: "--",
            company: "--",
            model: "--",
            color: "--",
            fuel: "--",
            registration: "--",
            insurance: "--",
            mobile: "--",
            address: "--",
            databaseStatus: "No Plate Detected",
            status:
              "No vehicle number plate found in the selected image.",
            confidence: "--",
          });

          return;
        }

        const detection = item.detections[0];
        const vehicle = item.vehicle || {};

        finalResults.push({
          plate: detection.plate_number || "Unknown",

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
            vehicle.registration_year ||
            "Unknown",

          insurance:
            vehicle.insurance_status ||
            "Unknown",

          mobile:
            vehicle.owner_mobile || "Unknown",

          address:
            vehicle.address || "Unknown",

          databaseStatus:
            vehicle.database_status ||
            "Vehicle Not Found",

          status: item.message,

          confidence:
            (
              detection.confidence * 100
            ).toFixed(1) + "%",
        });
      });

      setResults(finalResults);
    } catch (error) {
      console.error(error);

      alert(
        "Backend is unavailable or an unexpected error occurred."
      );
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

        <div style={{ padding: "30px" }}>
          <h1
            style={{
              color: "#00e5ff",
              marginBottom: "30px",
            }}
          >
            Upload Vehicle Images
          </h1>

          <div
            style={{
              background: "#111827",
              borderRadius: "20px",
              padding: "40px",
              border: "2px dashed #00e5ff",
              textAlign: "center",
            }}
          >
            <h2>Drag & Drop Vehicle Images</h2>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "15px",
                marginBottom: "30px",
              }}
            >
              Supported Formats : JPG, PNG, JPEG
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImage}
            />

            <button
              onClick={() =>
                fileInputRef.current.click()
              }
              style={{
                background: "#00e5ff",
                color: "#000",
                border: "none",
                padding: "15px 35px",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Browse Images
            </button>
          </div>

          {images.length > 0 && (
            <div
              style={{
                marginTop: "35px",
                background: "#111827",
                padding: "25px",
                borderRadius: "20px",
              }}
            >
              <h2 style={{ color: "#00e5ff" }}>
                Selected Images
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill,minmax(250px,1fr))",
                  gap: "20px",
                  marginTop: "25px",
                }}
              >
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.preview}
                      alt=""
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                        borderRadius: "15px",
                      }}
                    />

                    <p
                      style={{
                        color: "#94a3b8",
                        marginTop: "10px",
                        wordBreak: "break-word",
                      }}
                    >
                      {image.file.name}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={detectPlate}
                style={{
                  marginTop: "30px",
                  background: "#00e5ff",
                  color: "#000",
                  border: "none",
                  padding: "15px 35px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "18px",
                  boxShadow:
                    "0 0 20px #00e5ff",
                }}
              >
                Detect Number Plate
              </button>
            </div>
          )}
                  {loading && (
            <div
              style={{
                marginTop: "30px",
                background: "#111827",
                padding: "25px",
                borderRadius: "20px",
              }}
            >
              <h2 style={{ color: "#00e5ff" }}>
                AI Processing...
              </h2>

              <p style={{ marginTop: "20px" }}>
                Detecting Number Plate...
              </p>

              <p>Running YOLOv8...</p>

              <p>Running EasyOCR...</p>

              <p>Searching Vehicle Database...</p>
            </div>
          )}

          {results.length > 0 &&
            results.map((result, index) => (
              <DetectionResult
                key={index}
                image={images[index]}
                result={result}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Upload;