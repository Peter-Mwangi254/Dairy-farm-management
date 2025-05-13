from django.urls import path
from .views import VendorListCreate, MilkSaleListCreate, MilkSaleDashboard

urlpatterns = [
    path('vendors/', VendorListCreate.as_view(), name='vendor-list-create'),
    path('milk-sales/', MilkSaleListCreate.as_view(), name='milk-sale-list-create'),
    path('milk-sales/dashboard/', MilkSaleDashboard.as_view(), name='milk-sale-dashboard'),
]