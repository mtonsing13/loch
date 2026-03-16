from django.contrib import admin
from django.urls import path, include

#decides where incoming request go
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/', include('moods.urls')),
]