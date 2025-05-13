from django.contrib import admin
from .models import Deworming, Vaccination, Cow, Steaming

@admin.register(Cow)
class CowAdmin(admin.ModelAdmin):
    list_display = ('name', 'breed', 'date_of_birth', 'health_status')
    search_fields = ('name',)

admin.site.register(Deworming)
admin.site.register(Vaccination)
admin.site.register(Steaming)