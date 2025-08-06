from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class FileCategory(models.Model):
    """Categories for different types of files (profile pictures, job images, etc.)"""
    name = models.CharField(max_length=100)
    folder_path = models.CharField(max_length=255, help_text="Path within storage bucket")
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "File categories"
    
    def __str__(self):
        return self.name

class File(models.Model):
    """Centralized model for all files across the application"""
    file_url = models.URLField(max_length=500)
    filename = models.CharField(max_length=255)
    original_filename = models.CharField(max_length=255)
    file_type = models.CharField(max_length=100)  # MIME type
    file_size = models.PositiveIntegerField(help_text="Size in bytes")
    category = models.ForeignKey(FileCategory, on_delete=models.PROTECT, related_name='files')
    uploader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_files')
    
    # Generic relation to connect this file to any model
    content_type_str = models.CharField(max_length=100, help_text="Model name this file belongs to")
    object_id = models.PositiveIntegerField(help_text="ID of the related object")
    
    is_public = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.original_filename} ({self.category.name})"
    
    class Meta:
        indexes = [
            models.Index(fields=['content_type_str', 'object_id']),
        ]