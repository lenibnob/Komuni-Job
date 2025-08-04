from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, SEX_CHOICES, SUFFIX_CHOICES, VERIFICATION_STATUS_CHOICES,
    IdentificationCardType, IdentificationCard
)

class IdentificationCardTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdentificationCardType
        fields = ['id', 'type_name']

class IdentificationCardSerializer(serializers.ModelSerializer):
    card_type = IdentificationCardTypeSerializer()

    class Meta:
        model = IdentificationCard
        fields = ['id', 'card_type', 'id_front', 'id_back', 'notes']

    def create(self, validated_data):
        card_type_data = validated_data.pop('card_type')
        card_type, _ = IdentificationCardType.objects.get_or_create(**card_type_data)
        card = IdentificationCard.objects.create(card_type=card_type, **validated_data)
        return card

    def update(self, instance, validated_data):
        card_type_data = validated_data.pop('card_type', None)
        if card_type_data:
            card_type, _ = IdentificationCardType.objects.get_or_create(**card_type_data)
            instance.card_type = card_type
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class UserProfileSerializer(serializers.ModelSerializer):
    sex = serializers.ChoiceField(choices=SEX_CHOICES, required=False, allow_blank=True, allow_null=True)
    suffix = serializers.ChoiceField(choices=SUFFIX_CHOICES, required=False, allow_blank=True, allow_null=True)
    verification_status = serializers.ChoiceField(choices=VERIFICATION_STATUS_CHOICES, read_only=True)
    verification_notes = serializers.CharField(read_only=True)
    identification_card = IdentificationCardSerializer(required=False, allow_null=True)

    class Meta:
        model = UserProfile
        exclude = ['user']

    def update(self, instance, validated_data):
        id_card_data = validated_data.pop('identification_card', None)
        if id_card_data is not None:
            if instance.identification_card:
                serializer = IdentificationCardSerializer(instance.identification_card, data=id_card_data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
            else:
                serializer = IdentificationCardSerializer(data=id_card_data)
                if serializer.is_valid(raise_exception=True):
                    id_card = serializer.save()
                    instance.identification_card = id_card
        return super().update(instance, validated_data)

    def create(self, validated_data):
        id_card_data = validated_data.pop('identification_card', None)
        profile = super().create(validated_data)
        if id_card_data is not None:
            serializer = IdentificationCardSerializer(data=id_card_data)
            if serializer.is_valid(raise_exception=True):
                id_card = serializer.save()
                profile.identification_card = id_card
                profile.save()
        return profile

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']

class UserProfileVerificationAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['verification_status', 'verification_notes']