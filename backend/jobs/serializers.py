from rest_framework import serializers
from .models import Job, JobImage, JobApplication, PaymentOption, JobCategory, JobSkill
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class PaymentOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentOption
        fields = ['payment_option_id', 'payment_option_type']

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = ['job_cat_id', 'job_cat_name']

class JobSkillSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    
    class Meta:
        model = JobSkill
        fields = ['job_skill_id', 'job_skill_name', 'job_category', 'category_name']
    
    def get_category_name(self, obj):
        return obj.job_category.job_cat_name if obj.job_category else None

class JobImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobImage
        fields = ['job_image_id', 'job_id', 'image', 'image_upload_date']

class JobSerializer(serializers.ModelSerializer):
    images = JobImageSerializer(many=True, read_only=True)
    employer_name = serializers.SerializerMethodField()
    application_count = serializers.SerializerMethodField()
    payment_option_type = serializers.SerializerMethodField()
    job_category_name = serializers.SerializerMethodField()
    required_skill_names = serializers.SerializerMethodField()
    required_skills = serializers.PrimaryKeyRelatedField(
        queryset=JobSkill.objects.all(), many=True
    )
    
    class Meta:
        model = Job
        fields = [
            'job_id', 'user_id', 'job_title', 'job_description',
            'payment_option', 'payment_option_type', 'payment_amount',
            'job_location', 'job_category', 'job_category_name',
            'required_skills', 'required_skill_names', 'job_post_date',
            'application_deadline', 'job_expire_date', 'job_is_active',
            'job_viewcount', 'images', 'employer_name', 'application_count'
        ]
        read_only_fields = ['job_id', 'user_id', 'job_post_date', 'job_viewcount']
        
    def get_employer_name(self, obj):
        return f"{obj.user_id.first_name} {obj.user_id.last_name}" if obj.user_id else None
        
    def get_application_count(self, obj):
        return obj.applications.count()
    
    def get_payment_option_type(self, obj):
        return obj.payment_option.payment_option_type if obj.payment_option else None
    
    def get_job_category_name(self, obj):
        return obj.job_category.job_cat_name if obj.job_category else None
    
    def get_required_skill_names(self, obj):
        return [skill.job_skill_name for skill in obj.required_skills.all()]

class JobApplicationSerializer(serializers.ModelSerializer):
    applicant_name = serializers.SerializerMethodField()
    job_title = serializers.SerializerMethodField()
    applicant_details = UserSerializer(source='applicant_id', read_only=True)
    
    class Meta:
        model = JobApplication
        fields = [
            'application_id', 'job_id', 'applicant_id', 'application_date',
            'status', 'applicant_name', 'job_title', 'applicant_details'
        ]
        read_only_fields = ['application_id', 'applicant_id', 'application_date']
        
    def get_applicant_name(self, obj):
        return f"{obj.applicant_id.first_name} {obj.applicant_id.last_name}" if obj.applicant_id else None
        
    def get_job_title(self, obj):
        return obj.job_id.job_title if obj.job_id else None