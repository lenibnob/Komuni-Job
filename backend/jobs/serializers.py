from rest_framework import serializers
from .models import Job, JobImage, JobApplication, PaymentOption, JobCategory, JobSkill
from django.contrib.auth.models import User
from files.services import FileService

# Employer info
class EmployerSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()
    is_verified = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['first_name', 'profile_picture', 'is_verified']

    def get_profile_picture(self, obj):
        profile = getattr(obj, 'profile', None)
        if profile and profile.profile_pic_url:
            return FileService.get_signed_url_from_path(profile.profile_pic_url, expires_in=3600)
        return None

    def get_is_verified(self, obj):
        profile = getattr(obj, 'profile', None)
        return profile.verification_status == 'verified' if profile else False

# Job card for job list/grid/search results
class JobCardSerializer(serializers.ModelSerializer):
    cover_photo_signed_url = serializers.SerializerMethodField()
    city = serializers.CharField()
    province = serializers.CharField()
    posted_days_ago = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'job_id', 'job_title', 'cover_photo_signed_url', 'city', 'province',
            'posted_days_ago', 'short_description'
        ]

    def get_cover_photo_signed_url(self, obj):
        if obj.cover_photo_url:
            return FileService.get_signed_url_from_path(obj.cover_photo_url, expires_in=3600)
        return None

    def get_posted_days_ago(self, obj):
        from django.utils import timezone
        delta = timezone.now() - obj.job_post_date
        return delta.days

    def get_short_description(self, obj):
        return obj.job_description[:120] + "..." if len(obj.job_description) > 120 else obj.job_description

# Job images
class JobImageSerializer(serializers.ModelSerializer):
    signed_url = serializers.SerializerMethodField()
    class Meta:
        model = JobImage
        fields = ['job_image_id', 'job_id', 'image', 'signed_url', 'image_upload_date']
    def get_signed_url(self, obj):
        if obj.image:
            return FileService.get_signed_url_from_path(obj.image, expires_in=3600)
        return None

# Public/Applied view (no full address)
class JobDetailPublicSerializer(serializers.ModelSerializer):
    employer = EmployerSerializer(source='user_id', read_only=True)
    cover_photo_signed_url = serializers.SerializerMethodField()
    images = JobImageSerializer(many=True, read_only=True)
    job_category_name = serializers.SerializerMethodField()
    payment_option_type = serializers.SerializerMethodField()
    posted_days_ago = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    vacancies = serializers.IntegerField()
    google_maps_url = serializers.URLField(required=False, allow_blank=True, allow_null=True)  # <-- add this
    cover_photo_url = serializers.URLField(required=False, allow_blank=True, allow_null=True)  # <-- add this

    required_skills = serializers.PrimaryKeyRelatedField(
        queryset=JobSkill.objects.all(), many=True, write_only=True, required=False
    )

    class Meta:
        model = Job
        fields = [
            'job_id', 'employer', 'job_title', 'job_description',
            'cover_photo_signed_url', 'cover_photo_url',   # <-- add cover_photo_url here
            'images',
            'job_category_name', 'job_category', 'province', 'city',
            'tags', 'payment_option_type', 'payment_option', 'payment_amount',
            'posted_days_ago', 'job_post_date', 'application_deadline', 'job_expire_date',
            'vacancies', "google_maps_url",
            'required_skills'
        ]

    def get_cover_photo_signed_url(self, obj):
        if obj.cover_photo_url:
            return FileService.get_signed_url_from_path(obj.cover_photo_url, expires_in=3600)
        return None

    def get_job_category_name(self, obj):
        return obj.job_category.job_cat_name if obj.job_category else None

    def get_payment_option_type(self, obj):
        return obj.payment_option.payment_option_type if obj.payment_option else None

    def get_posted_days_ago(self, obj):
        from django.utils import timezone
        delta = timezone.now() - obj.job_post_date
        return delta.days

    def get_tags(self, obj):
        return [skill.job_skill_name for skill in obj.required_skills.all()]

    def create(self, validated_data):
        required_skills = validated_data.pop('required_skills', [])
        job = super().create(validated_data)
        job.required_skills.set(required_skills)
        return job

    def update(self, instance, validated_data):
        required_skills = validated_data.pop('required_skills', None)
        job = super().update(instance, validated_data)
        if required_skills is not None:
            job.required_skills.set(required_skills)
        return job

# Accepted view (shows address/barangay, google_maps_url)
class JobDetailAcceptedSerializer(JobDetailPublicSerializer):
    google_maps_url = serializers.URLField()  # <-- Only here!

    class Meta(JobDetailPublicSerializer.Meta):
        fields = JobDetailPublicSerializer.Meta.fields + ['barangay', 'address', 'google_maps_url']

# Job application
class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            'application_id', 'job_id', 'applicant_id',
            'application_date', 'status'
        ]

class PaymentOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentOption
        fields = ['payment_option_id', 'payment_option_type']

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = ['job_cat_id', 'job_cat_name']

class JobSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSkill
        fields = ['job_skill_id', 'job_skill_name', 'job_category']

class JobOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ["job_id", "user_id"]