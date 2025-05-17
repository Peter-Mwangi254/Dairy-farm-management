"""
This module contains the models for the animal health app.
It includes models for managing cows, deworming, vaccinations, and steaming records.
"""

from django.db import models

class Cow(models.Model):
    """
    Represents a cow in the farm.
    Contains fields for the cow's name, breed, and other health-related attributes.
    """
    name = models.CharField(max_length=100, unique=True)
    breed = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    health_status = models.CharField(max_length=100, default='Healthy')

    def __str__(self):
        return f"{self.name} - {self.breed}"

class Deworming(models.Model):
    """
    Represents a deworming record for a cow.
    Contains fields for the cow, date of deworming, and product used.
    """
    cow = models.ForeignKey(Cow, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"Deworming for {self.cow.name} on {self.date}"

class Vaccination(models.Model):
    cow = models.ForeignKey(Cow, on_delete=models.CASCADE)
    date = models.DateField()
    vaccine_name = models.CharField(max_length=100)

    def __str__(self):
        return f"Vaccination for {self.cow.name} on {self.date}"

class Steaming(models.Model):
    cow = models.ForeignKey(Cow, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"Steaming for {self.cow.name} on {self.date}"