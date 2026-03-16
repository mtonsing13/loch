from rest_framework.routers import DefaultRouter
from .views import MoodEntryViewSet

#maps url to views
router = DefaultRouter()
router.register(r'moods', MoodEntryViewSet, basename='mood')

urlpatterns = router.urls