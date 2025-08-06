from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/jobs/', include('jobs.urls')),  # Add jobs URLs here
    path('api/user-rating/', include('user_rating.urls')),  # Add user rating URLs here
    path('api/', include('accounts.urls')),
<<<<<<< HEAD
    path('faceverify/', include('faceverify.urls')),  # Add verification URLs here
=======
    path('api/files/', include('files.urls')),
>>>>>>> 432123e22a50c9217571fbd3b90bbf816f2cee64
]