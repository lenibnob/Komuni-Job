from django.urls import path
from . import views

urlpatterns = [
    path('ratings/', views.UserRatingListCreateView.as_view(), name='rating-list-create'),
    path('ratings/<int:pk>/', views.UserRatingDetailView.as_view(), name='rating-detail'),
]