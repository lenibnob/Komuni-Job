from django.contrib import admin
from .models import (
    Job, JobImage, JobApplication, 
    PaymentOption, JobCategory, JobSkill
)

admin.site.register(Job)
admin.site.register(JobImage)
admin.site.register(JobApplication)
admin.site.register(PaymentOption)
admin.site.register(JobCategory)
admin.site.register(JobSkill)

class JobAdmin(admin.ModelAdmin):
    list_display = (..., 'cover_photo_url', ...)