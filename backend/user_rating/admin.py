from django.contrib import admin
from .models import UserRating

@admin.register(UserRating)
class UserRatingAdmin(admin.ModelAdmin):
    list_display = ('rater', 'rated_user', 'rating', 'rating_date')
    search_fields = ('rater__username', 'rated_user__username')