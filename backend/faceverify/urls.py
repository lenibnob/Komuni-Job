from django.urls import path
from .views import verify_id_text_and_face

urlpatterns = [
    path('id-ocr/', verify_id_text_and_face),
]
