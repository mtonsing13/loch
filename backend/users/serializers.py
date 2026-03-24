from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile
#converts user data to JSON
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    #true because you can send password, but password should never be sent back
    #passwords should never appear in API response

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
         # automatically create profile when user registers
        UserProfile.objects.create(user=user)
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['current_streak', 'longest_streak', 'last_checkin_date']