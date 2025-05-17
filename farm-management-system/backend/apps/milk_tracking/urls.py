"""
This module defines the URL patterns for the milk tracking app.
It includes routes for vendors, milk sales, and milk production.
"""

from django.urls import path
from .views import VendorListCreate, MilkSaleListCreate, MilkSaleDashboard, milk_production

urlpatterns = [
    path('vendors/', VendorListCreate.as_view(), name='vendor-list-create'),
    path('milk-sales/', MilkSaleListCreate.as_view(), name='milk-sale-list-create'),
    path('milk-sales/dashboard/', MilkSaleDashboard.as_view(), name='milk-sale-dashboard'),
    path('milk-production/', milk_production, name='milk-production'),
]