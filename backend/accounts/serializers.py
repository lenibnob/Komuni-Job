from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile,
    IdentificationCard,
    IdentificationCardType,
    SEX_CHOICES,
    SUFFIX_CHOICES,
    VERIFICATION_STATUS_CHOICES,
)

class IdentificationCardTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdentificationCardType
        fields = ['id', 'type_name']

class IdentificationCardSerializer(serializers.ModelSerializer):
    card_type = IdentificationCardTypeSerializer(read_only=True)

    class Meta:
        model = IdentificationCard
        fields = ['id', 'card_type', 'id_front', 'id_back', 'notes']
        read_only_fields = fields

class UserProfileSerializer(serializers.ModelSerializer):
    sex = serializers.ChoiceField(choices=SEX_CHOICES, required=False, allow_null=True)
    suffix = serializers.ChoiceField(choices=SUFFIX_CHOICES, required=False, allow_null=True)
    verification_status = serializers.ChoiceField(choices=VERIFICATION_STATUS_CHOICES, read_only=True)
    verification_notes = serializers.CharField(read_only=True)
    identification_card = IdentificationCardSerializer(read_only=True, allow_null=True)

    class Meta:
        model = UserProfile
        exclude = ['user']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class IdentificationCardUploadSerializer(serializers.Serializer):
    card_type_id = serializers.IntegerField(required=True)
    id_front = serializers.FileField(required=True)
    id_back = serializers.FileField(required=False, allow_null=True)
    notes = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    def validate(self, attrs):
        if not attrs.get('id_front'):
            raise serializers.ValidationError({'id_front': 'Front image is required.'})
        return attrs

class UserProfileVerificationAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['verification_status', 'verification_notes']