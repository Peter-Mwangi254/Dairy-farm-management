from django.urls import path
from .views import CowListCreateView, CowDetailView, DewormingListCreateView, VaccinationListCreateView, SteamingListCreateView, HealthStatusView

urlpatterns = [
    path('cows/', CowListCreateView.as_view(), name='cow-list-create'),
    path('cows/<int:pk>/', CowDetailView.as_view(), name='cow-detail'),
    path('deworming/', DewormingListCreateView.as_view(), name='deworming-list-create'),
    path('vaccination/', VaccinationListCreateView.as_view(), name='vaccination-list-create'),
    path('steaming/', SteamingListCreateView.as_view(), name='steaming-list-create'),
    path('cows/health-status/', HealthStatusView.as_view(), name='health-status'),
]