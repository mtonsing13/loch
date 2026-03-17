from django.utils import timezone
from .models import UserProfile
from datetime import timedelta

#where streak logic live as a helper function

def update_streak(user):
    today = timezone.now().date()
    yesterday = today - timedelta(days=1)
    
    # Get or create profile for this user
    profile, created = UserProfile.objects.get_or_create(user=user)
    if profile.last_checkin_date == today:
        return
    elif profile.last_checkin_date is None:
        profile.current_streak = 1
    elif profile.last_checkin_date == yesterday:
        profile.current_streak +=1
    else:
        profile.current_streak = 1
    profile.longest_streak=max(profile.current_streak,profile.longest_streak)
    profile.last_checkin_date = today
    profile.save()