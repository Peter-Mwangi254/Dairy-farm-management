from rest_framework import serializers
from .models import Deworming, Vaccination, Cow, Steaming

class CowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cow
        fields = '__all__'

class DewormingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deworming
        fields = ['id', 'cow', 'date']

class VaccinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaccination
        fields = '__all__'

class SteamingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Steaming
        fields = '__all__'