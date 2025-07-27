from rest_framework import serializers
from .models import User, Job, JobImage, PaymentOption, JobCategory, JobRequiredSkill

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

        # Validate phonenumber
        if 'phone_number' in data and data['phone_number']:
            if not data['phone_number'].isdigit():
                raise serializers.ValidationError("Phone number must contain only digits.")

        # Validate sex field
        if 'sex' in data and data['sex']:
            valid_sex_values = ['Male', 'Female', 'Other']
            if data['sex'] not in valid_sex_values:
                raise serializers.ValidationError(f"Sex must be one of {valid_sex_values}.")

        return data

class PaymentOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentOption
        fields = '__all__'

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = '__all__'

class JobRequiredSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRequiredSkill
        fields = '__all__'

class JobImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobImage
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    images = JobImageSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = '__all__'