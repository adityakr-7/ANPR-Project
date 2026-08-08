from sqlalchemy import Column, Integer, String
from database.database import Base


# ==========================================
# Detection History Table
# ==========================================

class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True, index=True)

    plate_number = Column(String)

    confidence = Column(String)

    image_name = Column(String)

    detection_time = Column(String)

    status = Column(String)


# ==========================================
# Vehicle Information Table
# ==========================================

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)

    plate_number = Column(String, unique=True, index=True)

    owner_name = Column(String)

    vehicle_name = Column(String)

    company = Column(String)

    model = Column(String)

    color = Column(String)

    fuel_type = Column(String)

    registration_year = Column(String)

    insurance_status = Column(String)

    owner_mobile = Column(String)

    address = Column(String)