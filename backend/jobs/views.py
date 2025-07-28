from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Job, JobImage, JobApplication, PaymentOption, JobCategory, JobSkill
from .serializers import (
    JobSerializer, JobImageSerializer, JobApplicationSerializer,
    PaymentOptionSerializer, JobCategorySerializer, JobSkillSerializer
)
from .permissions import IsEmployer, IsApplicant, IsOwnerOrReadOnly

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['job_category', 'job_location', 'payment_option', 'job_is_active']
    search_fields = ['job_title', 'job_description']
    ordering_fields = ['job_post_date', 'payment_amount']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.query_params.get('my_jobs') and self.request.user.is_authenticated:
            return queryset.filter(user_id=self.request.user)
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)
        
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def apply(self, request, pk=None):
        job = self.get_object()
        if job.applications.filter(applicant_id=request.user).exists():
            return Response({'detail': 'You have already applied for this job.'}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        JobApplication.objects.create(job_id=job, applicant_id=request.user)
        return Response({'detail': 'Application submitted successfully.'}, 
                        status=status.HTTP_201_CREATED)

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
    queryset = JobCategory.objects.all()
    serializer_class = JobCategorySerializer

class JobSkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobSkill.objects.all()
    serializer_class = JobSkillSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['job_category']