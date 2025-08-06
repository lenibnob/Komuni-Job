from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/jobs/', include('jobs.urls')),  # Add jobs URLs here
    path('api/user-rating/', include('user_rating.urls')),  # Add user rating URLs here
    path('api/', include('accounts.urls')),
    path('faceverify/', include('faceverify.urls')),  # Add verification URLs here
]