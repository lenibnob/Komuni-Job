from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from .models import User, Job
from .serializers import UserSerializer, JobSerializer
from rest_framework import viewsets

class RegisterView(APIView):
    permission_classes = [AllowAny] # Change for production
    
    def post(self, request):
        data = request.data.copy()

        # Hash the password before saving
        if 'password_hash' in data:
            data['password_hash'] = make_password(data['password_hash'])

        # Validate the 'sex' field
        allowed_sex_values = ['Male', 'Female', 'Other']
        sex = data.get('sex')
        if sex and sex not in allowed_sex_values:
            return Response({'message': f"Invalid value for 'sex'. Must be one of {allowed_sex_values}."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        # Combine location fields (optional logic based on frontend structure)
        location_fields = ['municipality', 'barangay', 'province', 'zip_code']
        user_location = ', '.join([data.get(field, '') for field in location_fields if data.get(field)])

        # Add the combined user_location to the data
        data['user_location'] = user_location

        first_name = data.get("first_name", "").strip()
        last_name = data.get("last_name", "").strip()
        # Set username as "First Last"
        data["username"] = f"{first_name} {last_name}".strip()

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny] # Change for production
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password_hash')

        if not email or not password:
            return Response({'message': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            if check_password(password, user.password_hash):
                return Response({
                    'message': 'Login successful!',
                    'user_id': user.user_id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'middle_name': user.middle_name,
                    'last_name': user.last_name,
                    'sex': user.sex,
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

class JobViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny] # Change for production
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {
            "message": "Job created successfully!",
            "job": response.data
        }
        return response