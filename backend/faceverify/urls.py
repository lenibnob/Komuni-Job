from django.urls import path
from .views import verify_id_text

urlpatterns = [
    path('id-ocr/', verify_id_text),
]
