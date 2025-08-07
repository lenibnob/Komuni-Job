from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/jobs/', include('jobs.urls')),  # Add jobs URLs here
    path('api/user-rating/', include('user_rating.urls')),  # Add user rating URLs here
    path('api/', include('accounts.urls')),
    path('id-verify/', include('faceverify.urls')),  # Add verification URLs here
    path('api/files/', include('files.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)