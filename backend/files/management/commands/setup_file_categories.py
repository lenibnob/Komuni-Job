from django.core.management.base import BaseCommand
from files.models import FileCategory

class Command(BaseCommand):
    help = 'Set up initial file categories'

    def handle(self, *args, **kwargs):
        categories = [
            {
                'name': 'Profile Pictures',
                'folder_path': 'users/profile-pictures',
                'description': 'User profile pictures'
            },
            {
                'name': 'Identification Documents',
                'folder_path': 'users/identification',
                'description': 'User ID cards and verification documents'
            },
            {
                'name': 'Resumes',
                'folder_path': 'users/resumes',
                'description': 'User CVs and resumes'
            },
            {
                'name': 'Job Images',
                'folder_path': 'jobs/images',
                'description': 'Images for job listings'
            },
            {
                'name': 'Job Completion Evidence',
                'folder_path': 'jobs/completion',
                'description': 'Photos showing completed jobs'
            },
            {
                'name': 'Review Attachments',
                'folder_path': 'reviews/attachments',
                'description': 'Files attached to reviews'
            },
            {
                'name': 'Message Attachments',
                'folder_path': 'messages/attachments',
                'description': 'Files shared in messages'
            },
        ]
        
        created_count = 0
        for category_data in categories:
            _, created = FileCategory.objects.get_or_create(
                name=category_data['name'],
                defaults={
                    'folder_path': category_data['folder_path'],
                    'description': category_data['description']
                }
            )
            if created:
                created_count += 1
                
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} file categories')
        )