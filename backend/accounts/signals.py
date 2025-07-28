from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    """Create or update the user profile when User is created/updated"""
    # Use get_or_create to avoid duplicate profiles
    profile, created_profile = UserProfile.objects.get_or_create(user=instance)
    
    if not created and not created_profile:
        profile.save()