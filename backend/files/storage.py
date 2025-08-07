import os
import uuid
import mimetypes
import logging
from supabase import create_client, Client
from django.conf import settings

logger = logging.getLogger(__name__)

def get_supabase_client() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def get_file_metadata(file):
    extension = os.path.splitext(file.name)[1].lower()
    return {
        'size': file.size,
        'content_type': file.content_type or mimetypes.guess_type(file.name)[0] or 'application/octet-stream',
        'name': file.name,
        'extension': extension,
    }

def generate_unique_filename(original_filename):
    extension = os.path.splitext(original_filename)[1].lower()
    return f"{uuid.uuid4()}{extension}"

def upload_file_to_supabase(file, folder_path, filename=None):
    """
    Upload a file to Supabase Storage and return only the storage path (not a public URL).
    """
    try:
        metadata = get_file_metadata(file)
        if not filename:
            filename = generate_unique_filename(file.name)
        file_path = f"{folder_path.rstrip('/')}/{filename}"
        file_content = file.read()
        supabase = get_supabase_client()
        supabase.storage.from_(settings.SUPABASE_BUCKET_NAME).upload(
            path=file_path,
            file=file_content,
            file_options={"content-type": metadata['content_type']}
        )
        # Return storage path, not a public URL
        return {
            'storage_path': file_path,
            'filename': filename,
            'original_filename': metadata['name'],
            'file_type': metadata['content_type'],
            'file_size': metadata['size'],
            'path': file_path,
        }
    except Exception as e:
        logger.error(f"Error uploading file to Supabase: {str(e)}")
        raise

def delete_file_from_supabase(file_path):
    try:
        supabase = get_supabase_client()
        supabase.storage.from_(settings.SUPABASE_BUCKET_NAME).remove([file_path])
        return True
    except Exception as e:
        logger.error(f"Error deleting file from Supabase: {str(e)}")
        return False

def generate_signed_url_from_supabase(file_path, expires_in=3600):
    """
    Generate a signed URL for a file in Supabase Storage.
    """
    try:
        supabase = get_supabase_client()
        response = supabase.storage.from_(settings.SUPABASE_BUCKET_NAME).create_signed_url(file_path, expires_in)
        return response.get('signedURL')
    except Exception as e:
        logger.error(f"Error generating signed URL: {str(e)}")
        raise