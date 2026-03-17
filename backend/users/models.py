from django.db import models
#empty because using Django User model (username,password,email,date_joined, last_login)
# Create models here.
from django.contrib.auth.models import User
#will create model for UserProfile (so we can store streak data for each user)
class UserProfile (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    current_streak = models.IntegerField(default = 0 )
    longest_streak = models.IntegerField(default = 0)
    last_checkin_date = models.DateField(null=True, blank=True)