"""
This module defines the URL patterns for the milk tracking app.
It includes routes for vendors, milk sales, and milk production.
"""

from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import VendorListCreate, MilkSaleListCreate, MilkSaleDashboard, milk_production, VendorViewSet

# Define the router and register the VendorViewSet
router = DefaultRouter()
router.register(r'vendors', VendorViewSet, basename='vendor')

urlpatterns = [
    path('vendors/', VendorListCreate.as_view(), name='vendor-list-create'),
    path('milk-sales/', MilkSaleListCreate.as_view(), name='milk-sale-list-create'),
    path('milk-sales/dashboard/', MilkSaleDashboard.as_view(), name='milk-sale-dashboard'),
    path('milk-production/', milk_production, name='milk-production'),
]

# Add the router URLs to the urlpatterns
urlpatterns += router.urls