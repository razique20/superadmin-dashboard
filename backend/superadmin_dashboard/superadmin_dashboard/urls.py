from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from core.views import CommentViewSet
from core.views import CommentViewSet, home  # add home here

router = DefaultRouter()
router.register(r'pages/(?P<page_name>[^/.]+)/comments', CommentViewSet, basename='comments')

urlpatterns = [
    path('', home, name='home'),  # 👈 Add this line
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
]
