from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FileCategoryViewSet, FileUploadView, FileListView, FileDeleteView

router = DefaultRouter()
router.register(r'categories', FileCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('list/', FileListView.as_view(), name='file-list'),
    path('delete/<int:file_id>/', FileDeleteView.as_view(), name='file-delete'),
]