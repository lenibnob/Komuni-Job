from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import FileCategory, File
from .serializers import FileCategorySerializer, FileSerializer
from .services import FileService

class FileCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FileCategory.objects.all()
    serializer_class = FileCategorySerializer

class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        try:
            file = request.FILES.get('file')
            if not file:
                return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
            category_name = request.data.get('category')
            content_type_str = request.data.get('content_type_str')
            object_id = request.data.get('object_id')
            if not all([category_name, content_type_str, object_id]):
                return Response(
                    {'error': 'Missing required fields: category, content_type_str, or object_id'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            is_public = request.data.get('is_public', 'true').lower() == 'true'
            file_obj = FileService.upload_file(
                file_obj=file,
                category_name=category_name,
                user=request.user,
                content_type_str=content_type_str,
                object_id=object_id,
                is_public=is_public
            )
            serializer = FileSerializer(file_obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FileListView(APIView):
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
    def delete(self, request, file_id):
        try:
            file = FileService.get_file_by_id(file_id)
            if file.uploader != request.user and not request.user.is_staff:
                return Response(
                    {'error': 'Permission denied'},
                    status=status.HTTP_403_FORBIDDEN
                )
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

class FileSignedURLView(APIView):
    """API endpoint to get a signed URL for a file"""
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, file_id):
        try:
            file = FileService.get_file_by_id(file_id)
            if file.uploader != request.user and not request.user.is_staff:
                return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
            signed_url = FileService.generate_signed_url(file_id)
            return Response({'signed_url': signed_url})
        except File.DoesNotExist:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)