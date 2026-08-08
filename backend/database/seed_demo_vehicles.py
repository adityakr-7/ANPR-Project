from database.database import SessionLocal
from database.models import Vehicle

db = SessionLocal()

vehicles = [

    {
        "plate_number": "TN09BY9726",
        "owner_name": "Arjun Kumar",
        "vehicle_name": "Ciaz",
        "company": "Maruti Suzuki",
        "model": "Ciaz ZXI 1.5",
        "color": "White",
        "fuel_type": "Petrol",
        "registration_year": "2021",
        "insurance_status": "Valid",
        "owner_mobile": "9876543210",
        "address": "Anna Nagar, Chennai"
    },

    {
        "plate_number": "DL8CAF5034",
        "owner_name": "Rahul Sharma",
        "vehicle_name": "Swift Dzire",
        "company": "Maruti Suzuki",
        "model": "VXi",
        "color": "Silver",
        "fuel_type": "Petrol",
        "registration_year": "2019",
        "insurance_status": "Valid",
        "owner_mobile": "9812345678",
        "address": "Lajpat Nagar, Delhi"
    },

    {
        "plate_number": "MH12DE4567",
        "owner_name": "Rohan Patil",
        "vehicle_name": "Honda City",
        "company": "Honda",
        "model": "ZX CVT",
        "color": "White",
        "fuel_type": "Petrol",
        "registration_year": "2020",
        "insurance_status": "Valid",
        "owner_mobile": "9823456789",
        "address": "Pune, Maharashtra"
    },

    {
        "plate_number": "KAO1HK5678",
        "owner_name": "Priya Nair",
        "vehicle_name": "Kia Seltos",
        "company": "Kia",
        "model": "HTK+",
        "color": "Red",
        "fuel_type": "Diesel",
        "registration_year": "2022",
        "insurance_status": "Valid",
        "owner_mobile": "9901234567",
        "address": "Bengaluru, Karnataka"
    },

    {
        "plate_number": "RJ14UA5678",
        "owner_name": "Amit Yadav",
        "vehicle_name": "Scorpio N",
        "company": "Mahindra",
        "model": "Z8L",
        "color": "White",
        "fuel_type": "Diesel",
        "registration_year": "2023",
        "insurance_status": "Valid",
        "owner_mobile": "9911223344",
        "address": "Jaipur, Rajasthan"
    },

    {
        "plate_number": "6J05JK2345",
        "owner_name": "Neha Desai",
        "vehicle_name": "i20",
        "company": "Hundai",
        "model": "Max",
        "color": "White",
        "fuel_type": "Petrol",
        "registration_year": "2023",
        "insurance_status": "Valid",
        "owner_mobile": "9922334455",
        "address": "Ahmedabad, Gujarat"
    },

    {
        "plate_number": "RJ14UK2468",
        "owner_name": "Vikram Singh",
        "vehicle_name": "Thar",
        "company": "Mahindra",
        "model": "LX 4WD",
        "color": "Black",
        "fuel_type": "Diesel",
        "registration_year": "2021",
        "insurance_status": "Valid",
        "owner_mobile": "9933445566",
        "address": "Jaipur, Rajasthan"
    },

    {
        "plate_number": "PB10JG3579",
        "owner_name": "Simran Kaur",
        "vehicle_name": "Innova Crysta",
        "company": "Toyota",
        "model": "GX",
        "color": "White",
        "fuel_type": "Diesel",
        "registration_year": "2020",
        "insurance_status": "Valid",
        "owner_mobile": "9944556677",
        "address": "Chandigarh"
    },

    {
        "plate_number": "KL07CN4689",
        "owner_name": "Jithin Joseph",
        "vehicle_name": "Baleno",
        "company": "Maruti Suzuki",
        "model": "Alpha",
        "color": "Blue",
        "fuel_type": "Petrol",
        "registration_year": "2018",
        "insurance_status": "Expired",
        "owner_mobile": "9955667788",
        "address": "Kochi, Kerala"
    },

    {
        "plate_number": "WB02AN5791",
        "owner_name": "Sourav Roy",
        "vehicle_name": "XUV700",
        "company": "Mahindra",
        "model": "AX7",
        "color": "White",
        "fuel_type": "Diesel",
        "registration_year": "2023",
        "insurance_status": "Valid",
        "owner_mobile": "9966778899",
        "address": "Kolkata, West Bengal"
    }

]

for data in vehicles:

    existing = db.query(Vehicle).filter(
        Vehicle.plate_number == data["plate_number"]
    ).first()

    if existing:
        continue

    db.add(Vehicle(**data))

db.commit()

print("10 Demo Vehicles Added Successfully!")

db.close()