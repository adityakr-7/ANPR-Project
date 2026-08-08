import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function DetectionChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    values: [],
    totalDetections: 0,
    averageConfidence: 0,
  });

  useEffect(() => {
    loadAnalytics();

    const interval = setInterval(() => {
      loadAnalytics();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/analytics"
      );

      const data = await response.json();

      setChartData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: chartData.labels,

    datasets: [
      {
        label: "Vehicle Detections",

        data: chartData.values,

        borderColor: "#00e5ff",

        backgroundColor: "rgba(0,229,255,0.18)",

        borderWidth: 3,

        pointRadius: 5,

        pointHoverRadius: 7,

        tension: 0.35,

        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          color: "#1e293b",
        },

        ticks: {
          color: "white",
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "#1e293b",
        },

        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div
      style={{
        background: "#111827",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 0 20px rgba(0,229,255,.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "25px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h2
            style={{
              color: "#00e5ff",
              marginBottom: "10px",
            }}
          >
            Detection Analytics
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Real-time database statistics
          </p>
        </div>

        <div
          style={{
            textAlign: "right",
          }}
        >
          <h3
            style={{
              color: "#00ff88",
              margin: 0,
            }}
          >
            Total : {chartData.totalDetections}
          </h3>

          <p
            style={{
              color: "#ffcc00",
              marginTop: "8px",
            }}
          >
            Avg Accuracy : {chartData.averageConfidence}%
          </p>
        </div>
      </div>

      <div
        style={{
          height: "350px",
        }}
      >
        <Line
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default DetectionChart;