from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FileCategoryViewSet, FileUploadView, FileListView, FileDeleteView, FileSignedURLView

router = DefaultRouter()
router.register(r'categories', FileCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('list/', FileListView.as_view(), name='file-list'),
    path('delete/<int:file_id>/', FileDeleteView.as_view(), name='file-delete'),
    path('signed-url/<int:file_id>/', FileSignedURLView.as_view(), name='file-signed-url'),
]