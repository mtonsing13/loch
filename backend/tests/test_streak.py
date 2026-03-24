import pytest
from django.contrib.auth.models import User
from users.models import UserProfile
from users.utils import update_streak
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_first_checkin_sets_streak_to_one():
    # create a test user
    user = User.objects.create_user(username='testuser', password='pass123')
    
    # call update_streak
    update_streak(user)
    
    # check the streak is 1
    profile = UserProfile.objects.get(user=user)
    assert profile.current_streak == 1


@pytest.mark.django_db
def test_checking_in_twice_same_day_does_not_increment():
    # create user
    user = User.objects.create_user(username='testuser1', password='pass1231')
    # call update_streak twice
    update_streak(user)
    update_streak(user)
    # streak should still be 1
    profile = UserProfile.objects.get(user=user)
    assert profile.current_streak == 1


@pytest.mark.django_db
def test_unauthenticated_user_cannot_access_moods():
    client = APIClient()
    response = client.get('http://127.0.0.1:8000/api/moods/')
    assert response.status_code == 401  
