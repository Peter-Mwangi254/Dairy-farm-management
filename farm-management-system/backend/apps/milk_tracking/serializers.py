from rest_framework import serializers
from .models import Vendor, MilkSale

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

class MilkSaleSerializer(serializers.ModelSerializer):
    vendor = VendorSerializer()  # Nested serializer for vendor
    total_earned = serializers.ReadOnlyField()  # Use the model's property

    class Meta:
        model = MilkSale
        fields = ['id', 'vendor', 'date', 'liters_sold', 'total_earned']  # Include total_earned

    def create(self, validated_data):
        vendor_data = validated_data.pop('vendor')
        vendor, created = Vendor.objects.get_or_create(**vendor_data)
        milk_sale = MilkSale.objects.create(vendor=vendor, **validated_data)
        return milk_sale

    def update(self, instance, validated_data):
        vendor_data = validated_data.pop('vendor', None)
        if vendor_data:
            vendor, created = Vendor.objects.get_or_create(**vendor_data)
            instance.vendor = vendor
        instance.date = validated_data.get('date', instance.date)
        instance.liters_sold = validated_data.get('liters_sold', instance.liters_sold)
        instance.save()
        return instance