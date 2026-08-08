const API_URL = "http://127.0.0.1:8000";

// ===========================
// Test Backend
// ===========================

export async function testBackend() {
  const response = await fetch(`${API_URL}/api/test`);

  if (!response.ok) {
    throw new Error("Backend connection failed");
  }

  return response.json();
}

// ===========================
// Upload Multiple Images
// ===========================

export async function uploadImage(files) {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const response = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

// ===========================
// Camera Detection
// ===========================

export async function detectCameraFrame(image) {
  const response = await fetch(`${API_URL}/api/camera`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image,
    }),
  });

  return response.json();
}

// ===========================
// History
// ===========================

export async function getHistory() {
  const response = await fetch(`${API_URL}/api/history`);

  return response.json();
}

// ===========================
// Dashboard
// ===========================

export async function getDashboardData() {
  const response = await fetch(`${API_URL}/api/dashboard`);

  return response.json();
}

export async function searchVehicle(plate) {

  const response = await fetch(
    `${API_URL}/api/search/${plate}`
  );

  return response.json();
}