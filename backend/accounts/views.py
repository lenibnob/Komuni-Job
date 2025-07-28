from rest_framework import status, generics
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
        profile_data = {}
        profile_fields = ['middle_name', 'sex', 'phone_number', 'municipality', 
                         'barangay', 'province', 'zip_code', 'bio']
        
        for field in profile_fields:
            if field in mutable_data:
                profile_data[field] = mutable_data.get(field)
                # Optional: Remove from main data if you don't want serializer validation errors
                # mutable_data.pop(field)
        
        # Add temporary username based on email
        email = mutable_data.get('email', '')
        if email and not mutable_data.get('username'):
            mutable_data['username'] = email.split('@')[0]  # Temporary username
        
        serializer = UserSerializer(data=mutable_data)
        
        if serializer.is_valid():
            # Use a transaction to ensure atomicity
            with transaction.atomic():
                # First create the user with temporary username
                user = serializer.save()
                
                # Now generate the actual username with the ID
                first_name = user.first_name.lower()
                last_name = user.last_name.lower()
                new_username = f"{first_name}.{last_name}#{user.id}"
                
                # Update the username
                user.username = new_username
                user.save()
                
                # Create and update profile with the extracted data
                profile, created = UserProfile.objects.get_or_create(user=user)
                for field, value in profile_data.items():
                    setattr(profile, field, value)
                profile.save()
                
                # Generate tokens
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
        
        # Find the user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=400)
            
        # Authenticate with found username
        user = authenticate(username=user.username, password=password)
        
        if user:
            # Generate JWT tokens
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
        """Get current user's profile"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        """Update current user's profile"""
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile updated successfully',
                'user': serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)