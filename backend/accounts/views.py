from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from .models import UserProfile

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        # Create a mutable copy of request data
        data = request.data.copy()
        
        # Set username if not provided
        if 'username' not in data or not data['username']:
            first_name = data.get('first_name', '')
            last_name = data.get('last_name', '')
            if first_name or last_name:
                data['username'] = f"{first_name} {last_name}".strip()
            else:
                email = data.get('email', '')
                data['username'] = email.split('@')[0]
        
        # Extract profile data
        profile_data = {}
        profile_fields = [
            'middle_name', 'sex', 'phone_number', 'profile_pic_url',
            'municipality', 'barangay', 'province', 'zip_code', 'bio'
        ]
        
        for field in profile_fields:
            if field in data:
                profile_data[field] = data.pop(field)
        
        # Add profile data to the serializer data
        if profile_data:
            data['profile'] = profile_data
        
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            # Create response with user data and tokens
            response_data = {
                'message': 'User registered successfully!',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'date_joined': user.date_joined,
                }
            }
            
            # Add profile fields to the response
            profile = user.profile
            profile_fields = {
                'middle_name': profile.middle_name,
                'sex': profile.sex,
                'phone_number': profile.phone_number,
                'profile_pic_url': profile.profile_pic_url,
                'municipality': profile.municipality,
                'barangay': profile.barangay,
                'province': profile.province,
                'zip_code': profile.zip_code,
                'bio': profile.bio,
            }
            
            response_data['user'].update(profile_fields)
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({
                'message': 'Both email and password are required.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Find user by email
        try:
            user = User.objects.get(email=email)
            username = user.username
        except User.DoesNotExist:
            return Response({
                'message': 'No account found with this email address.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            # Create response with user data and tokens
            response_data = {
                'message': 'Login successful!',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'date_joined': user.date_joined,
                }
            }
            
            # Add profile fields to the response
            profile = user.profile
            profile_fields = {
                'middle_name': profile.middle_name,
                'sex': profile.sex,
                'phone_number': profile.phone_number,
                'profile_pic_url': profile.profile_pic_url,
                'municipality': profile.municipality,
                'barangay': profile.barangay,
                'province': profile.province,
                'zip_code': profile.zip_code,
                'bio': profile.bio,
            }
            
            response_data['user'].update(profile_fields)
            
            return Response(response_data, status=status.HTTP_200_OK)
        
        return Response({
            'message': 'Invalid password.'
        }, status=status.HTTP_401_UNAUTHORIZED)

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