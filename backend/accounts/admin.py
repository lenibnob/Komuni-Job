from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'profile'

# Extend the base UserAdmin to include the UserProfile inline
class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_phone')
    
    def get_phone(self, obj):
        try:
            return obj.profile.phone_number
        except UserProfile.DoesNotExist:
            return "-"
    get_phone.short_description = 'Phone Number'

# Re-register UserAdmin with the new functionality
admin.site.unregister(User)
admin.site.register(User, UserAdmin)