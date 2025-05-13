from django.urls import path
from . import views

urlpatterns = [
    path('cows/', views.CowListCreateView.as_view(), name='cow-list-create'),
    path('cows/<int:pk>/', views.CowDetailView.as_view(), name='cow-detail'),
    path('deworming/', views.DewormingListCreateView.as_view(), name='deworming-list-create'),
    path('vaccination/', views.VaccinationListCreateView.as_view(), name='vaccination-list-create'),
    path('steaming/', views.SteamingListCreateView.as_view(), name='steaming-list-create'),
]