from django.db import models
from django.utils.timezone import now
from decimal import Decimal

class Vendor(models.Model):
    name = models.CharField(max_length=255)
    contact_info = models.TextField(blank=True)

    def __str__(self):
        return self.name

class MilkSale(models.Model):
    PRICE_PER_LITER = Decimal('60.00 ')

    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    date = models.DateField(default=now)  # Default to the current date
    liters_sold = models.DecimalField(max_digits=10, decimal_places=2)
    

    @property
    def total_earned(self):
        return round(self.liters_sold * self.PRICE_PER_LITER, 2)

    def __str__(self):
        return f"{self.liters_sold} liters sold to {self.vendor.name} on {self.date}"

class MilkProduction(models.Model):
    cow = models.ForeignKey('animal_health.Cow', on_delete=models.CASCADE, related_name='milk_productions')
    date = models.DateField()
    liters = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        unique_together = ('cow', 'date')
        ordering = ['-date']

    def __str__(self):
        return f"{self.cow.name} - {self.date}: {self.liters} liters"