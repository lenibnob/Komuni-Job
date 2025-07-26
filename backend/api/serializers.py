from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password_hash': {'write_only': True},  # Hide password in responses
        }

    def validate(self, data):
        if 'password_hash' in data and len(data['password_hash']) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return data