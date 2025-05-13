from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework.decorators import action
from rest_framework.views import APIView
from django.utils import timezone
from django.db.models import Sum

from .models import Vendor, MilkSale
from .serializers import VendorSerializer, MilkSaleSerializer


class VendorViewSet(viewsets.ModelViewSet):
    """CRUD operations for vendors via a ViewSet"""
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer


class MilkSaleViewSet(viewsets.ModelViewSet):
    """CRUD operations for milk sales via a ViewSet, plus custom actions"""
    queryset = MilkSale.objects.all()
    serializer_class = MilkSaleSerializer

    @action(detail=False, methods=['post'])
    def record_sale(self, request):
        """Record a milk sale, defaulting the date to today if not provided"""
        data = request.data.copy()
        data.setdefault('date', timezone.now().date())
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        """Aggregate total liters sold per vendor for dashboard"""
        vendor_sales = (
            MilkSale.objects
                    .values('vendor__name')
                    .annotate(total_liters=Sum('liters_sold'))
        )
        return Response(vendor_sales, status=status.HTTP_200_OK)


class VendorListCreate(ListCreateAPIView):
    """List and create vendors"""
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer


class MilkSaleListCreate(ListCreateAPIView):
    """List and create milk sales"""
    queryset = MilkSale.objects.all()
    serializer_class = MilkSaleSerializer


class MilkSaleDashboard(APIView):
    """View for milk sales dashboard: totals per vendor"""
    def get(self, request, *args, **kwargs):
        vendor_sales = (
            MilkSale.objects
                    .values('vendor__name')
                    .annotate(total_liters=Sum('liters_sold'))
        )
        return Response(vendor_sales, status=status.HTTP_200_OK)
