from django.contrib.auth import get_user_model
from .models import FileCategory, File
from .storage import upload_file_to_supabase, delete_file_from_supabase

User = get_user_model()

class FileService:
    @staticmethod
    def upload_file(file_obj, category_name, user, content_type_str, object_id, is_public=True):
        """
        Upload file and create database record
        
        Args:
            file_obj: Django UploadedFile object
            category_name: Name of category (must exist)
            user: User who is uploading the file
            content_type_str: Type of model this file belongs to (e.g., 'userprofile', 'job')
            object_id: ID of the related object
            is_public: Whether file should be publicly accessible
            
        Returns:
            File: Created File object
        """
        # Get category
        try:
            category = FileCategory.objects.get(name=category_name)
        except FileCategory.DoesNotExist:
            raise ValueError(f"Category '{category_name}' does not exist")
        
        # Upload to Supabase
        file_data = upload_file_to_supabase(file_obj, category.folder_path)
        
        # Create file record
        file = File.objects.create(
            file_url=file_data['file_url'],
            filename=file_data['filename'],
            original_filename=file_data['original_filename'],
            file_type=file_data['file_type'],
            file_size=file_data['file_size'],
            category=category,
            uploader=user,
            content_type_str=content_type_str,
            object_id=object_id,
            is_public=is_public
        )
        
        return file
    
    @staticmethod
    def get_files_for_object(content_type_str, object_id):
        """Get all files for a specific object"""
        return File.objects.filter(
            content_type_str=content_type_str,
            object_id=object_id,
            is_active=True
        )
    
    @staticmethod
    def get_file_by_id(file_id):
        """Get file by ID"""
        return File.objects.get(id=file_id)
    
    @staticmethod
    def delete_file(file_id):
        """Delete file from storage and database"""
        file = File.objects.get(id=file_id)
        
        # Extract path from URL
        path = "/".join(file.file_url.split("/")[-2:])
        
        # Delete from Supabase
        delete_result = delete_file_from_supabase(path)
        
        if delete_result:
            # Mark as inactive in database (soft delete)
            file.is_active = False
            file.save()
            
        return delete_result