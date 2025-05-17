from django.test import TestCase
from django.urls import reverse
from .models import Vendor, MilkSale, MilkProduction
from apps.animal_health.models import Cow
from datetime import date

class MilkTrackingTests(TestCase):

    def setUp(self):
        self.vendor = Vendor.objects.create(name="Test Vendor")
        self.cow = Cow.objects.create(name="Test Cow")
        self.milk_sale = MilkSale.objects.create(vendor=self.vendor, date=date.today(), liters_sold=10.5)
        self.milk_production = MilkProduction.objects.create(cow=self.cow, date=date.today(), liters=12.5)

    def test_vendor_creation(self):
        self.assertEqual(self.vendor.name, "Test Vendor")

    def test_milk_sale_creation(self):
        self.assertEqual(self.milk_sale.liters_sold, 10.5)
        self.assertEqual(self.milk_sale.vendor, self.vendor)

    def test_milk_production_creation(self):
        self.assertEqual(self.milk_production.liters, 12.5)
        self.assertEqual(self.milk_production.cow, self.cow)

    def test_milk_sales_dashboard_view(self):
        response = self.client.get(reverse('milk-sale-dashboard'))
        self.assertEqual(response.status_code, 200)

    def test_milk_production_view(self):
        response = self.client.get(reverse('milk-production'), {
            'start_date': date.today().isoformat(),
            'end_date': date.today().isoformat()
        })
        self.assertEqual(response.status_code, 200)