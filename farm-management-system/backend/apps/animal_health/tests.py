from django.test import TestCase
from .models import Cow, Deworming
from datetime import date

class AnimalHealthTests(TestCase):

    def setUp(self):
        self.cow = Cow.objects.create(name="Test Cow", breed="Holstein", date_of_birth="2020-01-01", health_status="Healthy")
        self.deworming = Deworming.objects.create(cow=self.cow, date=date.today())

    def test_cow_creation(self):
        self.assertEqual(self.cow.name, "Test Cow")
        self.assertEqual(self.cow.breed, "Holstein")
        self.assertEqual(self.cow.health_status, "Healthy")

    def test_deworming_creation(self):
        self.assertEqual(self.deworming.cow, self.cow)
        self.assertEqual(self.deworming.date, date.today())