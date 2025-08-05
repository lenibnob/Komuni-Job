from rest_framework import serializers
from .models import FileCategory, File

class FileCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FileCategory
        fields = ['id', 'name', 'description']

class FileSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    uploader_username = serializers.ReadOnlyField(source='uploader.username')
    
    class Meta:
        model = File
        fields = [
            'id', 'file_url', 'original_filename', 'file_type', 
            'file_size', 'category', 'category_name', 'uploader', 
            'uploader_username', 'content_type_str', 'object_id', 
            'is_public', 'created_at'
        ]
        read_only_fields = ['file_url', 'uploader', 'created_at']