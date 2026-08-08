from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import List
from services.anpr_service import detect_plate
from database.database import engine, SessionLocal
from database.models import Base
from database.crud import (
    save_detection,
    get_all_detections,
    get_vehicle_by_plate,
)

from datetime import datetime
from collections import Counter

import shutil
import os
import base64
import uuid

app = FastAPI(
    title="ANPR System API",
    version="1.0.0"
)

# --------------------------------------------------
# Static Files
# --------------------------------------------------

app.mount(
    "/results",
    StaticFiles(directory="ai/results"),
    name="results"
)

# --------------------------------------------------
# Create Database
# --------------------------------------------------

Base.metadata.create_all(bind=engine)

# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================================================
# Home
# ==================================================

@app.get("/")
def home():
    return {
        "message": "ANPR Backend is Running Successfully"
    }


# ==================================================
# Test API
# ==================================================

@app.get("/api/test")
def test():
    return {
        "status": "success",
        "message": "Frontend Connected Successfully 🚀"
    }


# ==================================================
# Upload API
# ==================================================

@app.post("/api/upload")
def upload_image(files: List[UploadFile] = File(...)):

    os.makedirs("uploads", exist_ok=True)

    db = SessionLocal()

    results = []

    try:
        for file in files:

            file_path = os.path.join("uploads", file.filename)

            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            # Detect Number Plate
            detections = detect_plate(file_path)

            # Save Detection History
            for detection in detections:
                save_detection(
                    db=db,
                    plate=detection["plate_number"],
                    confidence=str(detection["confidence"]),
                    image_name=file.filename,
                    detection_time=datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
                    status="Detected"
                )

            # ==========================================
            # Search Vehicle Database
            # ==========================================

            vehicle_info = None

            if len(detections) > 0:

                vehicle = get_vehicle_by_plate(
                    db,
                    detections[0]["plate_number"]
                )

                if vehicle:

                    vehicle_info = {
                        "owner_name": vehicle.owner_name,
                        "vehicle_name": vehicle.vehicle_name,
                        "company": vehicle.company,
                        "model": vehicle.model,
                        "color": vehicle.color,
                        "fuel_type": vehicle.fuel_type,
                        "registration_year": vehicle.registration_year,
                        "insurance_status": vehicle.insurance_status,
                        "owner_mobile": vehicle.owner_mobile,
                        "address": vehicle.address,
                        "database_status": "Vehicle Found"
                    }

                else:

                    vehicle_info = {
                        "owner_name": "Not Available",
                        "vehicle_name": "Unknown",
                        "company": "Unknown",
                        "model": "Unknown",
                        "color": "Unknown",
                        "fuel_type": "Unknown",
                        "registration_year": "Unknown",
                        "insurance_status": "Unknown",
                        "owner_mobile": "Unknown",
                        "address": "Unknown",
                        "database_status": "Vehicle Not Found"
                    }

            results.append({
                "status": "success",
                "message": "Image uploaded successfully",
                "filename": file.filename,
                "detections": detections,
                "vehicle": vehicle_info
            })

    finally:
        db.close()

    return {
        "status": "success",
        "message": "Images uploaded successfully",
        "total_images": len(files),
        "results": results
    }


# ==================================================
# Camera API
# ==================================================

@app.post("/api/camera")
def camera_detection(image: dict):

    os.makedirs("uploads", exist_ok=True)

    image_data = image["image"].split(",")[1]

    filename = f"{uuid.uuid4()}.png"

    file_path = os.path.join("uploads", filename)

    with open(file_path, "wb") as file:
        file.write(base64.b64decode(image_data))

    detections = detect_plate(file_path)

    db = SessionLocal()

    vehicle_data = None

    for detection in detections:

        save_detection(
            db=db,
            plate=detection["plate_number"],
            confidence=str(detection["confidence"]),
            image_name=filename,
            detection_time=datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
            status="Detected"
        )

        vehicle = get_vehicle_by_plate(
            db,
            detection["plate_number"]
        )

        if vehicle:

            vehicle_data = {
                "owner_name": vehicle.owner_name,
                "vehicle_name": vehicle.vehicle_name,
                "company": vehicle.company,
                "model": vehicle.model,
                "color": vehicle.color,
                "fuel_type": vehicle.fuel_type,
                "registration_year": vehicle.registration_year,
                "insurance_status": vehicle.insurance_status,
                "owner_mobile": vehicle.owner_mobile,
                "address": vehicle.address,
                "database_status": "Vehicle Found"
            }

        else:

            vehicle_data = {
                "owner_name": "Not Available",
                "vehicle_name": "Unknown",
                "company": "Unknown",
                "model": "Unknown",
                "color": "Unknown",
                "fuel_type": "Unknown",
                "registration_year": "Unknown",
                "insurance_status": "Unknown",
                "owner_mobile": "Unknown",
                "address": "Unknown",
                "database_status": "Vehicle Not Found"
            }

    db.close()

    return {
        "status": "success",
        "detections": detections,
        "vehicle": vehicle_data
    }


# ==================================================
# History API
# ==================================================

@app.get("/api/history")
def history():

    db = SessionLocal()

    detections = get_all_detections(db)

    history = []

    for item in detections:

        history.append({
            "id": item.id,
            "plate_number": item.plate_number,
            "confidence": item.confidence,
            "image_name": item.image_name,
            "detection_time": item.detection_time,
            "status": item.status
        })

    db.close()

    return history


# ==================================================
# Dashboard API
# ==================================================

@app.get("/api/dashboard")
def dashboard():

    db = SessionLocal()

    detections = get_all_detections(db)

    total_images = len(detections)

    total_detected = len(detections)

    avg_confidence = 0

    if total_detected:

        avg_confidence = round(
            sum(float(x.confidence) for x in detections)
            / total_detected
            * 100,
            1,
        )

    recent = []

    for item in detections[:5]:

        recent.append({
            "plate_number": item.plate_number,
            "image_name": item.image_name,
            "confidence": item.confidence,
            "time": item.detection_time,
            "status": item.status,
        })

    db.close()

    return {
        "images_uploaded": total_images,
        "vehicles_detected": total_detected,
        "ocr_accuracy": avg_confidence,
        "recent": recent,
    }


# ==================================================
# Analytics API (NEW)
# ==================================================

@app.get("/api/analytics")
def analytics():

    db = SessionLocal()

    detections = get_all_detections(db)

    total = len(detections)

    average = 0

    if total:

        average = round(
            sum(float(x.confidence) for x in detections)
            / total
            * 100,
            1,
        )

    # Count detections by date

    dates = []

    for item in detections:

        date = item.detection_time.split(" ")[0]

        dates.append(date)

    counter = Counter(dates)

    labels = list(counter.keys())[::-1]

    values = list(counter.values())[::-1]

    db.close()

    return {
        "totalDetections": total,
        "averageConfidence": average,
        "labels": labels,
        "values": values
    }


@app.get("/api/search/{plate_number}")
def search_vehicle(plate_number: str):

    db = SessionLocal()

    vehicle = get_vehicle_by_plate(db, plate_number.upper())

    db.close()

    if vehicle:

        return {
            "found": True,
            "owner_name": vehicle.owner_name,
            "vehicle_name": vehicle.vehicle_name,
            "company": vehicle.company,
            "model": vehicle.model,
            "color": vehicle.color,
            "fuel_type": vehicle.fuel_type,
            "registration_year": vehicle.registration_year,
            "insurance_status": vehicle.insurance_status,
            "owner_mobile": vehicle.owner_mobile,
            "address": vehicle.address,
        }

    return {
        "found": False,
        "message": "Vehicle Not Found"
    }