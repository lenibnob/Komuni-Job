from django.urls import path
from . import views

urlpatterns = [
    path('jobs/card-list/', views.JobViewSet.as_view({'get': 'card_list'}), name='job-card-list'),
    path('jobs/', views.JobViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('jobs/<int:pk>/', views.JobViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('jobs/<int:pk>/apply/', views.JobViewSet.as_view({'post': 'apply'})),
    path('job-images/', views.JobImageViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('jobs/<int:job_pk>/upload-cover-photo/', views.JobCoverPhotoUploadView.as_view(), name='job-cover-photo-upload'),
    path('jobs/<int:job_pk>/upload-image/', views.JobImageUploadView.as_view(), name='job-image-upload'),
    path('job-images/<int:pk>/', views.JobImageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('applications/', views.JobApplicationViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('applications/<int:pk>/', views.JobApplicationViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('payment-options/', views.PaymentOptionViewSet.as_view({'get': 'list'})),
    path('payment-options/<int:pk>/', views.PaymentOptionViewSet.as_view({'get': 'retrieve'})),
    path('job-categories/', views.JobCategoryViewSet.as_view({'get': 'list'})),
    path('job-categories/<int:pk>/', views.JobCategoryViewSet.as_view({'get': 'retrieve'})),
    path('job-skills/', views.JobSkillViewSet.as_view({'get': 'list'})),
    path('job-skills/<int:pk>/', views.JobSkillViewSet.as_view({'get': 'retrieve'})),
]