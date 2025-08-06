from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from files.services import FileService
from django.contrib.auth.models import User

@csrf_exempt
def test_upload(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST allowed'}, status=405)
    
    try:
        # Get first user
        user = User.objects.first()
        if not user:
            return JsonResponse({'error': 'No users found'}, status=500)
            
        # Get the file from request
        file = request.FILES.get('profile_picture')
        if not file:
            return JsonResponse({'error': 'No file provided'}, status=400)
        
        # Upload using FileService
        file_obj = FileService.upload_file(
            file_obj=file,
            category_name='Profile Pictures',
            user=user,
            content_type_str='userprofile',
            object_id=user.profile.id,
            is_public=True
        )
        
        # Update user profile
        user_profile = user.profile
        user_profile.profile_pic_url = file_obj.file_url
        user_profile.save()
        
        return JsonResponse({
            'success': True,
            'profile_pic_url': file_obj.file_url,
            'user': user.username
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500)