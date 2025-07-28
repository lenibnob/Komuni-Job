from rest_framework import permissions

class IsEmployer(permissions.BasePermission):
    """
    Custom permission to only allow employers to access their job objects.
    """
    def has_object_permission(self, request, view, obj):
        # Check if user is the employer for this job
        return obj.job_id.user_id == request.user

class IsApplicant(permissions.BasePermission):
    """
    Custom permission to only allow applicants to access their applications.
    """
    def has_object_permission(self, request, view, obj):
        # Check if user is the applicant for this application
        return obj.applicant_id == request.user

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to the owner
        return obj.user_id == request.user