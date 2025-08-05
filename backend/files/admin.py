from django.contrib import admin
from .models import FileCategory, File
from rest_framework import permissions

@admin.register(FileCategory)
class FileCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'folder_path', 'description')
    search_fields = ('name', 'folder_path')

@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('original_filename', 'category', 'content_type_str', 'object_id', 'uploader', 'created_at')
    list_filter = ('category', 'content_type_str', 'is_public', 'is_active', 'created_at')
    search_fields = ('original_filename', 'uploader__username', 'file_url')
    date_hierarchy = 'created_at'

class IsFileOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of a file or admins to view/edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Allow admins
        if request.user.is_staff:
            return True
            
        # Check if user is the uploader
        return obj.uploader == request.user