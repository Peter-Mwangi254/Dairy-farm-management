from django.test import TestCase
from .models import Feed, FeedInventory
from datetime import date

class FeedInventoryTests(TestCase):

    def setUp(self):
        self.feed = Feed.objects.create(name="Test Feed", type="Grain")
        self.feed_inventory = FeedInventory.objects.create(feed=self.feed, quantity=100, date=date.today())

    def test_feed_creation(self):
        self.assertEqual(self.feed.name, "Test Feed")
        self.assertEqual(self.feed.type, "Grain")

    def test_feed_inventory_creation(self):
        self.assertEqual(self.feed_inventory.feed, self.feed)
        self.assertEqual(self.feed_inventory.quantity, 100)
        self.assertEqual(self.feed_inventory.date, date.today())