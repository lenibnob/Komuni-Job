from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile, IdentificationCard
from files.services import FileService

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class IdentificationCardUploadSerializer(serializers.Serializer):
    card_type_id = serializers.IntegerField()
    id_front = serializers.FileField(required=False)
    id_back = serializers.FileField(required=False)
    notes = serializers.CharField(required=False, allow_blank=True)

class IdentificationCardSerializer(serializers.ModelSerializer):
    id_front_signed_url = serializers.SerializerMethodField()
    id_back_signed_url = serializers.SerializerMethodField()

    class Meta:
        model = IdentificationCard
        fields = [
            'id',
            'card_type',
            'id_front',
            'id_back',
            'id_front_signed_url',
            'id_back_signed_url',
            'notes',
        ]

    def get_id_front_signed_url(self, obj):
        if obj.id_front:
            return FileService.get_signed_url_from_path(obj.id_front, expires_in=3600)
        return None

    def get_id_back_signed_url(self, obj):
        if obj.id_back:
            return FileService.get_signed_url_from_path(obj.id_back, expires_in=3600)
        return None

class UserProfileVerificationAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['verification_status']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    profile_pic_signed_url = serializers.SerializerMethodField()
    cover_photo_signed_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            'id',
            'user',
            'bio',
            'phone_number',
            'middle_name',
            'sex',
            'suffix',
            'profile_pic_url',
            'profile_pic_signed_url',
            'cover_photo_url',
            'cover_photo_signed_url',
            'address',
            'municipality',
            'barangay',
            'province',
            'zip_code',
            'verification_status',
            'verification_notes',
            'identification_card',
        ]

    def get_profile_pic_signed_url(self, obj):
        if obj.profile_pic_url:
            return FileService.get_signed_url_from_path(obj.profile_pic_url, expires_in=3600)
        return None

    def get_cover_photo_signed_url(self, obj):
        if obj.cover_photo_url:
            return FileService.get_signed_url_from_path(obj.cover_photo_url, expires_in=3600)
        return None