from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from .models import User
from .serializers import UserSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data

        # Hash the password before saving
        if 'password_hash' in data:
            data['password_hash'] = make_password(data['password_hash'])

        # Combine location fields (optional logic based on frontend structure)
        location_fields = ['municipality', 'barangay', 'province', 'zip_code']
        user_location = ', '.join([data.get(field, '') for field in location_fields if data.get(field)])

        # Add the combined user_location to the data
        data['user_location'] = user_location

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password_hash')

        try:
            user = User.objects.get(username=username)
            if check_password(password, user.password_hash):
                return Response({
                    'message': 'Login successful!',
                    'user_id': user.user_id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'middle_name': user.middle_name,
                    'last_name': user.last_name,
                    'phone_number': user.phone_number,
                    'date_joined': user.date_joined,
                    'profile_pic_url': user.profile_pic_url,
                    'municipality': user.municipality,
                    'barangay': user.barangay,
                    'province': user.province,
                    'zip_code': user.zip_code,
                    'bio': user.bio,
                }, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)