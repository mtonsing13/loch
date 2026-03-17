from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import MoodEntry
from .serializers import MoodEntrySerializer
from users.utils import update_streak

class MoodEntryViewSet(viewsets.ModelViewSet):
    serializer_class = MoodEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return MoodEntry.objects.filter(user=self.request.user)[:7]

    #runs when a mood is saved
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        update_streak(self.request.user)