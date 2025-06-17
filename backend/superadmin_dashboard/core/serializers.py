from rest_framework import serializers
from .models import User, Comment, CommentHistory, ActivityLog

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'page_name', 'user', 'content', 'created_at', 'updated_at']

class CommentHistorySerializer(serializers.ModelSerializer):
    edited_by = UserSerializer(read_only=True)

    class Meta:
        model = CommentHistory
        fields = ['id', 'comment', 'old_content', 'edited_by', 'edited_at']

class ActivityLogSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = ActivityLog
        fields = ['id', 'user', 'action', 'timestamp', 'ip_address']
