from rest_framework import generics, permissions
from .models import UserRating
from .serializers import UserRatingSerializer

class UserRatingListCreateView(generics.ListCreateAPIView):
    queryset = UserRating.objects.all()
    serializer_class = UserRatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(rater=self.request.user)

class UserRatingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserRating.objects.all()
    serializer_class = UserRatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Only allow rater to edit/delete their own ratings
        return UserRating.objects.filter(rater=self.request.user)