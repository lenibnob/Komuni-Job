from rest_framework import serializers
from .models import UserRating

class UserRatingSerializer(serializers.ModelSerializer):
    rater_username = serializers.ReadOnlyField(source='rater.username')
    rated_user_username = serializers.ReadOnlyField(source='rated_user.username')

    class Meta:
        model = UserRating
        fields = [
            'id', 'rater', 'rater_username', 'rated_user', 'rated_user_username',
            'rating', 'comment', 'rating_date'
        ]
        read_only_fields = ['id', 'rater', 'rater_username', 'rating_date']