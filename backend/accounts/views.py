from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer, UserProfileVerificationAdminSerializer
from .models import UserProfile, VERIFICATION_STATUS_CHOICES
from django.db import transaction
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        mutable_data = request.data.copy()
        profile_fields = [
            'middle_name', 'sex', 'phone_number', 'profile_pic_url',
            'municipality', 'barangay', 'province', 'zip_code', 'bio', 'suffix',
            'address'  # Added address field here
        ]
        profile_data = {field: mutable_data.get(field) for field in profile_fields if mutable_data.get(field) is not None}

        email = mutable_data.get('email', '')
        if email and not mutable_data.get('username'):
            mutable_data['username'] = email.split('@')[0]

        serializer = UserSerializer(data=mutable_data)
        if serializer.is_valid():
            with transaction.atomic():
                user = serializer.save()
                new_username = f"{user.first_name.lower()}.{user.last_name.lower()}#{user.id}"
                user.username = new_username
                user.save()
                profile, created = UserProfile.objects.get_or_create(user=user)
                for field, value in profile_data.items():
                    setattr(profile, field, value)
                profile.save()

                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'Registration successful!',
                    'user': UserSerializer(user).data
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        res = Response()
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'error': 'Please provide both email and password'}, status=400)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=400)
        user = authenticate(username=user.username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            access = str(refresh.access_token)
            refresh = str(refresh)
            res = Response({
                'message': 'Login successful!',
                'user': UserSerializer(user).data
            })

            res.data = {"success": True}

            res.set_cookie(
                key='access_token',
                value=access,
                httponly=True,
                secure=False,
                samesite='Lax',
                path='/'
            )

            res.set_cookie(
                key='refresh_token',
                value=refresh,
                httponly=True,
                secure=False,
                samesite='Lax',
                path='/'
            )

            return res
        return Response({'error': 'Invalid credentials'}, status=400)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile updated successfully',
                'user': serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileVerificationView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            profile = UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            return Response({'error': 'UserProfile not found'}, status=404)
        serializer = UserProfileVerificationAdminSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Verification status updated', 'profile': serializer.data})
        return Response(serializer.errors, status=400)
    

class RefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            raise Response({'error':"No refresh token found in cookies"})

        request.data._mutable = True  
        request.data['refresh'] = refresh_token
        request.data._mutable = False

        response = super().post(request, *args, **kwargs)
        access_token = response.data.get('access')

        res = Response({'refreshed': True})

        res.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=False,  
            samesite='Lax',
            path='/'
        )

        return res
