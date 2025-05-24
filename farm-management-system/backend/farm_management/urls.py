from django.urls import path, include
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/milk/', include('apps.milk_tracking.urls')),
    path('api/animal-health/', include('apps.animal_health.urls')),
    path('api/feed-inventory/', include('apps.feed_inventory.urls')),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/', include('auth_app.urls')),  # Updated to include auth_app under api/auth/
]