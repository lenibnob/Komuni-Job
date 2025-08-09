from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .serializers import (
    UserSerializer,
    UserProfileVerificationAdminSerializer,
    IdentificationCardUploadSerializer,
    IdentificationCardSerializer,
    UserProfileSerializer,
)
from django.middleware.csrf import get_token
from .models import UserProfile, VERIFICATION_STATUS_CHOICES, IdentificationCard, IdentificationCardType
from django.db import transaction
from files.services import FileService
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

@method_decorator(ensure_csrf_cookie, name='dispatch')
def csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        mutable_data = request.data.copy()
        profile_fields = [
            'middle_name', 'sex', 'phone_number', 'profile_pic_url',
            'municipality', 'barangay', 'province', 'zip_code', 'bio', 'suffix',
            'address'
        ]
        profile_data = {field: mutable_data.get(field) for field in profile_fields if mutable_data.get(field) is not None}

        email = mutable_data.get('email', '')
        password = mutable_data.get('password', '')   # <-- GET THE PASSWORD HERE
        if email and not mutable_data.get('username'):
            mutable_data['username'] = email.split('@')[0]

        # Remove password from serializer data if not in serializer fields
        mutable_data_for_serializer = mutable_data.copy()
        if 'password' in mutable_data_for_serializer:
            del mutable_data_for_serializer['password']

        serializer = UserSerializer(data=mutable_data_for_serializer)
        if serializer.is_valid():
            with transaction.atomic():
                user = serializer.save()
                # SET THE PASSWORD HERE
                user.set_password(password)
                # Generate username (optional, as in your logic)
                new_username = f"{user.first_name.replace(' ', '').lower()}.{user.last_name.replace(' ', '').lower()}#{user.id}"
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
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Please provide both email and password'}, status=400)
        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'success': False}, status=400)

        user = authenticate(username=user_obj.username, password=password)

        if user:
            get_token(request)
            login(request, user)
            return Response({'success': True,  'user': UserSerializer(user).data})

        return Response({'success': False}, status=200)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        serializer = UserProfileSerializer(profile)
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

        # Make request.data mutable for SimpleJWT
        data = request.data.copy()
        data['refresh'] = refresh_token
        request._full_data = data  # monkey patch for DRF

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
            res.delete_cookie("sessionid", path='/', samesite="None", domain="localhost")
            res.delete_cookie("csrftoken", path='/', samesite="None", domain="localhost")
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
            user_profile.profile_pic_url = file_obj.file_url if hasattr(file_obj, 'file_url') else file_obj['file_url']
            user_profile.save()
            
            return Response({
                'success': True,
                'profile_pic_url': user_profile.profile_pic_url
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CoverPhotoUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            file = request.FILES.get('cover_photo')
            if not file:
                return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

            file_obj = FileService.upload_file(
                file_obj=file,
                category_name='Cover Photos',
                user=request.user,
                content_type_str='userprofile',
                object_id=request.user.profile.id,
                is_public=True
            )

            user_profile = request.user.profile
            user_profile.cover_photo_url = file_obj.file_url if hasattr(file_obj, 'file_url') else file_obj['file_url']
            user_profile.save()

            # Use FileService directly, no re-import
            signed_url = FileService.get_signed_url_from_path(user_profile.cover_photo_url, expires_in=3600)

            return Response({
                'success': True,
                'cover_photo_url': user_profile.cover_photo_url,
                'cover_photo_signed_url': signed_url
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

class IdentificationCardDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        card = profile.identification_card
        if not card:
            return Response({'error': 'No identification card found'}, status=status.HTTP_404_NOT_FOUND)
        # Use your serializer for IdentificationCard
        from .serializers import IdentificationCardSerializer
        serializer = IdentificationCardSerializer(card, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserIdView(APIView):
    permission_classes = [IsAuthenticated]

    def get_id(request):
        try:
            user = request.user
            data = {
                "id": user.id
            }
            return JsonResponse({"owner_id":data}, status=200)
        except Exception as e:
            return JsonResponse({"error": "User not found"}, status=404)

    def get(self, request, owner):
        try:
            user = User.objects.filter(id=owner)
            data = {
                "first_name": user.first_name,
                "last_name": user.last_name
            }
            return JsonResponse({"job_owner":data}, status=200)
        except Exception as e:
            return JsonResponse({"error": "User not found"}, status=404)
            
