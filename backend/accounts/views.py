from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from .models import UserProfile
from django.db import transaction

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        mutable_data = request.data.copy()

        # Extract profile data
        profile_fields = [
            'middle_name', 'sex', 'phone_number', 'profile_pic_url',
            'municipality', 'barangay', 'province', 'zip_code', 'bio', 'suffix'
        ]
        profile_data = {field: mutable_data.get(field) for field in profile_fields if mutable_data.get(field) is not None}

        # Temporary username from email if not provided
        email = mutable_data.get('email', '')
        if email and not mutable_data.get('username'):
            mutable_data['username'] = email.split('@')[0]

        serializer = UserSerializer(data=mutable_data)
        if serializer.is_valid():
            with transaction.atomic():
                user = serializer.save()
                # Update username to pattern: first.last#id
                new_username = f"{user.first_name.lower()}.{user.last_name.lower()}#{user.id}"
                user.username = new_username
                user.save()
                # Update profile
                profile, created = UserProfile.objects.get_or_create(user=user)
                for field, value in profile_data.items():
                    setattr(profile, field, value)
                profile.save()

                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'Registration successful!',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': UserSerializer(user).data
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
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
            return Response({
                'message': 'Login successful!',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
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