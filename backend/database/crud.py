from database.models import Detection, Vehicle


# ==========================================
# Save Detection
# ==========================================

def save_detection(db, plate, confidence, image_name, detection_time, status):

    detection = Detection(
        plate_number=plate,
        confidence=confidence,
        image_name=image_name,
        detection_time=detection_time,
        status=status
    )

    db.add(detection)
    db.commit()
    db.refresh(detection)

    return detection


# ==========================================
# Get All Detections
# ==========================================

def get_all_detections(db):

    return db.query(Detection).order_by(Detection.id.desc()).all()


# ==========================================
# Find Vehicle By Plate Number
# ==========================================

def get_vehicle_by_plate(db, plate_number):

    return (
        db.query(Vehicle)
        .filter(Vehicle.plate_number == plate_number)
        .first()
    )