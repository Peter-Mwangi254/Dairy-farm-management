"""
This module contains the models for the feed inventory app.
It includes models for managing feed types, inventory, and expenses.
"""

from django.db import models

class Expense(models.Model):
    """
    Represents an expense in the farm.
    Contains fields for the description, category, amount, and date of the expense.
    """
    EXPENSE_CATEGORIES = [
        ('Feed', 'Feed'),
        ('Labor', 'Labor'),
        ('Veterinary', 'Veterinary'),
        ('Maintenance', 'Maintenance'),
        ('Other', 'Other'),
    ]

    description = models.CharField(max_length=255)  # Description of the expense
    category = models.CharField(max_length=50, choices=EXPENSE_CATEGORIES, default='Other')  # Expense category
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)  # Date of the expense

    def __str__(self):
        return f"{self.description} ({self.category}) - {self.amount}"