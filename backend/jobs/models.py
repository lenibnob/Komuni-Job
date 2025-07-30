from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class PaymentOption(models.Model):
    payment_option_id = models.AutoField(primary_key=True)
    payment_option_type = models.CharField(max_length=100)
    
    def __str__(self):
        return self.payment_option_type

class JobCategory(models.Model):
    job_cat_id = models.AutoField(primary_key=True)
    job_cat_name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.job_cat_name

class JobSkill(models.Model):
    job_skill_id = models.AutoField(primary_key=True)
    job_skill_name = models.CharField(max_length=100)
    job_category = models.ForeignKey(JobCategory, on_delete=models.CASCADE, related_name='skills')
    
    def __str__(self):
        return self.job_skill_name

class Job(models.Model):
    job_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    job_title = models.CharField(max_length=200)
    job_description = models.TextField()
    payment_option = models.ForeignKey(PaymentOption, on_delete=models.PROTECT)
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    job_location = models.CharField(max_length=100)
    job_category = models.ForeignKey(JobCategory, on_delete=models.PROTECT)
    required_skills = models.ManyToManyField(JobSkill)
    job_post_date = models.DateTimeField(default=timezone.now)
    application_deadline = models.DateTimeField()
    job_expire_date = models.DateTimeField()
    job_is_active = models.BooleanField(default=True)
    job_viewcount = models.IntegerField(default=0)
    
    def __str__(self):
        return self.job_title

class JobImage(models.Model):
    job_image_id = models.AutoField(primary_key=True)
    job_id = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='images')
    image = models.URLField()  # Store image URL
    image_upload_date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Image for {self.job_id.job_title}"

class JobApplication(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('REJECTED', 'Rejected'),
        ('SHORTLISTED', 'Shortlisted'),
        ('ACCEPTED', 'Accepted'),
    )
    
    application_id = models.AutoField(primary_key=True)
    job_id = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    applicant_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    application_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    
    class Meta:
        unique_together = ('job_id', 'applicant_id')
        
    def __str__(self):
        return f"Application for {self.job_id.job_title} by {self.applicant_id.username}"