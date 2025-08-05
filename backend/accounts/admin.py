from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import UserProfile, IdentificationCardType, IdentificationCard

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'profile'

class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_phone', 'get_address')
    
    def get_phone(self, obj):
        try:
            return obj.profile.phone_number
        except UserProfile.DoesNotExist:
            return "-"
    get_phone.short_description = 'Phone Number'
    
    def get_address(self, obj):
        try:
            return obj.profile.address
        except UserProfile.DoesNotExist:
            return "-"
    get_address.short_description = 'Address'

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

@admin.register(IdentificationCardType)
class IdentificationCardTypeAdmin(admin.ModelAdmin):
    list_display = ['id', 'type_name']

@admin.register(IdentificationCard)
class IdentificationCardAdmin(admin.ModelAdmin):
    list_display = ['id', 'card_type', 'id_front', 'id_back']