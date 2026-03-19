from rest_framework.routers import DefaultRouter
from .views import MoodEntryViewSet, MeditationSessionViewSet

#maps url to views
router = DefaultRouter()
router.register(r'moods', MoodEntryViewSet, basename='mood')
router.register(r'sessions', MeditationSessionViewSet, basename='sessions')
urlpatterns = router.urls