import os
import uuid
import mimetypes
import logging
from supabase import create_client, Client
from django.conf import settings

logger = logging.getLogger(__name__)

def get_supabase_client() -> Client:
    """Get a Supabase client instance with configured credentials"""
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def get_file_metadata(file):
    """Extract metadata from an uploaded file"""
    extension = os.path.splitext(file.name)[1].lower()
    return {
        'size': file.size,
        'content_type': file.content_type or mimetypes.guess_type(file.name)[0] or 'application/octet-stream',
        'name': file.name,
        'extension': extension,
    }

def generate_unique_filename(original_filename):
    """Generate a unique filename to prevent collisions"""
    extension = os.path.splitext(original_filename)[1].lower()
    return f"{uuid.uuid4()}{extension}"

def upload_file_to_supabase(file, folder_path, filename=None):
    """
    Upload a file to Supabase Storage
    
    Args:
        file: Django UploadedFile object
        folder_path: Path within bucket (e.g., 'profiles/avatars')
        filename: Optional custom filename, otherwise auto-generated
    
    Returns:
        dict: File information including URL
    """
    try:
        # Get file metadata
        metadata = get_file_metadata(file)
        
        # Generate unique filename if not provided
        if not filename:
            filename = generate_unique_filename(file.name)
            
        # Construct file path
        file_path = f"{folder_path.rstrip('/')}/{filename}"
        
        # Get the file content
        file_content = file.read()
        
        # Upload to Supabase
        supabase = get_supabase_client()
        result = supabase.storage.from_(settings.SUPABASE_BUCKET_NAME).upload(
            path=file_path,
            file=file_content,
            file_options={"content-type": metadata['content_type']}
        )
        
        # Get public URL
        file_url = supabase.storage.from_(settings.SUPABASE_BUCKET_NAME).get_public_url(file_path)
        
        return {
            'file_url': file_url,
            'filename': filename,
            'original_filename': metadata['name'],
            'file_type': metadata['content_type'],
            'file_size': metadata['size'],
            'path': file_path
        }
        
    except Exception as e:
        logger.error(f"Error uploading file to Supabase: {str(e)}")
        raise

def delete_file_from_supabase(file_path):
    """
    Delete a file from Supabase Storage
    
    Args:
        file_path: Full path to file within bucket
        
    Returns:
        bool: True if successful
    """
    try:
        supabase = get_supabase_client()
        supabase.storage.from_(settings.SUPABASE_BUCKET_NAME).remove([file_path])
        return True
    except Exception as e:
        logger.error(f"Error deleting file from Supabase: {str(e)}")
        return False