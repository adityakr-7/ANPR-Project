import {
  FaImage,
  FaCar,
  FaBullseye,
  FaServer,
} from "react-icons/fa";

function StatsCard({ title, value, color }) {
  let icon = <FaServer />;

  if (title === "Images Uploaded") {
    icon = <FaImage />;
  } else if (title === "Vehicles Detected") {
    icon = <FaCar />;
  } else if (title === "OCR Accuracy") {
    icon = <FaBullseye />;
  } else if (title === "System Status") {
    icon = <FaServer />;
  }

  return (
    <div
      style={{
        background: "#111827",
        border: `1px solid ${color}`,
        borderRadius: "18px",
        padding: "25px",
        minHeight: "160px",
        boxShadow: `0 0 20px ${color}22`,
        transition: "all .3s ease",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 0 35px ${color}66`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = `0 0 20px ${color}22`;
      }}
    >
      {/* Left */}

      <div>
        <h3
          style={{
            color: "#94a3b8",
            marginBottom: "18px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {title}
        </h3>

        <h1
          style={{
            color: color,
            fontSize: "46px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {value}
        </h1>
      </div>

      {/* Right */}

      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "18px",
          background: `${color}20`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          color: color,
        }}
      >
        {icon}
      </div>
    </div>
  );
}

export default StatsCard;