from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, SEX_CHOICES, SUFFIX_CHOICES

class UserProfileSerializer(serializers.ModelSerializer):
    sex = serializers.ChoiceField(choices=SEX_CHOICES, required=False, allow_blank=True, allow_null=True)
    suffix = serializers.ChoiceField(choices=SUFFIX_CHOICES, required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = UserProfile
        exclude = ['user']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'profile', 'date_joined']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'date_joined': {'read_only': True},
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data, password=password)
        for attr, value in profile_data.items():
            setattr(user.profile, attr, value)
        user.profile.save()
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        if 'password' in validated_data:
            instance.set_password(validated_data.pop('password'))
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        for attr, value in profile_data.items():
            setattr(instance.profile, attr, value)
        instance.profile.save()
        return instance