from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('refresh/', RefreshTokenView.as_view(), name="token_refresh"),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogOutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('profile/upload-picture/', ProfilePictureUploadView.as_view(), name='profile_picture_upload'),
    path('profile/verify/<int:pk>/', UserProfileVerificationView.as_view(), name='user_profile_verify'),
]