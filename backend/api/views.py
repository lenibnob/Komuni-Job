from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from .models import User
from .serializers import UserSerializer

class RegisterView(APIView):
    def post(self, request):
        data = request.data

        # Combine location fields (optional logic based on frontend structure)
        user_location = data.get('user_location', '')

        # Hash the password before saving
        data['password_hash'] = make_password(data['password_hash'])

        serializer = UserSerializer(data={**data, 'user_location': user_location})
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password_hash')

        try:
            user = User.objects.get(username=username)
            if check_password(password, user.password_hash):
                return Response({'message': 'Login successful!', 'user_id': user.user_id}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
