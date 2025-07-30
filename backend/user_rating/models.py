from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class UserRating(models.Model):
    rater = models.ForeignKey(User, related_name='given_ratings', on_delete=models.CASCADE)
    rated_user = models.ForeignKey(User, related_name='received_ratings', on_delete=models.CASCADE)
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        validators=[MinValueValidator(1.0), MaxValueValidator(5.0)]
    )  # allows ratings like 1.0, 1.5 ... 5.0
    comment = models.CharField(max_length=255, blank=True, null=True)
    rating_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('rater', 'rated_user')
        ordering = ['-rating_date']

    def __str__(self):
        return f"{self.rater} rated {self.rated_user}: {self.rating}"