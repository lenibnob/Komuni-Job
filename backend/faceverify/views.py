from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
import pytesseract
import re
from deepface import DeepFace
import tempfile
import os

def normalize(text: str) -> str:
    return re.sub(r'[^a-z ]', '', text.lower())

def formatName(first_name: str, middle_name: str, last_name: str, suffix: str) -> list:
    middle_parts = middle_name.split()
    if(len(middle_parts) > 1):
        initials: str = ""
        initials = "".join([initials[0] for initials in middle_parts])
        return [first_name, initials, last_name]
    return [first_name, middle_name[0] if middle_name else '', last_name]

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def verify_id_text_and_face(request):
    try:
        id_image = request.FILES.get('id_image')
        live_image = request.FILES.get('face_image')
        first_name: str = normalize(request.POST.get('first_name', ''))
        middle_name: str = normalize(request.POST.get('middle_name', ''))
        last_name: str = normalize(request.POST.get('last_name', ''))
        suffix: str = normalize(request.POST.get('suffix', ''))
        full_name: str = f"{first_name} {middle_name} {last_name} {suffix}"

        name: list = formatName(first_name, middle_name, last_name, suffix)
        size_of_name: int = len(name)

        if not id_image or not live_image or not first_name or not last_name:
            return Response({'error': 'Missing required fields: id_image, live_image, first_name, last_name'}, status=400)

        try:
            img = Image.open(id_image)
            extracted_text: str = pytesseract.image_to_string(img)
            normalize_text: str = normalize(extracted_text)

            found: list = [part for part in name if part and part in normalize_text]

            if(len(found) != size_of_name):
                # If not all name parts are found, return early
                return Response({
                    "match": False,
                    "full_name": name,
                    "extracted_name": normalize_text,
                    "found": found,
                    "face_match": None
                }, status=200)
        except Exception as e:
            return Response({'error': f"OCR error: {str(e)}"}, status=400)

        # Face Matching (Windows safe & png/jpg compatible)
        try:
            with tempfile.TemporaryDirectory() as tmpdirname:
                # Determine the format from the uploaded file name for id_image
                id_ext = os.path.splitext(id_image.name)[1].lower()
                live_ext = os.path.splitext(live_image.name)[1].lower()
                # Default to .jpg if not png or jpg
                id_save_ext = ".png" if id_ext == ".png" else ".jpg"
                live_save_ext = ".png" if live_ext == ".png" else ".jpg"

                id_path = os.path.join(tmpdirname, f"id{id_save_ext}")
                live_path = os.path.join(tmpdirname, f"live{live_save_ext}")

                id_img = Image.open(id_image)
                id_img.save(id_path)
                
                live_img = Image.open(live_image)
                live_img.save(live_path)

                # DeepFace will detect/crop faces and compare
                try:
                    result = DeepFace.verify(img1_path=live_path, img2_path=id_path)
                    face_match = bool(result.get("verified", False))
                except Exception as e:
                    return Response({'error': f"Face match error: {str(e)}"}, status=400)
        except Exception as e:
            return Response({'error': f"Temp file error: {str(e)}"}, status=400)

        return Response({
            "match": True,
            "full_name": name,
            "extracted_name": normalize_text,
            "found": found,
            "face_match": face_match
        }, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=400)