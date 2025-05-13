from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/milk/', include('apps.milk_tracking.urls')),
    path('api/animal-health/', include('apps.animal_health.urls')),
    path('api/feed-inventory/', include('apps.feed_inventory.urls')),
]