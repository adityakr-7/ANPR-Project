from ultralytics import YOLO
import cv2
import easyocr
import os
import re

# =====================================
# Load YOLO Model (Loads Once)
# =====================================

model = YOLO("ai/models/best.pt")

# =====================================
# Load EasyOCR (Loads Once)
# =====================================

reader = easyocr.Reader(["en"], gpu=False)


# =====================================
# Detect Number Plate
# =====================================

def detect_plate(image_path):

    image = cv2.imread(image_path)

    if image is None:
        return []

    original = image.copy()

    results = model(image)

    os.makedirs("ai/results", exist_ok=True)

    detections = []

    annotated_path = "ai/results/annotated_result.jpg"

    for result in results:

        for box in result.boxes:

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            confidence = float(box.conf[0])

            # ---------------------------------
            # Crop Number Plate
            # ---------------------------------

            plate = image[y1:y2, x1:x2]

            crop_path = "ai/results/cropped_plate.jpg"

            cv2.imwrite(crop_path, plate)

            # ---------------------------------
            # Image Preprocessing (Previous Better Version)
            # ---------------------------------

            gray = cv2.cvtColor(plate, cv2.COLOR_BGR2GRAY)

            gray = cv2.GaussianBlur(gray, (3, 3), 0)

            _, thresh = cv2.threshold(
                gray,
                0,
                255,
                cv2.THRESH_BINARY + cv2.THRESH_OTSU,
            )

            processed_path = "ai/results/processed_plate.jpg"

            cv2.imwrite(processed_path, thresh)

            # ---------------------------------
            # OCR
            # ---------------------------------

            ocr_result = reader.readtext(
                thresh,
                detail=1,
                paragraph=False,
            )

            plate_text = ""

            if len(ocr_result) > 0:

                plate_text = ocr_result[0][1]

                # Keep only A-Z and 0-9
                plate_text = re.sub(
                    r"[^A-Z0-9]",
                    "",
                    plate_text.upper(),
                )

            # ---------------------------------
            # Draw Bounding Box
            # ---------------------------------

            cv2.rectangle(
                original,
                (x1, y1),
                (x2, y2),
                (0, 255, 0),
                3,
            )

            label = f"{plate_text} ({confidence * 100:.1f}%)"

            (text_width, text_height), _ = cv2.getTextSize(
                label,
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                2,
            )

            cv2.rectangle(
                original,
                (x1, y1 - 35),
                (x1 + text_width + 10, y1),
                (0, 255, 0),
                -1,
            )

            cv2.putText(
                original,
                label,
                (x1 + 5, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 0, 0),
                2,
            )

            detections.append(
                {
                    "plate_number": plate_text,
                    "confidence": round(confidence, 2),
                    "crop_path": crop_path,
                    "processed_path": processed_path,
                    "annotated_path": annotated_path,
                    "x1": x1,
                    "y1": y1,
                    "x2": x2,
                    "y2": y2,
                }
            )

    # Save Annotated Image

    cv2.imwrite(annotated_path, original)

    return detections