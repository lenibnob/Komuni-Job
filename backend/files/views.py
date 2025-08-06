from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import FileCategory, File
from .serializers import FileCategorySerializer, FileSerializer
from .services import FileService

class FileCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint to list file categories"""
    queryset = FileCategory.objects.all()
    serializer_class = FileCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class FileUploadView(APIView):
    """API endpoint for uploading files"""
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            # Get the file from request
            file = request.FILES.get('file')
            if not file:
                return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Get required parameters
            category_name = request.data.get('category')
            content_type_str = request.data.get('content_type_str')
            object_id = request.data.get('object_id')
            
            if not all([category_name, content_type_str, object_id]):
                return Response(
                    {'error': 'Missing required fields: category, content_type_str, or object_id'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get optional parameters
            is_public = request.data.get('is_public', 'true').lower() == 'true'
            
            # Upload file using service
            file_obj = FileService.upload_file(
                file_obj=file,
                category_name=category_name,
                user=request.user,
                content_type_str=content_type_str,
                object_id=object_id,
                is_public=is_public
            )
            
            # Return file details
            serializer = FileSerializer(file_obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FileListView(APIView):
    """API endpoint for listing files"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        content_type_str = request.query_params.get('content_type_str')
        object_id = request.query_params.get('object_id')
        
        if not content_type_str or not object_id:
            return Response(
                {'error': 'Missing required parameters: content_type_str and object_id'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        files = FileService.get_files_for_object(content_type_str, object_id)
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data)

class FileDeleteView(APIView):
    """API endpoint for deleting files"""
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request, file_id):
        try:
            # Get the file
            file = FileService.get_file_by_id(file_id)
            
            # Check permissions (only uploader or staff can delete)
            if file.uploader != request.user and not request.user.is_staff:
                return Response(
                    {'error': 'Permission denied'}, 
                    status=status.HTTP_403_FORBIDDEN
                )
                
            # Delete the file
            result = FileService.delete_file(file_id)
            
            if result:
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(
                    {'error': 'Failed to delete file from storage'}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
        except File.DoesNotExist:
            return Response(
                {'error': 'File not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )