from django.db import models
from django.contrib.auth.models import User

# Existing choices...

SEX_CHOICES = [
    ('Male', 'Male'),
    ('Female', 'Female'),
]

SUFFIX_CHOICES = [
    ('', ''),
    ('Jr', 'Jr'),
    ('Sr', 'Sr'),
    ('I', 'I'),
    ('II', 'II'),
    ('III', 'III'),
    ('IV', 'IV'),
    ('V', 'V'),
]

VERIFICATION_STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('verified', 'Verified'),
    ('rejected', 'Rejected'),
]

# --- New Models ---

class IdentificationCardType(models.Model):
    type_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.type_name

class IdentificationCard(models.Model):
    card_type = models.ForeignKey(IdentificationCardType, on_delete=models.PROTECT, related_name='cards')
    id_front = models.URLField(max_length=500)
    id_back = models.URLField(max_length=500, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.card_type.type_name} Card"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    sex = models.CharField(max_length=10, choices=SEX_CHOICES, blank=True, null=True)
    suffix = models.CharField(max_length=5, choices=SUFFIX_CHOICES, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_pic_url = models.URLField(max_length=500, blank=True, null=True)
    municipality = models.CharField(max_length=50, blank=True, null=True)
    barangay = models.CharField(max_length=50, blank=True, null=True)
    province = models.CharField(max_length=50, blank=True, null=True)
    zip_code = models.CharField(max_length=50, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    verification_status = models.CharField(max_length=10, choices=VERIFICATION_STATUS_CHOICES, default='pending')
    verification_notes = models.TextField(blank=True, null=True)
    identification_card = models.OneToOneField(IdentificationCard, on_delete=models.SET_NULL, null=True, blank=True, related_name='user_profile')

    def __str__(self):
        return f"{self.user.username}'s profile"