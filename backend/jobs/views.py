from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Job, JobImage, JobApplication, PaymentOption, JobCategory, JobSkill
from .serializers import *
from .permissions import IsEmployer, IsApplicant, IsOwnerOrReadOnly
from files.services import FileService
from rest_framework.views import APIView

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['job_category', 'payment_option', 'job_is_active']
    search_fields = ['job_title', 'job_description']
    ordering_fields = ['job_post_date', 'payment_amount']

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            return JobCreateSerializer
        elif self.action == 'card_list':
            return JobCardSerializer
        elif self.action == 'retrieve':
            job = self.get_object()
            user = self.request.user
            if user.is_authenticated:
                accepted = JobApplication.objects.filter(job_id=job, applicant_id=user, status='ACCEPTED').exists()
                if accepted:
                    return JobDetailAcceptedSerializer
            return JobDetailPublicSerializer
        return JobDetailPublicSerializer

    @action(detail=False, methods=['get'])
    def card_list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = JobCardSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated, IsEmployer])
    def applicants(self, request, pk=None):
        job = self.get_object()
        applications = JobApplication.objects.filter(job_id=job)
        applicants = [app.applicant_id for app in applications]
        serializer = UserSerializer(applicants, many=True)
        return Response(serializer.data)

class JobCoverPhotoUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_pk):
        job = Job.objects.get(pk=job_pk)
        file = request.FILES.get('image')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        file_obj = FileService.upload_file(
            file_obj=file,
            category_name='Job Images',
            user=request.user,
            content_type_str='job',
            object_id=job_pk,
            is_public=True
        )
        image_url = file_obj.file_url if hasattr(file_obj, 'file_url') else file_obj['file_url']
        job.cover_photo_url = image_url
        job.save()
        return Response({'success': True, 'cover_photo_url': image_url}, status=status.HTTP_201_CREATED)

class JobImageUploadView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, job_pk):
        job = Job.objects.get(pk=job_pk)
        file = request.FILES.get('image')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        file_obj = FileService.upload_file(
            file_obj=file,
            category_name='Job Images',
            user=request.user,
            content_type_str='job',
            object_id=job_pk,
            is_public=True
        )
        image_url = file_obj.file_url if hasattr(file_obj, 'file_url') else file_obj['file_url']
        job_image = JobImage.objects.create(job_id=job, image=image_url)
        return Response({'success': True, 'image_url': job_image.image}, status=status.HTTP_201_CREATED)

class JobImageViewSet(viewsets.ModelViewSet):
    queryset = JobImage.objects.all()
    serializer_class = JobImageSerializer
    permission_classes = [IsAuthenticated, IsEmployer]
    def get_queryset(self):
        return JobImage.objects.filter(job_id__user_id=self.request.user)

class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'job_id']
    def get_queryset(self):
        queryset = JobApplication.objects.all()
        if self.request.user.is_authenticated:
            if self.request.query_params.get('as_employer'):
                return queryset.filter(job_id__user_id=self.request.user)
            return queryset.filter(applicant_id=self.request.user)
        return JobApplication.objects.none()
    def perform_create(self, serializer):
        serializer.save(applicant_id=self.request.user)

class PaymentOptionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PaymentOption.objects.all()
    serializer_class = PaymentOptionSerializer

class JobCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = JobCategory.objects.all()
    serializer_class = JobCategorySerializer

class JobSkillViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = JobSkill.objects.all()
    serializer_class = JobSkillSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['job_category']


class JobShortDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            applications = JobApplication.objects.filter(applicant_id=user)
            job_list = []
            for app in applications:
                job_list.append({
                    "job_id": app.job_id.job_id,
                    "job_title": app.job_id.job_title
                })
            return JsonResponse({"job_detail": job_list}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Cannot find jobs: {e}'}, status=404)
        
class EmployerShortDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            applications = JobApplication.objects.filter(applicant_id=user)
            jobs = [app.job_id for app in applications]
            serializer = JobOwnerSerializer(jobs, many=True)
            return Response({"job_owner": serializer.data}, status=200)
        except Exception as e:
            return Response({'error': f'Cannot find jobs: {e}'}, status=404)