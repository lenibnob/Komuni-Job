from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password_hash': {'write_only': True},  # Hide password in responses
            'email': {'required': True},           # Make email required
            'username': {'required': True},        # Ensure username is required
        }

    def validate(self, data):
        # Validate password length
        if 'password_hash' in data and len(data['password_hash']) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")

        # Validate email format
        if 'email' in data:
            if not serializers.EmailField().run_validation(data['email']):
                raise serializers.ValidationError("Invalid email format.")

        # Ensure username uniqueness
        if 'username' in data:
            if User.objects.filter(username=data['username']).exists():
                raise serializers.ValidationError("Username already exists.")

        # Validate optional fields (e.g., phone number)
        if 'phone_number' in data and data['phone_number']:
            if not data['phone_number'].isdigit():
                raise serializers.ValidationError("Phone number must contain only digits.")

        return data