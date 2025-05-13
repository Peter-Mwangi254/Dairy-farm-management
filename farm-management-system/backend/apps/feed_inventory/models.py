from django.db import models

class Expense(models.Model):
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