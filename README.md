# 🚗 Automatic Number Plate Recognition (ANPR) System

An AI-powered **Automatic Number Plate Recognition (ANPR)** system that automatically detects vehicle number plates, recognizes registration numbers using Optical Character Recognition (OCR), retrieves associated vehicle information, and maintains detection records through a modern web-based dashboard.

The system combines **YOLOv8, EasyOCR, Python, FastAPI, React, Vite, and SQLite** to provide an integrated vehicle number plate detection and management solution.

---

## 📌 Project Overview

The **Automatic Number Plate Recognition (ANPR) System** is a computer-vision-based application developed to automate the identification of vehicle registration plates from images and camera input.

Traditional vehicle identification often requires manually reading and recording registration numbers, which can be time-consuming and prone to human error. This system automates the process by using an AI-based object detection model to locate vehicle number plates and **Optical Character Recognition (OCR)** to extract the registration number.

Once a registration number is recognized, the system can search the available vehicle database and display associated vehicle information.

The application provides a web-based interface for:

* 📷 Uploading vehicle images
* 📁 Processing multiple images
* 🤖 Detecting and recognizing number plates
* 📹 Capturing vehicle images through a camera
* 🚘 Retrieving vehicle information
* 🕒 Viewing detection history
* 🔎 Searching vehicle records
* 📊 Monitoring detection statistics
* 📈 Generating reports

---

## 🎯 Objectives

The main objectives of the project are:

* Automatically detect vehicle number plates from images.
* Recognize registration numbers using OCR technology.
* Process vehicle images using an AI-based object detection model.
* Support multiple image uploads for batch processing.
* Provide camera-based vehicle detection.
* Retrieve associated vehicle information from the database.
* Store detection records for future reference.
* Provide detection history and search functionality.
* Display detection statistics through a dashboard.
* Generate CSV and PDF reports.
* Provide a responsive and user-friendly web interface.
* Reduce the need for manual number plate identification.

---

# ✨ Key Features

## 1. 🤖 AI-Based Number Plate Detection

The system uses the **YOLOv8 object detection model** to identify the location of vehicle number plates within an image.

The detected number plate is highlighted with a bounding box along with its detection confidence score.

### Example

```text
Detected Plate : TN09BY9726
Confidence     : 95%
```

> **Note:** Detection confidence represents the model's confidence in the detected object. It should not be interpreted as overall recognition accuracy.

---

## 2. 🔤 OCR-Based Number Plate Recognition

After detecting the number plate, the system extracts the detected plate region and processes it using **EasyOCR** to recognize the registration number.

### Recognition Workflow

```text
Input Image
     ↓
Number Plate Detection
     ↓
Plate Cropping
     ↓
EasyOCR Processing
     ↓
Registration Number
```

### Example

```text
Recognized Plate : TN09BY9726
```

---

## 3. 📷 Image Upload

Users can upload vehicle images through the web interface for number plate detection and recognition.

### Supported Formats

* JPG
* JPEG
* PNG

The uploaded image is processed by the backend and the resulting detection information is returned to the frontend.

---

## 4. 📁 Multiple Image Processing

The system supports **multiple image uploads**, allowing users to select and process several vehicle images in a single operation.

This feature makes the application suitable for batch image processing.

---

## 5. 📹 Live Camera Detection

The application includes a **Live Camera** module for camera-based vehicle image capture and number plate detection.

The camera interface provides controls such as:

* Start Camera
* Capture
* Switch Camera
* Retake

A captured frame can be sent to the backend for number plate detection and recognition.

---

## 6. 🚘 Vehicle Information Retrieval

After recognizing a registration number, the system can search the vehicle database for a matching record.

Depending on the available database record, vehicle information can include:

| Information          | Description                         |
| -------------------- | ----------------------------------- |
| Number Plate         | Vehicle registration number         |
| Owner Name           | Registered vehicle owner            |
| Vehicle Name         | Vehicle name                        |
| Company              | Vehicle manufacturer                |
| Model                | Vehicle model                       |
| Vehicle Color        | Registered vehicle color            |
| Fuel Type            | Petrol, Diesel, CNG, Electric, etc. |
| Registration Year    | Year of registration                |
| Insurance Status     | Insurance information               |
| Owner Mobile         | Registered contact number           |
| Address              | Registered address                  |
| Database Status      | Availability of a matching record   |
| Detection Confidence | Model detection confidence          |
| Detection Time       | Date and time of detection          |

> **Privacy Note:** Real owner information should only be stored or displayed when appropriate authorization is available.

---

## 7. 🕒 Detection History

The **History** module stores and displays previous vehicle detections.

Users can view information such as:

* Detection ID
* Plate Number
* Detection Confidence
* Vehicle Image
* Detection Time
* Detection Status

The history module also provides search and refresh functionality.

---

## 8. 📊 Dashboard Analytics

The dashboard provides an overview of the system's detection activity.

It can display key statistics such as:

* Images Uploaded
* Vehicles Detected
* Total Detections
* Detection Confidence
* System Status

The analytics section provides visual representations of detection activity and system performance.

> **Important:** If an actual ground-truth evaluation has not been performed, the dashboard should use terms such as **Detection Confidence** or **OCR Confidence** instead of claiming an "Accuracy" percentage.

---

## 9. 📈 Reports and Analytics

The **Reports** module provides analytical information based on stored detection records.

Available functions include:

* Refresh Records
* View Detection Statistics
* Export CSV
* Export PDF

These reports can be used for further analysis, documentation, and project evaluation.

---

## 10. 🔎 Vehicle Search

The application provides a vehicle search interface that allows users to search for vehicle information using a registration number.

### Example

```text
Search:
TN09BY9726
```

If a matching record exists in the database, the system displays the associated vehicle information.

---

## 11. 🗄️ SQLite Database

The system uses **SQLite** as its database for storing vehicle information and detection records.

SQLite provides a lightweight and easy-to-manage database solution suitable for the project's development, testing, and demonstration environment.

The database can contain:

* Vehicle records
* Registration details
* Owner information
* Detection records
* Detection timestamps
* Detection confidence
* Detection status

---

## 12. 🌐 Modern Web Interface

The frontend provides a modern and responsive dashboard designed for easy navigation and monitoring.

The interface includes:

* Dark-themed UI
* Navigation sidebar
* Dashboard cards
* Analytics charts
* Detection result panels
* Vehicle search
* Camera interface
* Detection history
* Report controls
* Responsive layout

---

# 🏗️ System Architecture

The system follows a **frontend–backend–AI–database architecture**.

```text
                         ┌───────────────────────┐
                         │      User / Admin     │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │    React Frontend     │
                         │       + Vite          │
                         └───────────┬───────────┘
                                     │
                              HTTP / REST API
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │    FastAPI Backend    │
                         │        Python         │
                         └───────────┬───────────┘
                                     │
                 ┌───────────────────┼───────────────────┐
                 │                   │                   │
                 ▼                   ▼                   ▼
        ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
        │     YOLOv8     │  │    EasyOCR     │  │   SQLite DB    │
        │ Plate Detection│  │ Text Recognition│  │ Vehicle Records│
        └────────────────┘  └────────────────┘  └────────────────┘
                 │                   │                   │
                 └───────────────────┼───────────────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │   Detection Result   │
                         │                       │
                         │ Plate Number          │
                         │ Confidence             │
                         │ Vehicle Information    │
                         │ Detection Time        │
                         └───────────────────────┘
```

---

# 🔄 How the System Works

The overall processing pipeline is:

```text
Vehicle Image / Camera Frame
            │
            ▼
     Image Upload / Capture
            │
            ▼
      FastAPI Backend
            │
            ▼
        YOLOv8 Model
            │
            ▼
    Number Plate Detection
            │
            ▼
       Plate Cropping
            │
            ▼
        EasyOCR
            │
            ▼
 Registration Number Extraction
            │
            ▼
      SQLite Database Search
            │
            ▼
    Vehicle Information Retrieval
            │
            ▼
      Detection Record Saved
            │
            ▼
       React Dashboard
            │
            ▼
   Results / History / Analytics
```

---

# 🛠️ Technology Stack

| Technology                  | Purpose                             |
| --------------------------- | ----------------------------------- |
| **Python**                  | Backend and AI processing           |
| **FastAPI**                 | REST API backend                    |
| **YOLOv8**                  | Number plate detection              |
| **EasyOCR**                 | Number plate text recognition       |
| **React**                   | Frontend user interface             |
| **Vite**                    | Frontend development and build tool |
| **SQLite**                  | Vehicle and detection database      |
| **HTML / CSS / JavaScript** | Web interface                       |
| **REST API**                | Frontend-backend communication      |

---

# 📂 Project Structure

The project is organized into frontend, backend, AI model, and database components.

> **Important:** Replace the structure below with your exact repository structure if your actual folders differ.

```text
ANPR-System/
│
├── ai/
│   ├── models/
│   │   └── best.pt
│   │
│   └── results/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── app.py
├── requirements.txt
├── database.db
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ANPR-System
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

---

## 2. Backend Setup

Create and activate a Python virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Start the FastAPI backend using the command appropriate to your project:

```bash
uvicorn app:app --reload
```

The backend will normally be available at:

```text
http://127.0.0.1:8000
```

> If your FastAPI application uses a different module or startup command, replace the command above with the actual command used by your project.

---

## 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal.

---

# 🔌 API Endpoints

The backend provides REST API endpoints for communication between the frontend and AI processing layer.

### Available Endpoints

| Method | Endpoint      | Purpose                       |
| ------ | ------------- | ----------------------------- |
| GET    | `/`           | Backend status                |
| GET    | `/api/test`   | Test backend connectivity     |
| POST   | `/api/upload` | Upload image(s) for detection |

### Example

```text
GET /
GET /api/test
POST /api/upload
```

> Add additional endpoints here if your final backend implements separate APIs for camera detection, history, reports, or vehicle search.

---

# 🤖 Core AI Technologies

## YOLOv8

**YOLOv8** is used for detecting vehicle number plates within input images.

Example model initialization:

```python
from ultralytics import YOLO

model = YOLO("ai/models/best.pt")
```

The trained model identifies the number plate region, which is then passed to the OCR stage.

---

## EasyOCR

**EasyOCR** is used to extract text from the detected number plate region.

Example:

```python
import easyocr

reader = easyocr.Reader(["en"], gpu=False)
```

The OCR output is then processed to obtain the vehicle registration number.

---

# ⚡ Backend

The backend is developed using **Python and FastAPI**.

The backend is responsible for:

* Receiving uploaded images
* Processing detection requests
* Running the YOLOv8 model
* Cropping detected number plates
* Performing OCR
* Searching vehicle records
* Storing detection information
* Returning detection results to the frontend

---

# ⚛️ Frontend

The frontend is developed using **React and Vite**.

The frontend communicates with the FastAPI backend through REST API requests.

### Main Application Modules

```text
Login
Dashboard
Upload
Camera
History
Reports
Settings
Vehicle Search
```

---

# 🗃️ Database

The project uses **SQLite** as its database layer.

The database primarily contains two categories of information.

## Vehicle Information

```text
Registration Number
Owner Name
Vehicle Name
Company
Model
Color
Fuel Type
Registration Year
Insurance Status
Owner Mobile
Address
```

## Detection Information

```text
Detection ID
Registration Number
Confidence
Image
Detection Time
Detection Status
```

---

# 📊 Example Detection Result

```text
---------------------------------------
        VEHICLE DETECTION RESULT
---------------------------------------

Plate Number     : TN09BY9726
Confidence       : 95%
Detection Status : Detected

Vehicle           : Example Vehicle
Company           : Example Manufacturer
Model             : Example Model
Color             : White
Fuel Type         : Petrol
Registration Year : 2022

Detection Time    : YYYY-MM-DD HH:MM:SS
---------------------------------------
```

> The values above are illustrative examples and do not represent real vehicle information.

---

# 🖼️ Screenshots

Screenshots can be added here to demonstrate the application's interface.

### Login

Add your login page screenshot here.

```text
![Login Page](screenshots/login.png)
```

### Dashboard

Add your dashboard screenshot here.

```text
![Dashboard](screenshots/dashboard.png)
```

### Number Plate Detection

Add your upload/detection result screenshot here.

```text
![Detection Result](screenshots/detection.png)
```

### Live Camera

Add your camera interface screenshot here.

```text
![Live Camera](screenshots/camera.png)
```

### Vehicle Information

Add your vehicle details screenshot here.

```text
![Vehicle Details](screenshots/vehicle-details.png)
```

### Detection History

Add your history page screenshot here.

```text
![Detection History](screenshots/history.png)
```

### Reports

Add your reports page screenshot here.

```text
![Reports](screenshots/reports.png)
```

> Create a `screenshots` folder in your repository and place the corresponding images inside it before enabling these image links.

---

# 🚀 Future Enhancements

Possible future improvements include:

* Real-time video stream processing.
* Improved OCR performance for different plate formats.
* Support for multiple regional number plate formats.
* Integration with authorized external vehicle information services.
* Cloud-based database storage.
* User authentication and role-based access control.
* Advanced analytics and visualization.
* Automated violation detection.
* Vehicle entry and exit tracking.
* Improved low-light and night-time detection.
* Cloud deployment and remote access.
* Improved model performance through additional training data.

---

# ⚠️ Limitations

The current system has some practical limitations:

* OCR performance depends on image quality and number plate visibility.
* Blurred, damaged, tilted, or partially hidden plates may produce incorrect results.
* Vehicle information depends on the records available in the local database.
* SQLite is suitable for the current project and demonstration environment but may not be ideal for large-scale production deployment.
* Detection confidence does not represent actual OCR accuracy unless evaluated against a labeled test dataset.
* External vehicle registration information should only be accessed through authorized and legally permitted data sources.

---

# 🔐 Privacy & Data Usage

Vehicle registration and owner information can contain sensitive personal data.

This project is intended primarily for **educational, research, and demonstration purposes**. Any real-world deployment should follow applicable privacy laws, data-protection requirements, and authorized access policies.

Do not use, store, or display private vehicle or owner information without appropriate authorization.

---

# 📚 Project Information

| Category     | Details                                                    |
| ------------ | ---------------------------------------------------------- |
| **Project**  | Automatic Number Plate Recognition (ANPR) System           |
| **Domain**   | Artificial Intelligence / Computer Vision / Data Analytics |
| **Backend**  | Python + FastAPI                                           |
| **Frontend** | React + Vite                                               |
| **AI**       | YOLOv8 + EasyOCR                                           |
| **Database** | SQLite                                                     |

---

# 👨‍💻 Developer

**Aditya Kumar**

**Course:** BBA-BIA (Business Intelligence and Analytics)
**Semester:** 5th Semester
**Institution:** LNCT University
**Academic Session:** 2024–2027

### Internship Project

**Tata Motors Ltd., Jamshedpur**

**Project Duration:**
26 June 2026 – 26 July 2026

---

# 📄 License

This project was developed for **educational and demonstration purposes**.

If the system is used commercially or with real vehicle-registration data, ensure that all required permissions, licenses, privacy requirements, and applicable legal regulations are satisfied.

---
