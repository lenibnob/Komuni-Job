from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# User model

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password_hash = models.CharField(max_length=255)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    SEX_CHOICES = [
            ('Male', 'Male'),
            ('Female', 'Female'),
            ('Other', 'Other'),
        ]
    sex = models.CharField(max_length=10, choices=SEX_CHOICES, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    profile_pic_url = models.URLField(max_length=500, blank=True, null=True)
    municipality = models.CharField(max_length=50, blank=True, null=True)
    barangay = models.CharField(max_length=50, blank=True, null=True)
    province = models.CharField(max_length=50, blank=True, null=True)
    zip_code = models.CharField(max_length=50, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.username} ({self.email})'

# Jobs related models

class PaymentOption(models.Model):
    payment_option_type = models.CharField(max_length=50)

    def __str__(self):
        return self.payment_option_type

class JobCategory(models.Model):
    job_cat_name = models.CharField(max_length=50)

    def __str__(self):
        return self.job_cat_name

class JobRequiredSkill(models.Model):
    job_skill_name = models.CharField(max_length=50)

    def __str__(self):
        return self.job_skill_name

class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=255)
    job_description = models.TextField()
    payment_option = models.ForeignKey(PaymentOption, on_delete=models.SET_NULL, null=True)
    payment_amount = models.DecimalField(max_digits=20, decimal_places=2)
    job_location = models.CharField(max_length=500)
    job_category = models.ForeignKey(JobCategory, on_delete=models.SET_NULL, null=True)
    required_skills = models.ForeignKey(JobRequiredSkill, on_delete=models.SET_NULL, null=True)
    job_post_date = models.DateTimeField(auto_now_add=True)
    application_deadline = models.DateTimeField()
    job_expire_date = models.DateTimeField()
    job_is_active = models.BooleanField(default=True)
    job_viewcount = models.IntegerField(default=0)

    def __str__(self):
        return self.job_title

class JobImage(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='images')
    image = models.CharField(max_length=500)  # Store the image URL or path
    image_upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.job.job_title}"