from django.db import models
from django.contrib.auth.models import User

#how moddEntry looks like in the database
class MoodEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()  # 1-5
    note = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.score} - {self.created_at}"



class MeditationSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    duration_minutes = models.IntegerField()
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-completed_at']

    def __str__(self):
        return f"{self.user.username} - {self.duration_minutes} mins"