from rest_framework import serializers
from .models import MoodEntry, MeditationSession

class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = ['id', 'score', 'note', 'created_at']
        read_only_fields = ['id', 'created_at']

class MeditationSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeditationSession
        fields = ['id','duration_minutes','completed_at']
        read_only_fields = ['id', 'created_at']