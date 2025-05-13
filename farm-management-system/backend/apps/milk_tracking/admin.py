from django.contrib import admin
from .models import Vendor, MilkSale


@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_info')
    search_fields = ('name',)


@admin.register(MilkSale)
class MilkSaleAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'date', 'liters_sold', 'total_earned')
    list_filter = ('vendor', 'date')
    search_fields = ('vendor__name',)

    def total_earned(self, obj):
        """Display the total amount earned for this sale"""
        return obj.total_earned
    total_earned.short_description = 'Total Earned'
    total_earned.admin_order_field = 'PRICE_PER_LITER'
