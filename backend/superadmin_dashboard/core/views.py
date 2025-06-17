from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Comment, CommentHistory, ActivityLog
from .serializers import CommentSerializer
from .permissions import HasPageAccess
from django.http import JsonResponse

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, HasPageAccess]



    from django.http import JsonResponse

def home(request):
    return JsonResponse({'message': 'Welcome to the Super Admin Dashboard API'})


    def get_queryset(self):
        page = self.kwargs.get('page_name')
        return Comment.objects.filter(page_name=page)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        ActivityLog.objects.create(
            user=self.request.user,
            action=f"Created comment on page {serializer.validated_data.get('page_name')}",
            ip_address=self.get_client_ip()
        )



    def perform_update(self, serializer):
        comment = self.get_object()
        CommentHistory.objects.create(
            comment=comment,
            old_content=comment.content,
            edited_by=self.request.user
        )
        serializer.save()
        ActivityLog.objects.create(
            user=self.request.user,
            action=f"Edited comment on page {comment.page_name}",
            ip_address=self.get_client_ip()
        )

    def perform_destroy(self, instance):
        page = instance.page_name
        instance.delete()
        ActivityLog.objects.create(
            user=self.request.user,
            action=f"Deleted comment on page {page}",
            ip_address=self.get_client_ip()
        )

    def get_client_ip(self):
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = self.request.META.get('REMOTE_ADDR')
        return ip
