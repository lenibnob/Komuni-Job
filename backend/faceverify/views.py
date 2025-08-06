from rest_framework.decorators import api_view, permission_classes #For testing
from rest_framework.permissions import AllowAny #For testing
from rest_framework.response import Response
from django.http import JsonResponse
from PIL import Image
from django.views.decorators.csrf import csrf_exempt #For testing
import pytesseract
import re

def normalize(text: str) -> str:
    return re.sub(r'[^a-z]', '', text.lower())

@api_view(['POST'])
@permission_classes([AllowAny]) # For testing, ensure user is authenticated
@csrf_exempt # For testing, to allow POST requests without CSRF token
def verify_id_text(request):
    try:
        id_image = request.FILES.get('id_image')   
        full_name = request.POST.get('full_name')

        if not id_image or not full_name:
            return Response({'error': 'Missing full_name or id_image'}, status=400)

        try:
            full_name = normalize(full_name)
            # OCR
            img = Image.open(id_image)
            extracted_text = pytesseract.image_to_string(img)
            normalize_text = normalize(extracted_text)

            if(normalize_text.find(full_name) > -1):
                return Response({"match": True, "full_name": full_name, "extracted_name": normalize_text}, status=200)
            else:
                return Response({"match": False, "full_name": full_name, "extracted_name": normalize_text}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=400)