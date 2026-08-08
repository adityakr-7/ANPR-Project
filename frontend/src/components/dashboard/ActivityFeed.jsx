function ActivityFeed() {

  const logs = [
    {
      time: "10:15 AM",
      message: "Vehicle MP04AB1234 detected",
      color: "#00ff88",
    },
    {
      time: "10:17 AM",
      message: "Unauthorized vehicle alert",
      color: "#ff4d6d",
    },
    {
      time: "10:20 AM",
      message: "OCR completed successfully",
      color: "#00e5ff",
    },
    {
      time: "10:24 AM",
      message: "Camera 2 connected",
      color: "#ffcc00",
    },
  ];

  return (
    <div
      style={{
        background: "#111827",
        borderRadius: "20px",
        padding: "20px",
        marginTop: "25px",
        boxShadow: "0 0 25px rgba(0,255,255,.08)",
      }}
    >
      <h2
        style={{
          color: "#00e5ff",
          marginBottom: "20px",
        }}
      >
        AI Activity Feed
      </h2>

      {logs.map((log, index) => (

        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >

          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: log.color,
              marginRight: "15px",
              boxShadow: `0 0 12px ${log.color}`,
            }}
          />

          <div>

            <div style={{ color: "white" }}>
              {log.message}
            </div>

            <small style={{ color: "#94a3b8" }}>
              {log.time}
            </small>

          </div>

        </div>

      ))}

    </div>
  );
}

export default ActivityFeed;