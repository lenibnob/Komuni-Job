from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer, UserProfileVerificationAdminSerializer, IdentificationCardUploadSerializer
from .models import UserProfile, VERIFICATION_STATUS_CHOICES, IdentificationCard, IdentificationCardType
from django.db import transaction
from files.services import FileService
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
                new_username = f"{user.first_name.replace(" ", "").lower()}.{user.last_name.replace(" ", "").lower()}#{user.id}"
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
            return Response({'error':"No refresh token found in cookies"})

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

class LogOutView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            res = Response()
            res.data = {'success': True}
            res.delete_cookie("access_token", path='/', samesite="None")
            res.delete_cookie("refresh_token", path='/', samesite="None")
            return res
        except:
            return Response({"error": "Something went wrong"})

class ProfilePictureUploadView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            # Get the file from request
            file = request.FILES.get('profile_picture')
            if not file:
                return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Upload using FileService
            file_obj = FileService.upload_file(
                file_obj=file,
                category_name='Profile Pictures',
                user=request.user,
                content_type_str='userprofile',
                object_id=request.user.profile.id,
                is_public=True
            )
            
            # Update user profile
            user_profile = request.user.profile
            user_profile.profile_pic_url = file_obj.file_url
            user_profile.save()
            
            return Response({
                'success': True,
                'profile_pic_url': file_obj.file_url
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class IdentificationCardUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = IdentificationCardUploadSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user
        card_type_id = serializer.validated_data['card_type_id']
        id_front_file = serializer.validated_data.get('id_front')
        id_back_file = serializer.validated_data.get('id_back')
        notes = serializer.validated_data.get('notes', '')

        # Get card type
        card_type = IdentificationCardType.objects.get(id=card_type_id)

        # Upload files to storage
        id_front_url = None
        id_back_url = None

        if id_front_file:
            front_file_data = FileService.upload_file(
                file_obj=id_front_file,
                category_name='Identification Documents',
                user=user,
                content_type_str='identificationcard',
                object_id=user.id,
                is_public=False
            )
            id_front_url = front_file_data.file_url if hasattr(front_file_data, 'file_url') else front_file_data['file_url']

        if id_back_file:
            back_file_data = FileService.upload_file(
                file_obj=id_back_file,
                category_name='Identification Documents',
                user=user,
                content_type_str='identificationcard',
                object_id=user.id,
                is_public=False
            )
            id_back_url = back_file_data.file_url if hasattr(back_file_data, 'file_url') else back_file_data['file_url']

        # Create or update IdentificationCard for this user and type
        identification_card, _ = IdentificationCard.objects.update_or_create(
            card_type=card_type,
            defaults={
                'id_front': id_front_url,
                'id_back': id_back_url,
                'notes': notes
            }
        )

        # Link to user's profile
        profile = user.profile
        profile.identification_card = identification_card
        profile.save()

        return Response({
            'message': 'ID uploaded successfully.',
            'id_front': id_front_url,
            'id_back': id_back_url
        }, status=status.HTTP_201_CREATED)