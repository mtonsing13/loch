from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'completed', 'created_at']
'''
A serializer converts your Todo model into JSON so your API can send it back to the frontend. Think of it as a translator between Python and JSON:
Todo object  →  Serializer  →  JSON

{"id": 1, "title": "Learn Django", "completed": false}
'''