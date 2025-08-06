from rest_framework.decorators import api_view, permission_classes #For testing
from rest_framework.permissions import AllowAny #For testing
from django.http import JsonResponse
from PIL import Image
from django.views.decorators.csrf import csrf_exempt #For testing
import pytesseract
import re

def normalize(text):
    return re.sub(r'[^a-z]', '', text.lower())


def split_name(full_name):
    parts = full_name.strip().split()
    if len(parts) >= 2:
        first = parts[0]
        last = parts[-1]
        middle = ' '.join(parts[1:-1]) if len(parts) > 2 else ''
        return first, middle, last
    else:
        return parts[0], '', ''


@api_view(['POST'])
@permission_classes([AllowAny]) # For testing, ensure user is authenticated
@csrf_exempt # For testing, to allow POST requests without CSRF token
def verify_id_text(request):
    try:
        id_image = request.FILES['id_image']    
        full_name = request.POST['full_name']


        first_name, middle_name, last_name = split_name(full_name)


        # OCR
        img = Image.open(id_image)
        extracted_text = pytesseract.image_to_string(img)
        normalize_text = normalize(extracted_text)


        first_match = normalize(first_name) in normalize_text
        last_match = normalize(last_name) in normalize_text


        if first_match and last_match:
            return JsonResponse({
                'status': 'match',
                'matched_parts':{
                    'first': first_match,
                    'last': last_match,
                    'middle': normalize(middle_name) in normalize_text if middle_name else 'N/A'
                },
            })
        else:
            return JsonResponse({
                'status': 'no_match',
                'matched_parts':{
                    'first': first_match,
                    'last': last_match,
                    'middle': normalize(middle_name) in normalize_text if middle_name else 'N/A'
                },
                'extracted_text': extracted_text
            })


    except Exception as e:
        return JsonResponse({'error': str(e)})