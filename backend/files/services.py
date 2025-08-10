from django.contrib.auth import get_user_model
from .models import FileCategory, File
from .storage import upload_file_to_supabase, delete_file_from_supabase, generate_signed_url_from_supabase

User = get_user_model()

class FileService:
    @staticmethod
    def upload_file(file_obj, category_name, user, content_type_str, object_id, is_public=True):
        try:
            category = FileCategory.objects.get(name=category_name)
        except FileCategory.DoesNotExist:
            raise ValueError(f"Category '{category_name}' does not exist")
        file_data = upload_file_to_supabase(file_obj, category.folder_path)
        file = File.objects.create(
            file_url=file_data['storage_path'],  
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
        return File.objects.filter(
            content_type_str=content_type_str,
            object_id=object_id,
            is_active=True
        )

    @staticmethod
    def get_file_by_id(file_id):
        return File.objects.get(id=file_id)

    @staticmethod
    def delete_file(file_id):
        file = File.objects.get(id=file_id)
        path = file.file_url 
        delete_result = delete_file_from_supabase(path)
        if delete_result:
            file.is_active = False
            file.save()
        return delete_result

    @staticmethod
    def generate_signed_url(file_id, expires_in=3600):
        file = File.objects.get(id=file_id)
        signed_url = generate_signed_url_from_supabase(file.file_url, expires_in)
        return signed_url

    @staticmethod
    def get_signed_url_from_path(file_path, expires_in=3600):
        return generate_signed_url_from_supabase(file_path, expires_in)