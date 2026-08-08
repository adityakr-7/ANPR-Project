from database.database import SessionLocal
from database.models import Vehicle

db = SessionLocal()

# Clear existing records (optional)
db.query(Vehicle).delete()

vehicles = [

    Vehicle(
        plate_number="TN09BY9726",
        owner_name="Arjun Kumar",
        vehicle_name="Creta",
        company="Hyundai",
        model="Creta SX(O) 1.5",
        color="White",
        fuel_type="Diesel",
        registration_year="2021",
        insurance_status="Valid",
        owner_mobile="9876543210",
        address="12, Anna Nagar, Chennai, Tamil Nadu"
    ),

    Vehicle(
        plate_number="DL8CAF5034",
        owner_name="Rahul Sharma",
        vehicle_name="Swift Dzire",
        company="Maruti Suzuki",
        model="Swift Dzire VXi",
        color="Silver",
        fuel_type="Petrol",
        registration_year="2019",
        insurance_status="Valid",
        owner_mobile="9812345678",
        address="45, Lajpat Nagar, New Delhi, Delhi"
    ),

    Vehicle(
        plate_number="MH12DE4567",
        owner_name="Rohan Patil",
        vehicle_name="City",
        company="Honda",
        model="City ZX CVT",
        color="Grey",
        fuel_type="Petrol",
        registration_year="2020",
        insurance_status="Valid",
        owner_mobile="9823456789",
        address="78, Koregaon Park, Pune, Maharashtra"
    ),

    Vehicle(
        plate_number="KA01MK5678",
        owner_name="Priya Nair",
        vehicle_name="Seltos",
        company="Kia",
        model="Seltos HTK+",
        color="Red",
        fuel_type="Diesel",
        registration_year="2022",
        insurance_status="Valid",
        owner_mobile="9901234567",
        address="34, Indiranagar, Bengaluru, Karnataka"
    ),

    Vehicle(
        plate_number="UP16FB7890",
        owner_name="Amit Yadav",
        vehicle_name="Scorpio N",
        company="Mahindra",
        model="Scorpio N Z8L",
        color="Black",
        fuel_type="Diesel",
        registration_year="2023",
        insurance_status="Valid",
        owner_mobile="9911223344",
        address="9, Gomti Nagar, Lucknow, Uttar Pradesh"
    ),

    Vehicle(
        plate_number="GJ05CP1357",
        owner_name="Neha Desai",
        vehicle_name="Nexon EV",
        company="Tata",
        model="Nexon EV Max",
        color="Blue",
        fuel_type="Electric",
        registration_year="2023",
        insurance_status="Valid",
        owner_mobile="9922334455",
        address="21, Vastrapur, Ahmedabad, Gujarat"
    ),

    Vehicle(
        plate_number="RJ14UK2468",
        owner_name="Vikram Singh",
        vehicle_name="Thar",
        company="Mahindra",
        model="Thar LX 4WD",
        color="Black",
        fuel_type="Diesel",
        registration_year="2021",
        insurance_status="Valid",
        owner_mobile="9933445566",
        address="16, Vaishali Nagar, Jaipur, Rajasthan"
    ),

    Vehicle(
        plate_number="PB10JG3579",
        owner_name="Simran Kaur",
        vehicle_name="Innova Crysta",
        company="Toyota",
        model="Innova Crysta GX",
        color="White",
        fuel_type="Diesel",
        registration_year="2020",
        insurance_status="Valid",
        owner_mobile="9944556677",
        address="88, Sector 22, Chandigarh"
    ),

    Vehicle(
        plate_number="KL07CN4689",
        owner_name="Jithin Joseph",
        vehicle_name="Baleno",
        company="Maruti Suzuki",
        model="Baleno Alpha",
        color="Blue",
        fuel_type="Petrol",
        registration_year="2018",
        insurance_status="Expired",
        owner_mobile="9955667788",
        address="27, Kakkanad, Kochi, Kerala"
    ),

    Vehicle(
        plate_number="WB02AN5791",
        owner_name="Sourav Roy",
        vehicle_name="XUV700",
        company="Mahindra",
        model="XUV700 AX7",
        color="White",
        fuel_type="Diesel",
        registration_year="2023",
        insurance_status="Valid",
        owner_mobile="9966778899",
        address="61, Salt Lake, Kolkata, West Bengal"
    )

]

db.add_all(vehicles)
db.commit()

print("10 Vehicle Records Inserted Successfully!")

db.close()