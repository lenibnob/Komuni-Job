from rest_framework.decorators import api_view, permission_classes #For testing
from rest_framework.permissions import AllowAny #For testing
from rest_framework.response import Response
from django.http import JsonResponse
from PIL import Image
from django.views.decorators.csrf import csrf_exempt #For testing
import pytesseract
import re

def normalize(text: str) -> str:
    return re.sub(r'[^a-z ]', '', text.lower())

def formatName(first_name: str, middle_name: str, last_name: str) -> list:
    middle_parts = middle_name.split()
    if(len(middle_parts) > 1):
        initials: str = ""
        initials = "".join([initials[0] for initials in middle_parts])
        return [first_name, initials, last_name]
    return [first_name, middle_name[0], last_name]


@api_view(['POST'])
@permission_classes([AllowAny]) # For testing, ensure user is authenticated
@csrf_exempt # For testing, to allow POST requests without CSRF token
def verify_id_text(request):
    try:
        id_image = request.FILES.get('id_image')   
        first_name: str = normalize(request.POST.get('first_name'))
        middle_name: str = normalize(request.POST.get('middle_name'))
        last_name: str = normalize(request.POST.get('last_name'))
        full_name: str = f"{first_name} {middle_name} {last_name}"
        
        name: list = formatName(first_name, middle_name, last_name)
        size_of_name: int = len(name)

        if not id_image or not full_name:
            return Response({'error': 'Missing full_name or id_image'}, status=400)

        try:
            img = Image.open(id_image)
            extracted_text: str = pytesseract.image_to_string(img)
            normalize_text: str = normalize(extracted_text)

            found: list = [part for part in name if part in normalize_text]

            if(len(found) == size_of_name):
                return Response({"match": True, "full_name": name, "extracted_name": normalize_text, "found:": found}, status=200)
            else:
                return Response({"match": False, "full_name": name, "extracted_name": normalize_text, "found:": found}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=400)