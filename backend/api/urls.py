from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, JobViewSet

router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='job')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # Register endpoint
    path('login/', LoginView.as_view(), name='login'),          # Login endpoint
    path('', include(router.urls)),  # Include JobViewSet URLs
]